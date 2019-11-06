import React from 'react'
import Freedomen from 'react-native-freedomen'
import ImageViewer from 'react-native-image-zoom-viewer';
import {View, Alert, Dimensions, Modal} from 'react-native' 
import P_Chat from '../APublic/P_Chat';
import P_Sound from '../APublic/P_Sound';
import util from '../../region/utils'
var slidePop, jianYan, jinDuFanKui

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        let obj = {
            title: Freedomen.global.ZHILIAN ? '质量检查详情' : '安全检查详情'
        }  
        if ((navigation.state.params.status == 3 && navigation.state.params.jasoUserId != Freedomen.global.user.jasoUserId) || navigation.state.params.status == 4 || navigation.state.params.status != 1 && navigation.state.params.status != 5 && navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId ) 
            obj.headerRight = <Freedomen.Region
                event={params => {
                    if (navigation.state.params.status == 3 && navigation.state.params.jasoUserId != Freedomen.global.user.jasoUserId)
                        jinDuFanKui.show()
                    else if (navigation.state.params.status == 4 && navigation.state.params.jasoUserId == Freedomen.global.user.jasoUserId)
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
            data: props.navigation.state.params,
            visible: false,
            images: []
        } 
        this.data = this.state.data 
        Freedomen.global.goBack = () => {
            props.navigation.goBack()
        }
        Freedomen.global.tianjiacanyuren = (list) => {
            let params = list.map(el => {
                return {
                    companyId: this.state.data.companyId,
                    projectId: this.state.data.projectId,
                    aboutId: this.props.navigation.state.params.qualityCheckId || this.props.navigation.state.params.securityCheckId,
                    jasoUserId: el.jasoUserId,
                    userRealName: el.userRealName,
                    type: Freedomen.global.ZHILIAN ? 1 : 2,
                    userType: 2
                }
            })
            if (Freedomen.global.ZHILIAN) {
                Freedomen.global.api.call('/QualityCheck/addAboutUserList', params).then(res => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            canYuRen: this.state.data.canYuRen.concat(list)
                        }
                    })
                })
            } else {
                Freedomen.global.api.call('/SecurityCheck/addAboutUserList', params).then(res => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            canYuRen: this.state.data.canYuRen.concat(list)
                        }
                    })
                })
            }
        }
    }
    _content(flex) {
        return <Freedomen.Region 
            style={{padding: 6, flex: flex, backgroundColor: 'white'}}
            event={params => { 
                if (params.prop == 'point')
                    this.props.navigation.push('P_ShowPoint', params.row)
                else if (params.value && params.value.prop == 'picture' &&  params.value.value) {
                    let images = [{url:  params.value.value}]
                    this.setState({
                        visible: true,
                        images: images
                    })
                } else if (params.value && params.value.value && params.value.prop == 'luyin') {
                    P_Sound.play(params.value.value)
                } else if (params.prop == 'tianjiacanyuren') { 
                    this.props.navigation.push('CP_XinZenCanYuRen', {list: params.row.canYuRen, projectId: params.row.projectId})
                }
            }}
            data={this.state.data}
            columns={[
                [
                    {type: 'text-label', value: '性质:', style: {width: 80}},
                    {type: 'text-p', prop: 'natureName'},
                    {type: 'br-normal-row', load: () => Freedomen.global.ZHILIAN}
                ], 
                [
                    {type: 'text-label', value: '性质:', style: {width: 80}},
                    {type: 'text-p', prop: 'natureName'},
                    {type: 'br-normal-row', load: () => !Freedomen.global.ZHILIAN}
                ],
                [
                    {type: 'text-label', value: '整改人:', style: {width: 80}},
                    {type: 'text-p', prop: 'zhenGaiRen', filter: value => value.map(el => el.userRealName).join(',')},
                    {type: 'br-normal-row', load: (value, data) => data.status !== 1}
                ],  [
                    {type: 'text-label', value: '指定人:', style: {width: 80}},
                    {type: 'text-p', prop: 'zhiDinRen', filter: value => value.map(el => el.userRealName).join(',')},
                    {type: 'br-normal-row', load: (value, data) => data.status == 1}
                ],  [
                    {type: 'text-label', value: '检查名称:', style: {width: 80}},
                    {type: 'text-p', prop: 'securityCheckName'},
                    {type: 'br-normal-row', load: (value, data) => !Freedomen.global.ZHILIAN}
                ], [
                    {type: 'text-label', value: '检查名称:', style: {width: 80}},
                    {type: 'text-p', prop: 'qualityCheckName'},
                    {type: 'br-normal-row', load: (value, data) => Freedomen.global.ZHILIAN}
                ], [
                    {type: 'text-label', value: '日期:', style: {width: 80}},
                    {type: 'text-p', filter: (value, data) => {return util.formatDate.format(new Date(data.startDate), 'yyyy-MM-dd') + (data.finishedDate ? '至' + util.formatDate.format(new Date(data.finishedDate), 'yyyy-MM-dd') : '')}},
                    {type: 'br-normal-row'}
                ], [
                    {type: 'text-label', value: '描述:', style: {width: 80}},
                    {type: 'views', prop: 'checkTypeList', columns: [
                        {type: 'text-h5', prop: 'describe'},
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
                        }, 
                    ]}, 
                    {type: 'br', style: {flexDirection: 'row'}}
                ], [
                    {type: 'text-h5', value: '图纸位置', style: {flex: 1}},
                    {type: 'text-p', value: '已标记', filter: (value, data) => data.x ? '已标记' : '未标记'},
                    {type: 'image-form', value: require('../../assets/right.png')},
                    {type: 'click-form-row', prop: 'point', style: {paddingLR: 0}}
                ], [
                    {type: 'text-label', value: '参与人:', style: {width: 80}},
                    {type: 'views-x', prop: 'canYuRen', columns: [
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
                {[1, 2].includes(this.props.navigation.state.params.status)  ||  this.state.data.zhenGaiRen.find(el => el.jasoUserId == Freedomen.global.user.jasoUserId) && [2].includes(this.state.data.status) ? this._content(1) : null}
                {
                    this.props.navigation.state.params.status == 1 ?
                    <Freedomen.Region 
                        style={{height: 52, borderTopWidth: 1, borderTopColor: '#f5f5f5', align: 'center'}}
                        event={params => { 
                            if (params.prop == 'zhipai')
                                this.props.navigation.push('ZL_ZhiPaiZhenGai', this.props.navigation.state.params)
                            else if (params.prop == 'shanchu')
                                Alert.alert('提示', '确定删除？', [{
                                    text: '确认',
                                    onPress: () =>　{
                                        Freedomen.global.api.call('/QualityCheck/delete', [params.row]).then(res => {
                                            Freedomen.global.fn && Freedomen.global.fn()
                                            this.props.navigation.goBack()
                                        })
                                    }
                                }, {text: '取消'}])
                        }}
                        columns={[
                            [
                                {type: 'image-icon', value: require('../../assets/shanchu.png')},
                                {type: 'text-must', value: '删除'},
                                {type: 'click', prop: 'shanchu', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                            ], [
                                {type: 'image-icon', value: require('../../assets/za_zhipai.png')},
                                {type: 'text-primary', value: '指派'},
                                {type: 'click', prop: 'zhipai', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                            ],
                            {type: 'br', style: {flexDirection: 'row', backgroundColor: 'white'}}
                        ]}
                    /> : 
                    this.state.data.zhenGaiRen.find(el => el.jasoUserId == Freedomen.global.user.jasoUserId) && [2].includes(this.state.data.status) ?
                    <Freedomen.Region 
                        style={{height: 52, borderTopWidth: 1, borderTopColor: '#f5f5f5', align: 'center'}}
                        event={params => { 
                            if (Freedomen.global.ZHILIAN) {
                                let fn = () => { 
                                    Freedomen.global.api.call('QualityCheck/update', {
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
                            } else {
                                let fn = () => {
                                    Freedomen.global.api.call('SecurityCheck/update', {
                                        ...this.state.data,
                                        isAccept: params.prop == 'jieshou' ? 1 : 2
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
                            {type: 'br', style: {flexDirection: 'row', backgroundColor: 'white'}}
                        ]}
                    /> :
                    [3, 4, 5].includes(this.props.navigation.state.params.status) ? 
                        <P_Chat replyType={Freedomen.global.ZHILIAN ? 2 : 3} aboutId={this.props.navigation.state.params.qualityCheckId || this.props.navigation.state.params.securityCheckId} focus={this.props.navigation.state.params.focus}> 
                            {this._content()}
                        </P_Chat>
                    : null
                }
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 222, justifyContent: 'flex-end', backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                            if (params.value == '催办工作')
                                Alert.alert("提示", "您确定要催促对方完成工作吗?", [
                                    {text: '确定', onPress: () => {
                                        Freedomen.global.api.call('/Reply/add', {
                                            replyType: this.state.data.qualityCheckId ? 2 : 3,
                                            colorState: 3, 
                                            replyContent: '时间快到了，请尽快完成，谢谢！',
                                            aboutId: this.state.data.qualityCheckId || this.state.data.securityCheckId
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
                            if (params.value == '工作验收')
                                this.props.navigation.push('GZ_YanShou', {...this.state.data, partFlag: Freedomen.global.ZHILIAN ? '质量管理' : '安全管理'})  
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
                                this.props.navigation.push('GZ_JinDuFanKui', {...this.state.data, partFlag: Freedomen.global.ZHILIAN ? '质量管理' : '安全管理'})
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