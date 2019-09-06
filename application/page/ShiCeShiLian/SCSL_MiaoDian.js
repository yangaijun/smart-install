import React from 'react'
import {ScrollView, Alert, Animated, Easing, View, Dimensions} from "react-native";
import Freedomen from 'react-native-freedomen'  
import store from 'react-native-freedomen/store'
import BleUtil from "../../utils/BleUtil";
import columns from '../../region/columns'
import P_WebView from '../APublic/P_WebView'
import P_Dialog from '../APublic/P_Dialog';  

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.label
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            checkTypeList: {list: []},
            activity: 'cld',

            activityItem: {},
            height: new Animated.Value(0),
            checkData: {list: []},

            showJianChaXian: false
        }   

        this.to = Dimensions.get('window').height * 0.55
        this.label = props.navigation.state.params.label
    }

    componentDidMount() {  
        console.log(this.props.navigation.state.params)

        store.get('pointList').then(res => {
            this.points = res.filter(el => el.measureSiteId == this.props.navigation.state.params.measureSiteId)  
            if (this.points.length >= 1) {
                this.nextLabel = this.points[this.points.length - 1].label + 1
            } else {
                this.nextLabel = 1
            }
            
        })

        store.get('checkTypeList').then(res => { 
            this.checkTypeFilter = {}
            res.map(el => { 
                this.checkTypeFilter[el.projectCheckTypeId] = el.checkName
            })
            this.setState({ checkTypeList: {list: res} })
        })

        Freedomen.global.fn = (value) => { 
            console.log(this.props.navigation.state.params)
            this.webView._instruction({key: 'drawSelect', value: {label: this.nextLabel, ...value}})
            this.selectPoint = {
                ...value,
                label: this.nextLabel ++,
                measureSiteId: this.props.navigation.state.params.measureSiteId,
                projectId: Freedomen.global.project.projectId,
                measurePaperId: this.props.navigation.state.params.measurePaperIds
            }
            let checkData = {
                list: [{...value, isAdd: 1, dataLogList: [], noSave: true}]
            } 
            this._startAnimated(this.to)
            this.setState({
                checkData: checkData
            })
        }
    }  
    _inputData(data) { 
        var checkData = this.state.checkData
        checkData.list[this.indexA].dataLogList[this.indexB].inputData = data
        this.setState({
            checkData: checkData
        })
    }

    _saveData(data) {  
        
        if (!data.standardNum) {
            Alert.alert('提示', '请输入设计值', [{text: '确定'}])
            return
        }
        data.dataLogList = data.dataLogList.filter(el => {
            el.projectCheckTypeId = data.projectCheckTypeId

            if (!el.inputData)
                return false
            else {
                let result = parseInt(el.inputData) - parseInt(data.standardNum)
                el.status = (result >= parseInt(data.errorLowerLimit || -5) &&  result <=  parseInt(data.errorUpperLimit || 5)) ? 1 : 2
                return true
            }
            
        }) 
        // console.log(data, this.state.checkData.list)
        this.selectPoint.pointCheckList = this.state.checkData.list

        store.get('pointList').then(res => {
            if (this.selectPoint.measurePointId) {  
                res.forEach(el => {
                    if (el.measurePointId == this.selectPoint.measurePointId) {
                        el = this.selectPoint
                    }
                })
            } else {
                for (var i = 0; i < res.length; i ++) {
                    if (res[i].measureSiteId == this.props.navigation.state.params.measureSiteId && res[i].label == this.selectPoint.label) {
                        res[i] = this.selectPoint
                        return
                    }
                }
                if (i == res.length) {
                    res.push(this.selectPoint)
                }
            }
            store.set('pointList', res)
        })
    }
    _startAnimated(to) {
        if (to == this.to && this.state.showJianChaXian === false)
            this.setState({
                showJianChaXian: true
            }, () => {
                this.state.height.setValue(0)
                Animated.timing(this.state.height, {
                    toValue: to,
                    duration: 280,
                    easing: Easing.linear 
                }).start()
            }) 
        else if (to === 0)  {
            Animated.timing(this.state.height, {
                toValue: to,
                duration: 220,
                easing: Easing.linear 
            }).start(() => {
                this.setState({
                    showJianChaXian: false
                })
            })
        }
    } 
    render() { 
        const tagStyle = (data, prop) => {
            let color = data.activity == prop ? '#2EBBC4' : '#121212'
            let borderBottomColor = data.activity == prop ? '#2EBBC4' : '#ddd'
            return {
                color: color,
                borderBottomColor: borderBottomColor,
                borderBottomWidth: 2,
                padding: 10,
                paddingLR: 15
            }
        }
        
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    event={params => { 
                        return {
                            activity: params.prop
                        }
                    }}
                    data={{activity: 'cld'}}
                    columns={[
                        {type: 'button-text', prop: 'cld', value: '测量点', style: (value, data) => {
                            return tagStyle(data, 'cld')
                        }}, 
                        {type: 'button-text', prop: 'bd', value: '爆点', style: (value, data) => {
                            return tagStyle(data, 'bd')
                        }},
                        {type: 'br-normal-row', style: {backgroundColor: 'white'}}
                    ]}
                /> 
                <View style={{flex: 1}}>
                    <P_WebView ref={ref => this.webView = ref} measurePaperId={this.props.navigation.state.params.measurePaperIds} event={params => {
                        if (params == 'drawPicOver')
                            this.webView._instruction({key: 'drawPoints', value: this.points})
                        else  {
                            let data = JSON.parse(params)
                            if (data.length == 1) {
                                this.selectPoint = data[0]
                                console.log(data)
                                this.webView._instruction({key: 'drawSelect', value: data[0]})
                                let point = this.points.filter(el => el.measurePointId == data[0].measurePointId)
                               
                                if (point.length >= 1) { 
                                    this.setState({
                                        checkData: {list: point[0].pointCheckList}
                                    }, () => {
                                        console.log(point[0].pointCheckList)
                                    })
                                }

                                this._startAnimated(this.to)
                            } else if (data.length > 1) {
                                // tan tan tan
                            } 
                        }
                    }}/>
                </View>
                {
                    !this.state.showJianChaXian 
                    ?  
                    <Freedomen.Region  
                        event={params => {
                            if (params.prop == 'bdqd') 
                                this.props.navigation.push('BaoDianQinDan', this.props.navigation.state.params)
                            else if (params.prop == 'ztsm')
                                this.dialog._show()
                            else if (params.prop == 'xzmd')
                                this.props.navigation.push('SCSL_XinZen', this.props.navigation.state.params)
                        }}
                        columns={[
                            {type: 'button-text-primary', prop: 'xzmd', value: '新增描点', style: {flex: 1, align: 'center'}},
                            {type: 'button-text-primary', prop: 'bdqd', value: '爆点清单', style: {flex: 1, align: 'center'}},
                            {type: 'button-text-primary', prop: 'ztsm', value: '状态说明', style: {flex: 1, align: 'center'}},
                            {type: 'br', style: {height: 45, flexDirection: 'row', padding: 10, backgroundColor: 'white', marginTop: 1}}
                        ]}
                    />
                    : 
                    <Animated.View style={{width: '100%', height: this.state.height}}>
                        <Freedomen.Region 
                            style={{flex: 1}}
                            event={params => {
                                if (params.prop == 'close') 
                                    this._startAnimated(0)
                                else if (params.value && params.value.prop == 'add') {
                                    params.value.row.dataLogList.push({
                                        inputData: '', 
                                        measureSiteInfo: this.label,  
                                        projectId: this.selectPoint.projectId,
                                        measurePointId: this.selectPoint.measurePointId,
                                        measureSiteId: this.selectPoint.measureSiteId 
                                    })
                                    return params.value.row
                                } else if (params.value && params.value.prop == 'clear') {
                                    params.value.row.dataLogList = []
                                    return params.value.row
                                } else if (params.value && params.value.prop == 'save') {
                                    this._inputData('9527')
                                    this._saveData(params.value.row)
                                    //save
                                    // params.value.row.noSave = false
                                    // return params.value.row
                                } else if (params.value && params.value.value && params.value.value.row) {
                                    //点击方格 
                                    this.indexA = params.$index
                                    this.indexB = params.value.$index

                                    this.state.checkData.list[params.$index].noSave && this.setState({
                                        activityItem: params.value.value.row
                                    })
                                } 
                            }}
                            data={this.state.checkData}
                            columns={[
                                {type: 'button-text', prop: 'close', style: {backgroundColor: 'white', marginTB: 4, width: 225, height: 10, borderRadius: 5, alignSelf: 'center'}},
                                {type: 'scroll', value: [], prop: 'list', columns: [
                                    {type: 'text-h5', prop: 'title', value: '实测实量-设备安装', style: {fontWeight: '500'}},
                                        [
                                            {type: 'text-h5', value: '实测区'},
                                            {type: 'text-h5', prop: 'isAdd', filter: value =>  value ? '【现场新增】' : ''},
                                            {type: 'image-form', value: require('../../assets/dw.png'), style: {flex: 1}},
                                            {type: 'button-text', prop: 'clear', value: '清空', style: {color: 'red', marginLR: 5}, load: (value, data) => data.noSave},
                                            {type: 'button-text', prop: 'save', value: '保存', style: {marginLR: 5}},
                                            {type: 'br-normal-row', style:{paddingTB: 5, marginTB: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f5f5f5'}}
                                        ],
                                        {type: 'text-h5', prop: 'projectCheckTypeId', filter: this.checkTypeFilter},
                                        [
                                            {type: 'input-text-item', prop: 'standardNum', placeholder: '设计值'},
                                            {type: 'input-text-item', prop: 'errorLowerLimit', placeholder: '-5'},
                                            {type: 'input-text-item', prop: 'errorUpperLimit', placeholder: '5'},
                                            {type: 'br', load: (value, data) => data.noSave, style: {flexDirection: 'row', flex: 1, paddingTB: 5}}
                                        ],
                                        [
                                            {type: 'views', prop: 'dataLogList', style: {flexDirection: 'row'}, columns: [
                                                {type: 'button-text', prop: 'inputData', style: (value, data) => {
                                                    let color = this.state.activityItem == data ? '#d5d5d5' : '#fff'
                                                    return {borderColor: '#ccc', minWidth: 38, borderWidth: .5, align: 'center', marginRight: 5, padding: 2, paddingLR: 5, backgroundColor: color}
                                                } }
                                            ]},
                                            {type: 'button-primary', prop: 'add', value: '新增', style: {padding: 3, paddingLR: 6, borderRadius: 2, fontSize: 12, fontWeight: '100'}, load: (value, data) => data.dataLogList.length < 5 && data.noSave},
                                            {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
                                        ], 
                                        {type:'br', style: {padding: 10, backgroundColor: 'white', margin: 2}}
                                    ]} 
                            ]}
                        />
                        <Freedomen.Region  
                            event={params => { 
                                if (params.prop == 'ztsm')
                                    this.dialog._show()
                                else if (params.prop == 'xzjcx') {
                                    this.slidePop.show()
                                }
                            }}
                            columns={[
                                {type: 'button-text-primary', prop: 'xzjcx', value: '新增检查项', style: {flex: 1, align: 'center'}},
                                {type: 'button-text-primary', prop: 'ztsm', value: '状态说明', style: {flex: 1, align: 'center'}},
                                {type: 'br', style: {height: 45, flexDirection: 'row', padding: 10, borderTopColor: '#f5f5f5', borderTopWidth: 1, backgroundColor: 'white'}}
                            ]}
                        /> 
                    </Animated.View>
                }
                <P_Dialog ref={ref => this.dialog = ref}> 
                    <Freedomen.Region 
                        event={params => {
                            this.dialog._hide()
                        }}
                        columns={[
                            [
                                {type: 'image-icon', value: require('../../assets/q.png')},
                                {type: 'text-h4', value: '该处暂无需要检测的检查项'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'image-icon', value: require('../../assets/xyjc.png')},
                                {type: 'text-h4', value: '该处需要检测'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'image-icon', value: require('../../assets/okweizhi.png')},
                                {type: 'text-h4', value: '该处已完成检测'},
                                {type: 'br-normal-row'}
                            ],
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </P_Dialog>

                <Freedomen.SlidePop style={{top: '48'}} ref={ref => this.slidePop = ref} >
                    <Freedomen.Region 
                        style={{flex: 1, paddingTop: 2}}
                        event={params => {
                            let checkData = this.state.checkData
                            checkData.list.push({isAdd: 1, ...params.value.row, dataLogList: [], noSave: true})  
                            this.slidePop.hide()
                            this.setState({
                                checkData: checkData
                            })
                        }}
                        data={this.state.checkTypeList}
                        columns={[
                            {type: 'scroll', prop: 'list', style: {backgroundColor:'white'}, columns: [
                                {type: 'button-text', prop: 'checkName', value: '123', style: {borderColor: '#f5f5f5', color: '#333', borderWidth: 2, margin: 5, padding: 12, alignItems: 'center'}}
                            ]}
                        ]}
                    /> 
                </Freedomen.SlidePop>

                <P_Dialog ref={ref => this.chooseDialog = ref}>
                    <Freedomen.Region 
                        event={params => {
                            this.dialog._hide()
                        }}
                        columns={[
                            [
                                {type: 'image-icon', value: require('../../assets/q.png')},
                                {type: 'text-h4', value: '该处暂无需要检测的检查项'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'image-icon', value: require('../../assets/xyjc.png')},
                                {type: 'text-h4', value: '该处需要检测'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'image-icon', value: require('../../assets/okweizhi.png')},
                                {type: 'text-h4', value: '该处已完成检测'},
                                {type: 'br-normal-row'}
                            ],
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </P_Dialog>


                {/* <BleUtil getMessage={msg => {
                    // msg = parseInt(parseFloat(msg.substring(msg.lastIndexOf('g') + 1, msg.lastIndexOf('m'))) * 1000) 

                    // if (!this.jcxItem)
                    //     return
                    // let jcxList = this.state.jcxList

                    // for (let i = 0; i < this.jcxItem.child.length; i ++) {
                    //     if (this.jcxItem.child[i].prop == this.listItemProp) {
                            
                    //         this.jcxItem[this.listItemProp] = msg
                    //         this.jcxItem.child[i].value = msg
                    //         break
                    //     }
                    // }
                    // jcxList[this.jcxIndex] = this.jcxItem  
                    // this.setState({
                    //     jcxList: jcxList
                    // }) 
                }} /> */}
            </View>
        );
    }
  }