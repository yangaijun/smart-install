import React from 'react'
import {ScrollView, Text, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns' 
const redux = {tianjia: false}
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: <Freedomen.Region 
                event={params => {
                    if (params.prop == 'shaixuan')
                        navigation.push('SGRZ_ShaiXuan')
                    else navigation.push('SGRZ_XinJian')
                }}
                data={redux}
                redux={'only_page'}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                    {type: 'button-image-right', prop: 'xinjian', value: require('../../assets/tianjia.png'), load: (value, data) => data.tianjia},
                    {type: 'br', style: {flexDirection: 'row'}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {
            roles: [],
            activity: '我的日志',
            woderizhi: [],
            quanburizhi: []
        }
        this.Search = columns.ZA_Search('请输入创建人查询') 

        this.wodeParams = {jasoUserId: Freedomen.global.user.jasoUserId, pageVo: {
            pageNo: 1,
            pageSize: 15
        }}
        this.quanbuParams = {pageVo: {
            pageNo: 1,
            pageSize: 15
        }}
    } 
    componentDidMount() { 
        // if (!Freedomen.global.roleTypes)
        Freedomen.global.api.call('/ConstructLog/getRoleType').then(res => {
            Freedomen.global.roleTypes = res
            this.setState({
                roles: res
            })
            if (res.length) {
                redux.tianjia = true
                Freedomen.redux({
                    only_page: redux
                })
            }
        })
        this._loadData(this.wodeParams, 'woderizhi')
        Freedomen.global.fn = () => {
            this._loadData(this.wodeParams, this.state.activity == '我的日志' ? 'woderizhi' : 'quanburizhi')
        }
        Freedomen.global.callback = (data) => {
            this.quanbuParams = {
                ...this.quanbuParams,
                ...data
            }
            this._loadData(this.quanbuParams, 'quanburizhi')
        }
    }   
    _loadData(params, item) {
        Freedomen.global.api.call('/ConstructLog/select', params).then(res => {
            let arr = res.data.map(el => {
                let content = el.contentList.length ? el.contentList[0] : {}
                let date = new Date(el.constructLog.constructDate) 
                let week = '星期' + ({
                    1: '一',
                    2: '二',
                    3: '三',
                    4: '四',
                    5: '五',
                    6: '六',
                    0: '日'
                }[date.getDay()] || '')
 
                let shigonjindus = [], gonzuoneirons = [], shenchanqinkuans = []
                el.contentList.map(el => {
                    if (el.constructProgressStartTime) {
                        shigonjindus.push(el)
                    } else if (el.jobContentContentType) {
                        gonzuoneirons.push(el)
                    } else if (el.productionWorkLoad) {
                        shenchanqinkuans.push(el)
                    }
                })
                return {
                    ...el.constructLog,
                    ...content,
                    week: week,
                    shigonjindus: shigonjindus,
                    gonzuoneirons: gonzuoneirons,
                    shenchanqinkuans: shenchanqinkuans
                }
            }) 
            let data = {}
            data[item] = arr
            setTimeout(() => {
                this.setState(data)
            }, 200)
        })
    }
    render() {
        const columns = [
            [
                {type: 'text-h4', prop: 'tendersName', style: {flex: 1}}, 
                {type: 'text-h5', prop: 'weather'}, 
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
            ], [
                {type: 'image', filter: (value, data) => {
                        let arr = (data.pics || '').split(',')
                        if (arr.length > 0) {
                            return `http://www.jasobim.com:8085/${arr[0]}`
                        } else return ''
                    }, style: {width: 80, height: 60, marginRight: 10}
                }, [
                    {type: 'text-h5', prop: 'productionConstructPart', filter: value => `施工部位：${value}`},
                    {type: 'text-h5', prop: 'productionConstructContent', filter: value => `施工内容：${value}`},
                    {type: 'text-h5', prop: 'productionWorkLoad', filter: (value, data) => `完成工作量：${value}`},
                    {type: 'br', load: (value, data) => data.productionConstructPart}
                ], [
                    {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                    {type: 'text-h5', prop: 'constructProgressConstructContent', filter: value => `施工内容：${value}`},
                    {type: 'text-h5', prop: 'constructProgressTeams', filter: value => `班组：${value}`},
                    {type: 'text-h5', prop: 'constructProgressNums', filter: value => `施工进度：${value}`},
                    {type: 'br', load: (value, data) => !data.productionConstructPart && data.constructProgressConstructPart}
                ], [
                    {type: 'text-h5', prop: 'jobContentContentType', filter: value => `内容分类：${value}`},
                    {type: 'text-h5', prop: 'jobConentContentDescribe', filter: value => `描述：${value || ''}`},
                    {type: 'text', prop: 'jobContentRemark', filter: value => `备注：${value || ''}`},
                    {type: 'br', load: (value, data) => !data.productionConstructPart && !data.constructProgressConstructPart}
                ], 
                {type: 'click', prop: 'xianqin', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 8}}
            ], [
                {type: 'text', prop: 'userRealName', filter: value => `创建人: ${value}`, style: {flex: 1}},
                {type: 'text', prop: 'constructDate', style: {paddingRight: 5}},
                {type: 'text', prop: 'week'},
                {type: 'br-bottoms'}
            ],
            {type: 'br-list-item'}
        ]
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 5}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        } else if (params.prop == 'choose') { 
                            this.setState({
                                activity: params.value
                            }, () => {
                                if (params.value == '我的日志' && this.state.woderizhi.length === 0) {
                                    this._loadData(this.wodeParams, 'woderizhi')
                                } else if (params.value == '全部日志' && this.state.quanburizhi.length === 0) {
                                    this._loadData(this.quanbuParams, 'quanburizhi')
                                }
                            }) 
                        }
                    }}
                    columns={[
                        this.Search,
                        [ 
                            {type: 'tags-tab', value: '我的日志', prop:'choose', options: '我的日志,全部日志'},
                            {type: 'br-row', style: {marginBottom: 1, align: 'center', marginTop: 5, borderTopColor:　'#f5f5f5', borderTopWidth: 1, paddingBottom: 0}, load: (value) => this.state.roles.length > 0}
                        ]
                    ]}
                />
                {
                    this.state.activity == '我的日志' 
                    ?  
                    <Freedomen.FreshList 
                        event={params => {
                            if (['$page', '$fresh'].includes(params.prop)) {
                                this.wodeParams.pageVo.pageNo = params.row.pageNo
                                this._loadData(this.wodeParams, 'woderizhi')
                            } else if (params.prop == 'xianqin') {
                                this.props.navigation.push('SGRZ_XianQin', params.row)
                            }
                        }}
                        data={this.state.woderizhi}
                        columns={columns}
                    /> 
                    :    
                    <Freedomen.FreshList 
                        event={params => {
                            if (['$page', '$fresh'].includes(params.prop)) {
                                this.quanbuParams.pageVo.pageNo = params.row.pageNo
                                this._loadData(this.quanbuParams, 'quanburizhi')
                            }  else if (params.prop == 'xianqin') {
                                this.props.navigation.push('SGRZ_XianQin', params.row)
                            }
                        }}
                        data={this.state.quanburizhi}
                        columns={columns}
                    /> 
                }
            </View>
        );
    }
  }