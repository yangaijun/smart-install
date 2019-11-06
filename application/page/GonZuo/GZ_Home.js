import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text, Alert, ScrollView} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '我' + navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => {  
                    if (params.prop == 'shaixuan')
                        navigation.push('GZ_ShaiXuan')
                }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        Freedomen.global.fn = () => {
            this._loadData()
        }
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/WorkTask/selectList', {...this.props.navigation.state.params, statusList: []}).then(res => { 
            let list =  res.dataList.map(el => {
                if (el.partFlag == '质量管理' || el.partFlag == '安全管理') {
                    let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                    el.aboutUserList.map(el => {
                        if (el.userType == 1) zhenGaiRen.push(el)
                        else if (el.userType == 2) canYuRen.push(el)
                        else zhiDinRen.push(el)
                    })
                    if (el.partFlag == '质量管理') {
                        return {
                            ...el,
                            ...el.qualityCheck,
                            zhenGaiRen: zhenGaiRen,
                            canYuRen: canYuRen,
                            zhiDinRen: zhiDinRen
                        }
                    } else {
                        return {
                            ...el,
                            ...el.securityCheck,
                            zhenGaiRen: zhenGaiRen,
                            canYuRen: canYuRen,
                            zhiDinRen: zhiDinRen
                        }
                    }
                } else if (el.partFlag == '工作任务' || el.partFlag == '实测实量') {
                    let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                    el.aboutUserList.map(el => {
                        if (el.userType == 1) zhenGaiRen.push(el)
                        else if (el.userType == 2) canYuRen.push(el)
                        else zhiDinRen.push(el)
                    })
                    return {
                        ...el, 
                        zhenGaiRen: zhenGaiRen,
                        canYuRen: canYuRen,
                        zhiDinRen: zhiDinRen
                    }
                }  
                return el
            }) 
            this.setState({
                list: list
            })
        })
    }
    _view = (list) => {
        return <ScrollView>
            {
                list.map((el, index) => {
                    return <Freedomen.Region 
                        key={index}
                        data={el}
                        event={params => { 
                            if (params.value == '催办审核') {
                                Alert.alert('提示', '您确定催办对方完成工作吗？', [{text: '确定', onPress: () => {
                                    Freedomen.global.api.call('/Reply/add', {
                                        replyType: {'实测实量': 1, '质量管理': 2, '安全管理': 3 , '工作任务': 4}[params.row.partFlag],
                                        colorState: 3,
                                        replyContent: '时间快到了，请尽快处理，谢谢！',
                                        aboutId: params.row.qualityCheckId || params.row.workTaskId || params.row.securityCheckId || params.row.measureProblemId
                                    }).then(res => {
                                        Freedomen.global.toast('催办完成')
                                    })
                                }}, {text: '取消'}])
                            } else if (params.value == '进度反馈') {
                                this.props.navigation.push('GZ_JinDuFanKui', params.row)
                            } else if (params.value == '验收') {
                                this.props.navigation.push('GZ_YanShou', params.row) 
                            } else if (params.value == '接受任务' || params.value == '拒绝任务') {
                                const fn = () => {
                                    if (params.row.partFlag == '质量管理') {
                                        Freedomen.global.api.call('QualityCheck/update', {
                                            ...params.row,
                                            isAccept: params.value == '接受任务' ? 1 : 2
                                        }).then(res => {
                                            this._loadData()
                                        })
                                    } else if (params.row.partFlag == '安全管理') {
                                        Freedomen.global.api.call('SecurityCheck/update', {
                                            ...params.row,
                                            isAccept: params.value == '接受任务' ? 1 : 2
                                        }).then(res => {
                                            this._loadData()
                                        })
                                    } else if (params.row.partFlag == '工作任务') {
                                        Freedomen.global.api.call('/WorkTask/accept', {
                                            ...params.row,
                                            isAccept: params.value == '接受任务' ? 1 : 2
                                        }).then(res => {
                                            this._loadData()
                                        })
                                    }
                                }
                                if (params.value == '拒绝任务') {
                                    Alert.alert('提示', '您确定要拒绝任务吗？', [{text: '确定', onPress: () => {
                                        fn()
                                    }}, {text: '取消'}])
                                } else {
                                    fn()
                                }
                            } else if (params.row.partFlag == '安全管理') { 
                                if (params.value == '指派整改') {
                                    this.props.navigation.push('ZL_ZhiPaiZhenGai', params.row)
                                } else if (params.value == '删除') {
                                    Alert.alert('提示', '确定删除？', [{
                                        text: '确认',
                                        onPress: () =>　{
                                            Freedomen.global.api.call('/QualityCheck/delete', [params.row]).then(res => {
                                                this._loadData(true)
                                            })
                                        }
                                    }, {text: '取消'}])
                                    return
                                } else {
                                    Freedomen.global.api.call('/SecurityCheck/selectById', params.row).then(res => {
                                            let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                                            res.aboutUserList.map(el => {
                                                if (el.userType == 1) zhenGaiRen.push(el)
                                                else if (el.userType == 2) canYuRen.push(el)
                                                else zhiDinRen.push(el)
                                            })
                                            Freedomen.global.ZHILIAN = false
                                            
                                            this.props.navigation.push("ZL_XianQin", {
                                                ...params.row, 
                                                ...res.securityCheck,
                                                ...res,
                                                zhenGaiRen: zhenGaiRen,
                                                canYuRen: canYuRen,
                                                focus: params.value == '回复' || params.value == '验收回复',
                                                zhiDinRen: zhiDinRen
                                            })
                                    })
                                }
                                // this.props.navigation.push('ZL_XianQin', params.row)
                            } else if (params.row.partFlag == '质量管理') { 
                                if (params.value == '指派整改') {
                                    this.props.navigation.push('ZL_ZhiPaiZhenGai', params.row)
                                } else if (params.value == '删除') {
                                    Alert.alert('提示', '确定删除？', [{
                                        text: '确认',
                                        onPress: () =>　{
                                            Freedomen.global.api.call('/QualityCheck/delete', [params.row]).then(res => {
                                                this._loadData(true)
                                            })
                                        }
                                    }, {text: '取消'}])
                                    return
                                } else {
                                    Freedomen.global.api.call('/QualityCheck/selectById', params.row).then(res => {
                                        Freedomen.global.ZHILIAN = true
                                        let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                                        res.aboutUserList.map(el => {
                                            if (el.userType == 1) zhenGaiRen.push(el)
                                            else if (el.userType == 2) canYuRen.push(el)
                                            else zhiDinRen.push(el)
                                        }) 
                                        this.props.navigation.push("ZL_XianQin", {
                                                ...params.row, 
                                                ...res,
                                                ...res.qualityCheck,
                                                zhenGaiRen: zhenGaiRen,
                                                canYuRen: canYuRen,
                                                focus: params.value == '回复' || params.value == '验收回复',
                                                zhiDinRen: zhiDinRen})
                                    }) 
                                }
                            } else if (params.row.partFlag == '实测实量') {
                                if (params.row.status == 1 && this.props.navigation.state.params.type == 2)
                                    this.props.navigation.push('SCSL_WenTiXianQin', params.row)
                                else
                                    this.props.navigation.push('SCSL_XianQin', params.row)
                            } else if (params.row.partFlag == '工作任务') {
                                this.props.navigation.push('GZ_XianQin', params.row)
                            }
                        }}
                        columns={[
                            //工作 任务
                            [
                                [
                                    {type: 'text-h4', prop: 'taskTopic', value: '整改...', style: {flex: 1}}, 
                                    {type: 'text-status', prop: 'status', filter: {1:  this.props.navigation.state.params.type == 2  ? '进行中' : '待接受', 2 : '进行中', 3: '待验收', 4: '已完成'}, style: value => {
                                        let bgColor = {1: '#FF6D73', 2: '#FAB722', 3: '#00CC9B', 4 : '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor, 
                                            marginLR: 8
                                        }
                                    }},
                                    {type: 'text-label', prop: 'projectName', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    [
                                        {type: 'text-label',  filter:  (value, data) => {
                                            return `指定人： ${data.aboutUserList.filter(el => el.type == 1).map(el => el.userRealName).join()}`
                                        }},
                                        [
                                            {type: 'text-primary', prop: 'partFlag'},
                                            {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                                let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                                return {
                                                    color: color,
                                                    marginLeft: 8
                                                }
                                            }},
                                            {type: 'br-normal-row'}
                                        ],
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                                ], [
                                    {type: 'button-az', value: '进度反馈', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status)},
                                    {type: 'button-az', value: '拒绝任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [1].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
                                    {type: 'button-az', value: '接受任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [1].includes(data.status)},
                                    {type: 'button-az', value: '催办审核', load: (value, data) => this.props.navigation.state.params.type == 1 && [3].includes(data.status)},
                                    // {type: 'button-az', value: '审核回复', load: (value, data) => this.props.navigation.state.params.type == 1 && [3].includes(data.status) },
                                    {type: 'button-az', value: '验收',load: (value, data) => this.props.navigation.state.params.type == 2 && [3].includes(data.status)},
                                    // {type: 'button-az', value: '删除', load: (value, data) => [4].includes(data.status) || data.status == 1 && this.props.navigation.state.params.type == 2, style: {color: '#878787', borderColor: '#878787'}},
                                    {type: 'br-bottoms'}
                                ],
                                {type: 'br-list-item', load: (value, data) => data.partFlag == '工作任务'}
                            ],
                            //质量整改
                            [
                                [
                                    {type: 'text-h4', prop: 'qualityCheckName', value: '整改...', style: {flex: 1}}, 
                                    {type: 'text-status', prop: 'status', value: 1, filter: {1:  this.props.navigation.state.params.type == 2  ? '待指派' : '待接受', 2: '待接受', 3: '进行中', 4: '待验收', 5: '已完成'}, style: (value) => {
                                        let bgColor = {1: '#FF6D73', 2: '#FF6D73', 3: '#FAB722', 4: '#00CC9B', 5: '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor, 
                                            marginLR: 8
                                        }
                                    }},
                                    {type: 'text-label', prop: 'projectName', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    [
                                        {type: 'text-label',  filter:  (value, data) => {
                                            if (Freedomen.global.user.jasoUserId == data.jasoUserId) {
                                                if (data.zhenGaiRen && data.zhenGaiRen.length) 
                                                    return `整改人： ${data.zhenGaiRen.map(el =>el.userRealName).join()}`
                                                return `指定人： ${data.zhiDinRen.map(el =>el.userRealName).join()}`
                                            } else {
                                                return `分派人： ${data.userRealName}`
                                            }
                                        }},
                                        [
                                            {type: 'text-primary', prop: 'partFlag'},
                                            {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                                let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                                return {
                                                    color: color,
                                                    marginLeft: 8
                                                }
                                            }},
                                            {type: 'br-normal-row'}
                                        ],
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                                ], [
                                    {type: 'button-az', value: '进度反馈', load: (value, data) => this.props.navigation.state.params.type == 1 && [3].includes(data.status)},
                                    {type: 'button-az', value: '催办审核', load: (value, data) => (this.props.navigation.state.params.type == 1 || this.props.navigation.state.params.type == 2) && [4].includes(data.status)},
                                    // {type: 'button-az', value: '删除', load: (value, data) => this.props.navigation.state.params.type == 2 && [1, 5].includes(data.status), style: {borderColor: '#878787', color: '#878787'}},
                                    {type: 'button-az', value: '指派整改', prop: 'zhipaizhengai', load: (value, data) => [1].includes(data.status)},
                                    {type: 'button-az', value: '拒绝任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
                                    {type: 'button-az', value: '接受任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status)},
                                    {type: 'button-az', value: '验收',load: (value, data) => this.props.navigation.state.params.type == 2 && [4].includes(data.status)},
                                    {type: 'br-bottoms'}
                                ],
                                {type: 'br-list-item', load: (value, data) => data.partFlag == '质量管理'}
                            ],
                            //安全整改
                            [
                                [
                                    {type: 'text-h4', prop: 'securityCheckName', value: '整改...', style: {flex: 1}}, 
                                    {type: 'text-status', prop: 'status', value: 1, filter: {1:  this.props.navigation.state.params.type == 2  ? '待指派' : '待接受', 2: '待接受', 3: '进行中', 4: '待验收', 5: '已完成'}, style: (value) => {
                                        let bgColor = {1: '#FF6D73', 2: '#FF6D73', 3: '#FAB722', 4: '#00CC9B', 5: '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor, 
                                            marginLR: 8
                                        }
                                    }},
                                    {type: 'text-label', prop: 'projectName', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    [
                                        {type: 'text-label',  filter:  (value, data) => {
                                            if (Freedomen.global.user.jasoUserId == data.jasoUserId) {
                                                if (data.zhenGaiRen && data.zhenGaiRen.length) 
                                                    return `整改人： ${data.zhenGaiRen.map(el =>el.userRealName).join()}`
                                                return `指定人： ${data.zhiDinRen.map(el =>el.userRealName).join()}`
                                            } else {
                                                return `分派人： ${data.userRealName}`
                                            }
                                        }},
                                        [
                                            {type: 'text-primary', prop: 'partFlag'},
                                            {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                                let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                                return {
                                                    color: color,
                                                    marginLeft: 8
                                                }
                                            }},
                                            {type: 'br-normal-row'}
                                        ],
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                                ], [
                                    {type: 'button-az', value: '进度反馈', load: (value, data) => this.props.navigation.state.params.type == 1 && [3].includes(data.status)},
                                    {type: 'button-az', value: '指派整改', prop: 'zhipaizhengai', load: (value, data) => this.props.navigation.state.params.type == 2 && [1].includes(data.status)},
                                    {type: 'button-az', value: '拒绝任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
                                    {type: 'button-az', value: '接受任务', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status)},
                                    {type: 'button-az', value: '验收', load: (value, data) => this.props.navigation.state.params.type == 2 && [4].includes(data.status)},
                                    {type: 'br-bottoms'}
                                ],
                                {type: 'br-list-item', load: (value, data) => data.partFlag == '安全管理'}
                            ],
                            //实测实量
                            [
                                [
                                    {type: 'text-h4', filter: (value, data) => `${data.checkSite}实测实量设备安装`,style: {flex: 1}}, 
                                    {type: 'text-status', prop: 'status', filter: {1:  this.props.navigation.state.params.type == 2  ? '待指派' : '进行中', 2 : '进行中', 3: '审核中', 4: '已完成'}, style: value => {
                                        let bgColor = {1: '#FF6D73', 2: '#FAB722', 3: '#00CC9B', 4 : '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor, 
                                            marginLR: 8
                                        }
                                    }},
                                    {type: 'text-label', prop: 'projectName', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    [
                                        {type: 'text-label',  filter:  (value, data) => {
                                            if (Freedomen.global.user.jasoUserId == data.jasoUserId) {
                                                if (data.zhenGaiRen && data.zhenGaiRen.length) 
                                                    return `整改人： ${data.zhenGaiRen.map(el =>el.userRealName).join()}`
                                                return `指定人： ${data.zhiDinRen.map(el =>el.userRealName).join()}`
                                            } else {
                                                return `分派人： ${data.userRealName}`
                                            }
                                        }},
                                        [
                                            {type: 'text-primary', prop: 'partFlag'},
                                            {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                                let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                                return {
                                                    color: color,
                                                    marginLeft: 8
                                                }
                                            }},
                                            {type: 'br-normal-row'}
                                        ],
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                    {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                                ], [
                                    {type: 'button-az', value: '进度反馈', load: (value, data) => this.props.navigation.state.params.type == 1 && [2].includes(data.status)},
                                    {type: 'button-az', value: '验收', load: (value, data) => this.props.navigation.state.params.type == 2 && [3].includes(data.status)},
                                    {type: 'br-bottoms'}
                                ],  
                                {type: 'br-list-item', load: (value, data) => data.partFlag == '实测实量'}
                            ]
                        ]}
                    />
                })
            }
        </ScrollView> 
    }
    render() { 
        let qb = [], ptrw = [], zlzg = [], aqzg = [], scsl = [];
        qb = this.state.list
        this.state.list.map(el => {
            if (el.partFlag == '工作任务')
                ptrw.push(el)
            else if (el.partFlag == '质量管理') 
                zlzg.push(el)
            else if (el.partFlag == '安全管理')
                aqzg.push(el)
            else if (el.partFlag == '实测实量')
                scsl.push(el)
        })

        return (
            <Freedomen.Tab  
                columns={[
                    {prop: 'qb', label: '全部', view: this._view(qb)},
                    {prop: 'ptrw', label: '工作任务', view: this._view(ptrw)},
                    {prop: 'zlzg', label: '质量整改', view: this._view(zlzg)},
                    {prop: 'aqzg', label: '安全整改', view: this._view(aqzg)},
                    {prop: 'scsl', label: '实测实量', view: this._view(scsl)},
                ]}
            /> 
        );
    }
  }