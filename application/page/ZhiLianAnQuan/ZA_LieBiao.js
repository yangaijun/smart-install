import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
const Search = columns.ZA_Search()

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: <Freedomen.Region 
                event={params => {  
                    if (params.prop == 'shaixuan')
                        navigation.push('ZA_ShaiXuan')
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
        setTimeout(() => {
            this.setState({
                list:[{status: 1},{status: 2},{status: 3},{status: 4}]
            })
        }, 200);
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
                    data={this.state.list}
                    event={params => {
                        if (params.prop == 'detail') {
                            this.props.navigation.push('ZA_XianQin')
                        } else if (params.prop == 'zhipaizhengai') 
                            this.props.navigation.push('ZA_ZhiPaiZhenGai')
                    }}
                    columns={[
                        [
                            [
                                {type: 'text-h4', value: '格林小镇', style: {flex: 1}},
                                {type: 'text-status', prop: 'status', value: 1, filter: {1: '待指派', 2: '进行中', 3: '审核中', 4: '已完成'}, style: (value) => {
                                    let bgColor = {1: '#FF6D73', 2: '#FAB722', 3: '#00CC9B', 4: '#999999'}[value]
                                    return {
                                        backgroundColor: bgColor, 
                                        marginLR: 8
                                    }
                                }},
                                {type: 'text', value: '不通过'},
                                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', padding: 3}}
                            ],
                            {type: 'text', value: '王大头', filter: value => `整改人：${value}`, style: {padding: 3}},
                            {type: 'text-primary', value: '2019-07-11', style: {padding: 3}},
                            {type: 'click', prop: 'detail'}
                        ], [
                            {type: 'button-az', value: '删除', load: (value, data) => [1,4].includes(data.status), style: {borderColor: '#878787', color: '#878787'}},
                            {type: 'button-az', value: '指派整改', prop: 'zhipaizhengai', load: (value, data) => [1].includes(data.status)},
                            {type: 'button-az', value: '回复',load: (value, data) => [2].includes(data.status)},
                            {type: 'button-az', value: '验收回复',load: (value, data) => [3].includes(data.status)},
                            {type: 'br-bottoms'}
                        ],
                        {type: 'br-list-item'}
                    ]}
                 />
            </View>
        );
    }
  }