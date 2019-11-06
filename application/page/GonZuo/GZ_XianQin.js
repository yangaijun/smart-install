import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Alert, Dimensions, Modal} from 'react-native' 
import ImageViewer from 'react-native-image-zoom-viewer';
import P_Sound from '../APublic/P_Sound';
import P_Chat from '../APublic/P_Chat';
var slidePop, jianYan, jinDuFanKui

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        let obj = {
            title: '任务详情' 
        } 
        console.log(navigation.state.params.status)
        if (navigation.state.params.status == 2 || (navigation.state.params.status == 3 && navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId) ) 
            obj.headerRight = <Freedomen.Region
                event={params => {
                    if (navigation.state.params.status == 2 && navigation.state.params.jasoUserId != Freedomen.global.user.jasoUserId)
                        jinDuFanKui.show()
                    else if (navigation.state.params.status == 3)
                        jianYan.show()
                    else
                        slidePop.show() 
                }}
                columns={[
                    {type: 'button-image-right', value: require('../../assets/more.png')}
                ]}
            />
        return obj
    }
    constructor(props) {
        super(props)
        this.state = { 
            data: {...props.navigation.state.params, canYuRen: [], zhenGaiRen: [], zhiDinRen: []},
            visible: false,
            images: []
        } 
        this.data = this.state.data

        Freedomen.global.tianjiacanyuren = (list) => {
            let params = list.map(el => {
                return {
                    companyId: this.state.data.companyId,
                    projectId: this.state.data.projectId,
                    workTaskId: this.state.data.workTaskId,
                    jasoUserId: el.jasoUserId,
                    userRealName: el.userRealName,
                    type: 2
                }
            }) 
            console.log(params)
            Freedomen.global.api.call('/WorkTask/addAboutUserList', params).then(res => {
                this.setState({
                    data: {
                        ...this.state.data,
                        canYuRen: this.state.data.canYuRen.concat(list)
                    }
                })
            })
        }
    }
    componentDidMount() {
        Freedomen.global.api.call('/WorkTask/selectById', this.props.navigation.state.params).then(res => {
            let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
            res.userInfo.map(el => {
                if (el.type == 1) zhenGaiRen.push(el)
                else if (el.type == 2) canYuRen.push(el) 
            }) 
            this.setState({
                data: {
                    ...this.props.navigation.state.params, userInfo: res.userInfo, canYuRen: canYuRen, zhenGaiRen: zhenGaiRen, zhiDinRen: zhenGaiRen
                }
            })
        }) 
    }
    _content(flex) {
        return <Freedomen.Region 
            style={{padding: 6, flex: flex, backgroundColor: 'white'}}
            event={params => {  
                if (params.prop == 'picture') {
                    let images = [{url:  params.value}]
                    this.setState({
                        visible: true,
                        images: images
                    })
                } else if (params.prop == 'luyin') {
                    P_Sound.play(params.value)
                } else if (params.prop == 'tianjiacanyuren') { 
                    this.props.navigation.push('CP_XinZenCanYuRen', {list: params.row.canYuRen, projectId: params.row.projectId})
                }
            }}
            data={this.state.data}
            columns={[
                [
                    {type: 'text-label', value: '项目名称:', style: {width: 80}},
                    {type: 'text-p', prop: 'projectName'},
                    {type: 'br-normal-row'}
                ],
                [
                    {type: 'text-label', value: '执行人:', style: {width: 80}},
                    {type: 'text-p', prop: 'zhenGaiRen', filter: value => value.map(el => el.userRealName).join(',')},
                    {type: 'br-normal-row', load: (value, data) => data.status == 1}
                ],  [
                    {type: 'text-label', value: '任务名称:', style: {width: 80}},
                    {type: 'text-p', prop: 'taskTopic'},
                    {type: 'br-normal-row'}
                ], [
                    {type: 'text-label', value: '日期:', style: {width: 80}},
                    {type: 'text-p', prop: 'createTime', filter: (value, data) => {
                        return data.taskTime + (data.finishedDate ? '至' + data.finishedDate : '')
                    }},
                    {type: 'br-normal-row'}
                ], [
                    {type: 'text-label', value: '描述:', style: {width: 80}},
                    [
                        {type: 'text-h5', prop: 'taskDetail'},
                        (data) => { 
                            let imageFiles = (data.imageFiles || '').split(',')
                            let arr = []
                            if (data.imageFiles)
                                for (let i = 0; i < imageFiles.length; i ++) {
                                    arr.push({type: 'button-image-picture', prop: 'picture', value: `http://www.jasobim.com:8085/${imageFiles[i]}`})
                                }
                            let voiceFiles = (data.voiceFiles || '').split(',')
                            if (data.voiceFiles)
                                for (let i = 0; i < voiceFiles.length; i ++) {
                                    arr.push({type: 'button-image-picture', prop: 'luyin', value: voiceFiles[i], filter: value => require('../../assets/lywenjian.png')})
                                }
                            arr.push({type: 'br-normal-row', load: () =>  imageFiles.length || voiceFiles.length})
                            return arr
                        }
                    ],
                    {type: 'br-normal-row'}
                ], [
                    {type: 'text-label', value: '参与人:', style: {width: 80}},
                    {type: 'views-x', prop: 'userInfo', columns: [
                        {type: 'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`, style: {height: 30, width: 30, borderRadius: 15, marginRight: -5}},
                        {type: 'br', style: {backgroundColor: 'white', marginRight: -10}}
                    ]}, 
                    {type: 'button-image', prop: 'tianjiacanyuren', value: require('../../assets/tianjiacanyuren.png'), style: {height: 35, width: 35}},
                    {type: 'br-normal-row'}
                ]
            ]}
        /> 
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.state.data.status == 1 && Freedomen.global.user.jasoUserId !== this.state.data.jasoUserId ? 
                    this._content() 
                    :
                    <P_Chat replyType={4} aboutId={this.props.navigation.state.params.workTaskId} focus={this.props.navigation.state.params.focus}> 
                        {this._content()}
                    </P_Chat>
                }
                {
                    this.state.data.status == 1 && Freedomen.global.user.jasoUserId !== this.state.data.jasoUserId &&
                    <Freedomen.Region 
                        style={{ flex: 1, justifyContent: 'flex-end'}}
                        event={params => { 
                            let fn = () => { 
                                Freedomen.global.api.call('/WorkTask/accept', {
                                    ...this.state.data,
                                    isAccept:  params.prop == 'jieshou' ? 1 : 2
                                }).then(res => {
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    this.props.navigation.goBack()
                                })
                            }
                            if (params.prop == 'jujue') {
                                Alert.alert('提示', '您确定要拒绝任务吗？', [{text: '确定', onPress: () => {
                                    fn()
                                }}, {text: '取消'}])
                            } else {
                                fn ()
                            }
                        }}
                        columns={[
                            [
                                {type: 'image-icon', value: require('../../assets/jujuegonzuo.png')},
                                {type: 'text-must', value: '拒绝任务'},
                                {type: 'click', prop: 'jujue', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                            ], [
                                {type: 'image-icon', value: require('../../assets/jieshougonzuo.png')},
                                {type: 'text-primary', value: '接受任务'},
                                {type: 'click', prop: 'jieshou', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                            ],
                            {type: 'br', style: {height: 52, flexDirection: 'row', backgroundColor: 'white',borderTopWidth: 1, borderTopColor: '#f5f5f5', align: 'center',}}
                        ]}
                    /> 
                }
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 162, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                            if (params.value == '催办工作')
                                Alert.alert("提示", "您确定要催促对方完成工作吗?", [
                                    {text: '确定', onPress: () => {
                                        Freedomen.global.api.call('/Reply/add', {
                                            replyType: 4,
                                            colorState: 3, 
                                            replyContent: '时间快到了，请尽快完成，谢谢！',
                                            aboutId: this.state.data.workTaskId
                                        }).then(res => { 
                                            Freedomen.global.toast('催办完成')
                                        })
                                    }},
                                    {text: '取消'}
                                ])
                            else if (params.value == '重要程度')
                                this.slidePop.show()
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '重要程度', style: {color: '#2EBBC4',marginBottom: 1}, load: () => this.props.navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId},
                            {type: 'button-pop-item', value: '催办工作', style: {color: '#2EBBC4',marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 110, backgroundColor: '#f5f5f5'}} ref={ref => {jianYan = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            jianYan.hide()
                            this.props.navigation.push('GZ_YanShou', this.state.data)  
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '工作验收', style: {color: '#2EBBC4',marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 215, backgroundColor: '#f5f5f5'}} ref={ref => {this.slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            this.slidePop.hide() 
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '一般', style: {color: '#00CC9B',marginBottom: 1}},
                            {type: 'button-pop-item', value: '重要', style: {color: '#FAB722',marginBottom: 1}},
                            {type: 'button-pop-item', value: '紧急', style: {color: '#FF6D73',marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {jinDuFanKui = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            jinDuFanKui.hide()
                            if (params.value == '进度反馈') {
                                this.props.navigation.push('GZ_JinDuFanKui', {...this.state.data, partFlag: '工作任务'})
                            } 
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '进度反馈', style: {color: '#2EBBC4', marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => {
                    this.setState({
                        visible: false
                    })
                }}>
                    <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} onSwipeDown={() => {
                        this.setState({
                            visible: false
                        })
                    }}/>
                </Modal>
            </View>
        );
    }
  }