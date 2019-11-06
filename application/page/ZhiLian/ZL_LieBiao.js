import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Alert} from 'react-native'
import columns from '../../region/columns'
const Search = columns.ZA_Search()

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        console.log(navigation.state.params)
        return {
            title: Freedomen.global.ZHILIAN ? '质量检查' : '安全检查',
            headerRight: <Freedomen.Region 
                event={params => {  
                    if (params.prop == 'shaixuan')
                        navigation.push('ZL_ShaiXuan')
                    if (params.prop == 'tianjia')
                        navigation.navigate('ZL_XinZen')
                }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                    {type: 'button-image-right', prop: 'tianjia', value: require('../../assets/tianjia.png'), load: () => navigation.state.params.status != 3},
                    {type: 'br-normal-row'}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageVo:{
                pageNo: 1,
                pageSize: 15
            },
            ...this.props.navigation.state.params
        } 
        this.userId = Freedomen.global.user.jasoUserId
    }
    componentDidMount() {
        Freedomen.global.fn = () => {
            this._loadData(true)
        }
        this._loadData()
    }
    _loadData(fresh = false) {
        if (Freedomen.global.ZHILIAN) 
            Freedomen.global.api.call('/QualityCheck/select', this.params).then(res => {
                let list =  res.map(el => {
                    let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                    el.aboutUserList.map(el => {
                        if (el.userType == 1) zhenGaiRen.push(el)
                        else if (el.userType == 2) canYuRen.push(el)
                        else zhiDinRen.push(el)
                    })
                    
                    return {
                        ...el,
                        ...el.qualityCheck,
                        zhenGaiRen: zhenGaiRen,
                        canYuRen: canYuRen,
                        zhiDinRen: zhiDinRen
                    }
                }) 
                console.log(list)
                if (fresh) 
                    this.freshList.resetData(list)
                else 
                    this.setState({
                        list: list
                    })

            })
        else 
            Freedomen.global.api.call('/SecurityCheck/select', this.params).then(res => {
                let list =  res.map(el => {
                    let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                    el.aboutUserList.map(el => {
                        if (el.userType == 1) zhenGaiRen.push(el)
                        else if (el.userType == 2) canYuRen.push(el)
                        else zhiDinRen.push(el)
                    })
                    return {
                        ...el,
                        ...el.securityCheck,
                        zhenGaiRen: zhenGaiRen,
                        canYuRen: canYuRen,
                        zhiDinRen: zhiDinRen
                    }
                }) 
                if (fresh) 
                    this.freshList.resetData(list)
                else 
                    this.setState({
                        list: list
                    }) 
            })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 10}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        }
                    }}
                    columns={Search}
                />
                <Freedomen.FreshList 
                    ref={ref => this.freshList = ref}
                    data={this.state.list}
                    event={params => { 
                        if (Freedomen.global.ZHILIAN && (params.value == '接受任务' || params.value == '拒绝任务')) {
                            let fn = () => { 
                                Freedomen.global.api.call('QualityCheck/update', {
                                    ...params.row,
                                    isAccept: params.value == '接受任务' ? 1 : 2
                                }).then(res => {
                                    this.props.navigation.goBack()
                                })
                            }
                            if (params.value == '拒绝任务') {
                                Alert.alert('提示', '您确定要拒绝任务吗？', [{text: '确定', onPress: () => {
                                    fn()
                                }}, {text: '取消'}])
                            } else {
                                fn ()
                            }
                        } else if (params.value == '接受任务' || params.value == '拒绝任务') {
                            let fn = () => {
                                Freedomen.global.api.call('SecurityCheck/update', {
                                    ...params.row,
                                    isAccept: params.value == '接受任务' ? 1 : 2
                                }).then(res => {
                                    this._loadData(true)
                                })
                            }
                            if (params.value == '拒绝任务') {
                                Alert.alert('提示', '您确定要拒绝任务吗？', [{text: '确定', onPress: () => {
                                    fn()
                                }}, {text: '取消'}])
                            } else {
                                fn ()
                            }
                        } else if (params.value == '进度反馈') {
                                this.props.navigation.push('GZ_JinDuFanKui', {...params.row, partFlag: Freedomen.global.ZHILIAN? '质量管理': '安全管理'})
                        } else if (params.prop == 'detail') {
                            this.props.navigation.push('ZL_XianQin', params.row)
                        } else if (params.prop == 'zhipaizhengai') 
                            this.props.navigation.push('ZL_ZhiPaiZhenGai', params.row)
                        else if (params.value == '删除') {
                            Alert.alert('提示', '确定删除？', [{
                                text: '确认',
                                onPress: () =>　{
                                    Freedomen.global.api.call(Freedomen.global.ZHILIAN ? '/QualityCheck/delete' : '/SecurityCheck/delete', [params.row]).then(res => {
                                        this._loadData(true)
                                    })
                                }
                            }, {text: '取消'}])
                        } else if (['$page', '$fresh'].includes(params.prop)) {
                            this._loadData()
                        } else if (params.value == '回复' || params.value == '验收回复') {
                            this.props.navigation.push('ZL_XianQin', {focus: true, ...params.row})
                        } else if (params.value == '验收') {
                            this.props.navigation.push('GZ_YanShou', {...params.row, partFlag: Freedomen.global.ZHILIAN? '质量管理': '安全管理'}) 
                        } else {
                            this.props.navigation.push('ZL_XianQin',  params.row)
                        }
                    }}
                    columns={[
                        [
                            [
                                {type: 'text-h4', prop: 'qualityCheckName', value: '整改...', style: {flex: 1}}, 
                                {type: 'text-status', prop: 'status', value: 1, filter: (value, data) => 
                                {
                                    return {1:  Freedomen.global.user.userId == data.jasoUserId  ? '待接受' : '待指派', 2: '待接受', 3: '进行中', 4: '待验收', 5: '已完成'}[value] }, 
                                    style: (value) => {
                                        let bgColor = {1: '#FF6D73', 2: '#FF6D73', 3: '#FAB722', 4: '#00CC9B', 5: '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor
                                        }
                                    }
                                },
                                {type: 'text-label', prop: 'projectName', value: '苏州歌林小镇', style: {alignItems: 'flex-end'}},
                                {type: 'click', style: {flexDirection: 'row', alignItems: 'center'}}
                            ], [
                                [
                                    {type: 'text-label',  filter:  (value, data) => {
                                        if (Freedomen.global.user.jasoUserId == data.jasoUserId) {
                                            console.log(data)
                                            if (data.zhenGaiRen && data.zhenGaiRen.length) 
                                                return `整改人： ${data.zhenGaiRen.map(el =>el.userRealName).join()}`
                                            return `指定人： ${data.zhiDinRen.map(el =>el.userRealName).join()}`
                                        } else {
                                            return `分派人： ${data.userRealName}`
                                        }
                                    }},
                                    [
                                        {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                            let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                            return {
                                                color: color
                                            }
                                        }},
                                        {type: 'br-normal-row'}
                                    ],
                                    {type: 'br', style: {flex: 1}}
                                ],
                                {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                            ], [
                                {type: 'button-az', value: '进度反馈', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [3].includes(data.status)},
                                {type: 'button-az', value: '催办审核', load: (value, data) => this.props.navigation.state.params.type == 1 && [4].includes(data.status)},
                                // {type: 'button-az', value: '删除', load: (value, data) => this.props.navigation.state.params.type == 2 && [1, 5].includes(data.status), style: {borderColor: '#878787', color: '#878787'}},
                                {type: 'button-az', value: '指派整改', prop: 'zhipaizhengai', load: (value, data) =>  data.jasoUserId == this.userId && [1].includes(data.status)},
                                {type: 'button-az', value: '拒绝任务', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [2].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
                                {type: 'button-az', value: '接受任务', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [2].includes(data.status)},
                                {type: 'button-az', value: '验收',load: (value, data) =>  data.jasoUserId == this.userId && [4].includes(data.status)},
                                {type: 'br-bottoms'}
                            ],
                            {type: 'br-list-item', load: () => Freedomen.global.ZHILIAN}
                        ],
                        //安全整改
                        [
                            [
                                {type: 'text-h4', prop: 'securityCheckName', value: '整改...', style: {flex: 1}}, 
                                {type: 'text-status', prop: 'status', value: 1, filter: (value, data) => 
                                {
                                    return {1:  Freedomen.global.user.jasoUserId == data.jasoUserId  ? '待指派' : '待接受', 2: '待接受', 3: '进行中', 4: '待验收', 5: '已完成'}[value] }, 
                                    style: (value) => {
                                        let bgColor = {1: '#FF6D73', 2: '#FF6D73', 3: '#FAB722', 4: '#00CC9B', 5: '#999999'}[value]
                                        return {
                                            backgroundColor: bgColor
                                        }
                                    }
                                },
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
                                        {type: 'text', prop: 'state', filter: {1: '一般', 2: '重要', 3: '紧急'}, style: (value) => {
                                            let color = {1: '#00CC9B', 2: '#FAB722', 3: '#FF6D73'}[value]
                                            return {
                                                color: color
                                            }
                                        }},
                                        {type: 'br-normal-row'}
                                    ],
                                    {type: 'br', style: {flex: 1}}
                                ],
                                {type: 'progress-circle', prop: 'process', value: 0, style: {width: 50}},
                                {type: 'click', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                            ], [
                                {type: 'button-az', value: '进度反馈', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [3].includes(data.status)},
                                {type: 'button-az', value: '催办审核', load: (value, data) => this.props.navigation.state.params.type == 1 && [4].includes(data.status)},
                                // {type: 'button-az', value: '删除', load: (value, data) => this.props.navigation.state.params.type == 2 && [1, 5].includes(data.status), style: {borderColor: '#878787', color: '#878787'}},
                                {type: 'button-az', value: '指派整改', prop: 'zhipaizhengai', load: (value, data) => data.jasoUserId == this.userId && [1].includes(data.status)},
                                {type: 'button-az', value: '拒绝任务', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [2].includes(data.status), style: {color: '#878787', borderColor: '#878787'}},
                                {type: 'button-az', value: '接受任务', load: (value, data) => data.zhenGaiRen.find(el => el.jasoUserId == this.userId) && [2].includes(data.status)},
                                {type: 'button-az', value: '验收',load: (value, data) => this.props.navigation.state.params.type == 2 && [4].includes(data.status)},
                                {type: 'br-bottoms'}
                            ],
                            {type: 'br-list-item', load: () => !Freedomen.global.ZHILIAN}
                        ]
                    ]}
                 />
            </View>
        );
    }
  }