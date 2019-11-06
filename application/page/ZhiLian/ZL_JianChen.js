import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import {View, ScrollView} from 'react-native'
const Search = columns.ZA_Search()
var type

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '奖惩',
            headerRight: <Freedomen.Region 
                event={params => { 
                    navigation.push('ZL_JianLiXinZen', {type: type})
                }}
                columns={[
                    {type: 'button-image-right', value: require('../../assets/tianjia.png')}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        } 
        type = 1
        this.params = {
            pageVo: {
                "pageNo": 1,
                "pageSize": 15 
            }
        }
    }
    componentDidMount() {
        this._loadData()
        Freedomen.global.fn = () => {
            this._loadData(true)
        }
    }
    _loadData(flag = false) {
        if (Freedomen.global.ZHILIAN)
            Freedomen.global.api.call('/QualityFine/select', {type: type, ...this.params}).then(res => {
                if (flag)
                    this.freshList.resetData(res.data)
                else 
                    this.setState({
                        list: res.data
                    }) 
            })
        else 
            Freedomen.global.api.call('/SecurityFine/select', {type: type, ...this.params}).then(res => {
                if (flag)
                    this.freshList.resetData(res.data)
                else 
                    this.setState({
                        list: res.data
                    }) 
            })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            <Freedomen.Region 
                style={{backgroundColor: 'white', padding: 5, paddingBottom:1}}
                event={params => { 
                    if (params.prop == '_clear') {
                        params.row.content = ''
                        return params.row
                    } else if (params.prop == 'tab') {
                        type = params.value == '奖励单' ? 1 : 2
                        this._loadData(true)
                    }
                }}
                columns={[
                    Search,
                    [ 
                        {type: 'tags-tab',  value: '奖励单', prop: 'tab', options: '奖励单,处罚单'},
                        {type: 'br-row', style: {marginBottom: 1, align: 'center', marginTop: 5, borderTopColor:　'#f5f5f5', borderTopWidth: 1, paddingBottom: 0}}
                    ]
                ]}
            />
            <Freedomen.FreshList 
                data={this.state.list}
                ref={ref => this.freshList = ref}
                event={params => {
                    if (['$page', '$fresh'].includes(params.prop))
                        this._loadData()
                    else if (params.prop == 'item')
                        this.props.navigation.push('ZL_JianChenXinQin', params.row)
                }}
                columns={[
                    {type: 'text-h4', prop: 'projectName'},
                    {type: 'text', prop: 'remark', filter: value => `备注:${value}`, style: {paddingTB: 5}},
                    [
                        {type: 'text', value: '金额:'},
                        {type: 'text-must', prop: 'money', filter: value => `￥${value}`, style: {fontWeight: 'bold'}},
                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
                    ], [
                        {type: 'text', prop: 'userRealName', value: '王大头', filter: value => `签发人:${value}`, style: {flex: 1}},
                        {type: 'text', value: '日期:'},
                        {type: 'text', prop: 'createTime', filter: 'yyyy-MM-dd'},
                        {type: 'br-bottoms'}
                    ],
                    {type: 'click-list-item', prop: 'item'}
                ]}
            />
        </View>
        );
    }
  }