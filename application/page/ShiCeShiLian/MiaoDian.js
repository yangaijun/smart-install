import React from 'react'
import {Text, ScrollView, View, Platform, Dimensions} from "react-native";
import Freedomen from 'react-native-freedomen'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import WebView from 'react-native-webview'  
import BleUtil from "../../utils/BleUtil";
import store from 'react-native-freedomen/store'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.label
        }
    } 

    constructor(props) {
        super(props)
        this.state = {
            activity: 'cld',
            visible: false,
            chooseList: {list: []},
            showJcx: false,
            list: [{}],
            jcxList: [], 
            checks: []
        }   
    }

    componentDidMount() {    
        console.log(this.props.navigation.state.params)
        this.pageParams = this.props.navigation.state.params.child
        let scales = [] 
        this.pageParams.child.map(el => {
            el.x = el.abscissa
            el.y = el.ordinate 
            scales.push(el)
        })
        this.points = scales 

        store.get('checkList').then(res => {
            this.setState({
                checks: res
            }) 
        })

        Freedomen.global.fn = (item, pointInfo) => {  
            item.projectId = Freedomen.global.project.projectId
            item.measuredSiteId = this.props.navigation.state.params.siteId
            item.bfmId = this.props.navigation.state.params._bfmId
            item.flag = this.props.navigation.state.params.label 
            item.abscissa = pointInfo.x
            pointInfo.tag = item.tag = this.points.length ? this.points[this.points.length - 1].tag + 1 : 0
            this.pointId = item.tag
            item.ordinate = pointInfo.y
            item.paperOfMeasuredId = this.pageParams.paperOfMeasuredId 
            item.child && item.child.map((el, index) => {
                el.prop = 'input' + index
                el['input' + index] = el.inputData + ''
            }) 
            this.webView.postMessage(JSON.stringify({
                key: 'drawAppend',
                value: pointInfo
            }));
            this.setState({
                jcxList: [item],
                showJcx: true
            })
        }
        // this.refs.webViewRef.postMessage([1,2]);
    }  

    _bindInput(index, item, listItemProp) {
        this.jcxIndex = index
        this.jcxItem = item
        this.listItemProp = listItemProp
    }
    _showList(point) {
        point.x = point.abscissa
        point.y = point.ordinate
        this.webView.postMessage(JSON.stringify({
            key: 'drawSelect',
            value:  point
        }))
        this.pointInfoItem =  point
        let pointId = this.pointInfoItem.pointId
        this.pointId = pointId
        store.get('pointInfo').then(res => {
            if (res[this.pointId]) {
                this.setState({
                    jcxList: res[this.pointId],
                    showJcx: true
                })
            } else { 
                point.child = point.child || []
                point.child.map(el => {
                    el.projectId = this.props.navigation.state.params.projectId
                    el.measuredSiteId = this.props.navigation.state.params.siteId
                    el.bfmId = this.props.navigation.state.params._bfmId
                    el.flag = this.props.navigation.state.params.label
                    el.pointId = this.pointInfoItem.pointId
                    el.abscissa = this.pointInfoItem.abscissa
                    el.ordinate = this.pointInfoItem.ordinate
                    el.paperOfMeasuredId = this.pageParams.paperOfMeasuredId
                    el.child && el.child.map((item, index) => {
                        item.prop = 'input' + index
                        el['input' + index] = item.inputData + ''
                    })
                    this.setState({
                        jcxList: point.child,
                        showJcx: true
                    })
                })  
            }
        }).catch(e => {
            point.child = point.child || []
            point.child.map(el => {
                el.projectId = this.props.navigation.state.params.projectId
                el.measuredSiteId = this.props.navigation.state.params.siteId
                el.bfmId = this.props.navigation.state.params._bfmId
                el.flag = this.props.navigation.state.params.label
                el.pointId = this.pointInfoItem.pointId
                el.abscissa = this.pointInfoItem.abscissa
                el.ordinate = this.pointInfoItem.ordinate
                el.paperOfMeasuredId = this.pageParams.paperOfMeasuredId
                el.child && el.child.map((item, index) => {
                    item.prop = 'input' + index
                    el['input' + index] = item.inputData + ''
                })
            })  
            this.setState({
                jcxList: point.child,
                showJcx: true
            })
        })
        

        
    }
    render() { 
        const style = (w) => {
            let color = this.state.activity == w ? '#2EBBC4' : undefined
            return {
                color: color,
                borderBottomWidth: color?2:0,
                padding: color ? 3 : 5,
                marginLR: 10,
                borderBottomColor: color
            }
        } 
        
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    event={params => { 
                        this.setState({
                            activity: params.prop
                        })
                    }}
                    columns={[
                        {type: 'button-text', prop: 'cld', value: '测量点', style: style('cld')},
                        {type: 'button-text', prop: 'bd', value: '爆点', style: style('bd')},
                        {type: 'br-row', style: {marginTB: 1, paddingBottom: 1}}
                    ]}
                /> 
                <View style={{flex: 1}}>
                    <WebView    
                        ref={ref => this.webView = ref}
                        javaScriptEnabled={true}  
                        useWebKit={true}  
                        onLoadEnd={() => { 
                            var timer = setInterval(() => {
                                if (this.pageParams) {
                                    clearInterval(timer) 
                                    this.webView.postMessage(JSON.stringify(
                                        { key: 'drawPic', value: this.pageParams.paperUrl }
                                    ))  
                                }
                            }, 50)
                            
                        }}
                        source={{html: datas.html}} 
                        onMessage={e => {   
                            if (e.nativeEvent.data == 'drawPicOver') { 
                                this.webView.postMessage(JSON.stringify({
                                    key: 'drawPoints', value: this.points 
                                }))
                            } else if (Array.isArray(JSON.parse(e.nativeEvent.data))) {
                                let list = JSON.parse(e.nativeEvent.data)
                                if (list.length > 1) { 
                                    this.setState({
                                        chooseList: {list: list}
                                    }) 
                                    this.choosePointSlidePop.show()
                                } else {
                                    this._showList(list[0])
                                }
                            }

                        }} 
                    />
                </View>
                <Freedomen.Region  
                    event={params => {
                        if (params.prop == 'bdqd') 
                            this.props.navigation.push('BaoDianQinDan', this.props.navigation.state.params)
                        else if (params.prop == 'ztsm')
                            this.setState({ visible: true })
                        else if (params.prop == 'xzmd')
                            this.props.navigation.push('XinZen', this.pageParams)
                    }}
                    columns={[
                        {type: 'button-text-primary', prop: 'xzmd', value: '新增描点', style: {flex: 1, align: 'center'}},
                        {type: 'button-text-primary', prop: 'bdqd', value: '爆点清单', style: {flex: 1, align: 'center'}},
                        {type: 'button-text-primary', prop: 'ztsm', value: '状态说明', style: {flex: 1, align: 'center'}},
                        {type: 'br', style: {height: 45, flexDirection: 'row', padding: 10, backgroundColor: 'white', marginTop: 1}}
                    ]}
                />
                {
                    this.state.showJcx ?
                    <View  style={{position: 'absolute', bottom: 0, width: '100%', height: '55%', zIndex: 10, paddingTop: 10, backgroundColor: '#f5f5f5'}}>
                        <Freedomen.Region 
                            event={params => {
                                this.setState({
                                    showJcx: false
                                })
                            }}
                            columns={[
                                {type: 'button-text', style: {backgroundColor: 'white', marginBottom: 5, width: 75, height: 8, borderRadius: 5, alignSelf: 'center'}}
                            ]}
                        />
                        <ScrollView style={{flex: 1}} ref='scroll' >
                            {
                                this.state.jcxList.map((el, index) => {
                                    return  <Freedomen.Region 
                                                data={Object.assign({}, el)}
                                                event={params => {

                                                    if (this.points.filter(el => el.pointId == this.pointId).length) {

                                                    }
                                                    if (params.prop == 'save') { 
                                                        this.points.
                                                        store.get('pointInfo').then(res => {
                                                            res = res || {}
                                                            this.state.jcxList[index] = params.row
                                                            res[this.pointId] = this.state.jcxList
                                                            Freedomen.redux({
                                                                'scsl_list': data => {
                                                                    data.list[0].tonbu =  Object.keys(res).length
                                                                    return data
                                                                }
                                                            })
                                                            store.set('pointInfo', res)
                                                            
                                                        }).catch(r => {
                                                            this.state.jcxList[index] = params.row
                                                            let res = {}
                                                            res[this.pointId] = this.state.jcxList
                                                            Freedomen.redux({
                                                                'scsl_list': data => {
                                                                    data.list[0].tonbu =  Object.keys(res).length
                                                                    return data
                                                                }
                                                            })
                                                            store.set('pointInfo', res)
                                                        })

                                                    } else if (params.prop == 'add') { 
                                                        let row = params.row
                                                        if (row.child == void 0) 
                                                            row.child = []

                                                        row.child.push({
                                                            prop: 'input' + row.child.length,
                                                        })
                                                        return row
                                                    } else if (params.prop == 'clear') {
                                                        (params.row.child || []).map(el => {
                                                            params.row[el.prop] = ''
                                                        })
                                                        return params.row
                                                    } else if (params.prop && params.prop.indexOf('input') === 0) {
                                                       let row = params.row
                                                       row.$activity = params.prop 
                                                       this._bindInput(index, row, params.prop)
                                                       return row
                                                    }
                                                    this.state.jcxList[index] = params.row
                                                }}
                                                columns={[ 
                                                    {type: 'text-h3', prop: 'title', value: '实测实量', style: {padding: 5, marginTop: 5}},
                                                    [
                                                        {type: 'text-h3', value: '实测区'},
                                                        {type: 'image-icon', value: require('../../assets/dw.png'), style: {flex: 1, paddingLR: 8,}},
                                                        {type: 'button-text', prop: 'clear', value: '清空', style: {color: 'red', marginLR: 5}},
                                                        {type: 'button-text', prop: 'save', value: '保存', style: {marginLR: 5}},
                                                        {type: 'br', style: {flexDirection: 'row', borderColor: '#f5f5f5', borderBottomWidth: 1, borderTopWidth: 1, padding: 5, paddingTB: 10}}
                                                    ],
                                                    [
                                                        {type: 'text-h3', prop: 'content',value: '同一室内的底部'},
                                                        [
                                                            {type: 'input-text', prop: 'standardNum', placeholder: '设计值', style: {borderColor: '#ccc', borderWidth: .5, width: 55, align: 'center', padding: 2, marginLR: 2}},
                                                            {type: 'input-text', prop: 'errorLowerLimit', placeholder: '-5', style: {borderColor: '#ccc', borderWidth: .5, width: 40, align: 'center', padding: 2, marginRight: 2}},
                                                            {type: 'input-text', prop: 'errorUpperLimit', placeholder: '5', style: {borderColor: '#ccc', borderWidth: .5, width: 40, align: 'center', padding: 2, marginRight: 2}},
                                                            {type: 'br', prop: 'isNew', load: value => value, style: {flexDirection: 'row', flex: 1}}
                                                        ],
                                                        {type: 'br', style: {flexDirection: 'row', padding: 5, alignItems: 'center'}}
                                                    ],
                                                    [
                                                        (data) => {
                                                            let arr = []
                                                            for (let i = 0; i < (data.child || []).length; i ++) {
                                                                arr.push({type: 'button-text', prop: data.child[i].prop, keyboardType: 'number-pad', value: data[data.child[i].prop] || '数值',  
                                                                    style: () => {
                                                                        let bgColor = data.child[i].prop == data.$activity ? '#ccc' : 'white'
                                                                        return {borderColor: '#f5f5f5', borderWidth: .5, paddingLR: 5, align: 'center', marginLR: 5, padding: 5, backgroundColor: bgColor}
                                                                    } 
                                                                })
                                                            }
                                                            arr.push({type: 'br', style: {flexDirection: 'row', flexWrap: 'wrap'}})
                                                            return arr
                                                        }, 
                                                        {type: 'button-primary', prop: 'add', value: '新增', style: {padding: 5, borderRadius: 5}},
                                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
                                                    ], 
                                                    {type:'br', style: {padding: 8, backgroundColor: 'white', margin: 2}}
                                                ]}
                                            /> 
                                })
                            }
                        </ScrollView>
                        <Freedomen.Region  
                            event={params => { 
                                if (params.prop == 'ztsm')
                                    this.setState({ visible: true })
                                else if (params.prop == 'xzjcx') {
                                    this.slidePop.show()
                                }
                            }}
                            columns={[
                                {type: 'button-text-primary', prop: 'xzjcx', value: '新增检查项', style: {flex: 1, align: 'center'}},
                                {type: 'button-text-primary', prop: 'ztsm', value: '状态说明', style: {flex: 1, align: 'center'}},
                                {type: 'br', style: {height: 45, flexDirection: 'row', padding: 10, backgroundColor: 'white'}}
                            ]}
                        /> 
                    </View>: null
                }
                <Dialog
                    visible={this.state.visible} 
                    dialogTitle={<DialogTitle title="图钉颜色说明" />}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    footer={
                        <DialogFooter>
                            <DialogButton
                            textStyle={{color: '#2EBBC4'}}
                            text="知道了"
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                            /> 
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Freedomen.Region 
                            columns={[
                                [
                                    {type: 'image-icon', value: require('../../assets/q.png')},
                                    {type: 'text-h4', value: '该处暂无需要检测的检查项'},
                                    {type: 'br-row'}
                                ], [
                                    {type: 'image-icon', value: require('../../assets/xyjc.png')},
                                    {type: 'text-h4', value: '该处需要检测'},
                                    {type: 'br-row'}
                                ], [
                                    {type: 'image-icon', value: require('../../assets/okweizhi.png')},
                                    {type: 'text-h4', value: '该处已完成检测'},
                                    {type: 'br-row'}
                                ],
                            ]}
                        />
                    </DialogContent>
                </Dialog> 
                <Freedomen.SlidePop style={{top: '55'}} ref={ref => this.slidePop = ref} >
                    <ScrollView>
                        {
                            this.state.checks.map((el, index) => {
                                //console.log(this.state.checks)
                                return <Freedomen.Region 
                                    data={el}
                                    key={index}
                                    event={params => {
                                        this.slidePop.hide() 
                                        let jcxList = this.state.jcxList
                                        let jcx = {
                                            title: params.row.checkName,
                                            projectId: Freedomen.global.project.projectId,
                                            measuredSiteId: this.props.navigation.state.params.siteId,
                                            bfmId: this.props.navigation.state.params._bfmId,
                                            flag: this.props.navigation.state.params.label,
                                            pointId: this.pointInfoItem.pointId,
                                            abscissa: this.pointInfoItem.abscissa,
                                            ordinate: this.pointInfoItem.ordinate,
                                            paperOfMeasuredId: this.pageParams.paperOfMeasuredId,
                                            isNew: true,
                                            checkTypeId: params.row.checkId,
                                            content: params.row.remark,
                                            child: [{prop: 'input0'}],
                                            input0: '' 
                                        }

                                        jcxList.push(jcx)
                                        this.setState({
                                                jcxList: jcxList
                                            }, () => {
                                                this.refs.scroll.scrollToEnd({animated: true})
                                            })
                                        }}
                                    columns={[
                                        {type: 'button-text', prop: 'checkName', value: '123', style: {borderColor: '#666', color: '#333', borderWidth: 1, margin: 5, padding: 12, alignItems: 'center'}}
                                    ]}
                                />       
                            })
                        }
                    </ScrollView>
                </Freedomen.SlidePop>


                <Freedomen.SlidePop style={{top: '55'}} ref={ref => this.choosePointSlidePop = ref} >
                    <Freedomen.Region 
                        style={{flex: 1}}
                        data={this.state.chooseList}
                        event={params => { 
                            this._showList(params.value.row) 
                            this.choosePointSlidePop.hide()
                        }}
                        columns={[
                            {type: 'scroll', prop: 'list', value: [], columns: [
                                {type: 'button-text', prop: 'tag', value: '123', style: {borderColor: '#666', color: '#333', borderWidth: 1, margin: 5, padding: 12, alignItems: 'center'}}
                            ]}
                        ]}
                    />
                </Freedomen.SlidePop>


                <BleUtil getMessage={msg => {
                    msg = parseInt(parseFloat(msg.substring(msg.lastIndexOf('g') + 1, msg.lastIndexOf('m'))) * 1000) 

                    if (!this.jcxItem)
                        return
                    let jcxList = this.state.jcxList

                    for (let i = 0; i < this.jcxItem.child.length; i ++) {
                        if (this.jcxItem.child[i].prop == this.listItemProp) {
                            
                            this.jcxItem[this.listItemProp] = msg
                            this.jcxItem.child[i].value = msg
                            break
                        }
                    }
                    jcxList[this.jcxIndex] = this.jcxItem  
                    this.setState({
                        jcxList: jcxList
                    }) 
                }} />
            </View>
        );
    }
  }