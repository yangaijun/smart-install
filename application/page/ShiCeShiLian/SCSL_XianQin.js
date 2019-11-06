import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Alert, View, Dimensions, Modal} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import P_Sound from '../APublic/P_Sound';
import P_Chat from '../APublic/P_Chat';
var slidePop = null, slidePopDys = null, jinDuFanKui = null

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => { 
        return {
            title: { 2: '进行中', 3: '待验收', 4: '已完成'}[navigation.state.params.status], 
            headerRight: ((navigation.state.params.status == 3 || (navigation.state.params.status == 2 && navigation.state.params.jasoUserId !== Freedomen.global.user.jasoUserId) || (navigation.state.params.status == 2 && navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId)) && <Freedomen.Region 
                event={params => {  
                    if (navigation.state.params.status == 2 && navigation.state.params.jasoUserId !== Freedomen.global.user.jasoUserId)
                        jinDuFanKui.show()
                    else
                        navigation.state.params.status == 3 && navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId ? slidePopDys.show() : slidePop.show() 
                }}
                columns={[
                    {type: 'button-image-right', value: require('../../assets/more.png')}
                ]}
            />)
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            data: props.navigation.state.params,
            visible: false,
            images: []
        }
        console.log(this.state.data)
        Freedomen.global.tianjiacanyuren = (list) => {
            let params = list.map(el => {
                return {
                    aboutId: this.props.navigation.state.params.measureProblemId,
                    companyId: this.state.data.companyId,
                    projectId: this.state.data.projectId,
                    jasoUserId: el.jasoUserId,
                    userRealName: el.userRealName,
                    type: 2
                }
            }) 
            Freedomen.global.api.call('/MeasureProblem/addAboutUserList', params).then(res => {
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
        Freedomen.global.api.call('/MeasureProblem/selectById', this.props.navigation.state.params).then(res => {
            let zhenGaiRen = res.userInfo.filter(el => {
                return el.type === 1
            })
            console.log(res)
            this.setState({
                data: {
                    ...this.state.data,
                    zhenGaiRen: zhenGaiRen,
                    ...res.measureProblem,
                    ...res,
                    canYuRen: res.userInfo
                }
            })
            this.point = res
         })
    } 
    render() {
        return (
            <View style={{flex: 1}}>
                <P_Chat replyType={1} aboutId={this.props.navigation.state.params.measureProblemId}>
                    <Freedomen.Region 
                        style={{padding: 6, backgroundColor: 'white'}}
                        event={params => {
                            if (params.prop == 'weizhi' && this.point) {
                                this.props.navigation.push('P_ShowPoint', this.point)
                            } else if (params.prop == 'picture') {
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
                                {type: 'text-label', value: '指派人:', style: {width: 80}},
                                {type: 'text-h5', prop: 'userRealName'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'text-label', value: '整改人:', style: {width: 80}},
                                {type: 'text-h5', prop: 'zhenGaiRen', filter: value => value && value.map(el => el.userRealName).join(',')},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'text-label', value: '截止日期:', style: {width: 80}},
                                {type: 'text-h5', prop: 'finishedDate', filter: 'yyyy-MM-dd'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'text-h5', prop: 'userRealName', style: {marginRight: 10}},
                                {type: 'text-h5', prop: 'createTime', filter: 'yyyy-MM-dd hh:mm'},
                                {type: 'br-normal-row', style: {marginTop: 10}}
                            ], [
                                {type: 'text', prop: 'checkName', filter: value => value + ": "},
                                {type: 'text', prop: 'inputDatas'},
                                {type: 'br-normal-row', style: {marginBottom: 10, paddingTop: 8}}
                            ], [
                                {type: 'text-label', value: '描述:', style: {width: 80}},
                                [
                                    {type: 'text-h5', prop: 'detail'},
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
                                {type: 'br', style: {flexDirection:'row'}}
                            ], [
                                {type: 'text-label', value: '检查项:', style: {width: 80}},
                                {type: 'text-p', prop: 'checkName'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'text-label', value: '检查部位:', style: {width: 80}},
                                {type: 'text-p', prop: 'checkSite'},
                                {type: 'br-normal-row'}
                            ], [
                                {type: 'image-form', value: require('../../assets/dw.png')},
                                {type: 'text-h5', value: '图纸位置', style: {flex: 1, marginLeft: 5}},
                                {type: 'text-p', value: '已标记', filter: (value, data) => data.x ? '已标记' : '未标记'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'weizhi', style: {paddingLR: 0}}
                            ], [
                                {type: 'text-label', value: '参与人:', style: {width: 80}},
                                {type: 'views-x', prop: 'canYuRen', columns: [
                                    {type: 'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`, style: {height: 35, width: 35, marginRight: -16}}
                                ]}, 
                                {type: 'button-image', prop: 'tianjiacanyuren', value: require('../../assets/tianjiacanyuren.png'), style: {height: 35, width: 35}},
                                {type: 'br-normal-row'}
                            ]
                        ]}
                    />
                </P_Chat>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                            if (params.value == '催办工作')
                                Alert.alert("提示", "您确定要催促对方完成工作吗?", [
                                    {text: '确定', onPress: () => {
                                        Freedomen.global.api.call('/Reply/add', {
                                            replyType: 1,
                                            colorState: 3, 
                                            replyContent: '时间快到了，请尽快处理，谢谢！',
                                            aboutId: this.state.data.measureProblemId 
                                        }).then(res => {
                                            Freedomen.global.toast('催办完成')
                                        })
                                    }},
                                    {text: '取消'}
                                ])
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '催办工作', style: {color: '#2EBBC4', marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {slidePopDys = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePopDys.hide()
                            if (params.value == '工作验收') {
                                this.props.navigation.push('GZ_YanShou', {...this.state.data, partFlag: '实测实量'})
                            } 
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '工作验收', style: {color: '#2EBBC4', marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#878787'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {jinDuFanKui = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            jinDuFanKui.hide()
                            if (params.value == '进度反馈') {
                                this.props.navigation.push('GZ_JinDuFanKui', {...this.state.data, partFlag: '实测实量'})
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