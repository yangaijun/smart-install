import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Alert} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '记工消耗记录',
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            data: {...props.navigation.state.params.row, list: []}
        }
    }
    componentDidMount() {  
        Freedomen.global.api.call('AppWokerPointRecord/select', {workpointId: this.props.navigation.state.params.row.record.workpointId}).then(res => {
            let total = 0
            res.map(el => {
                total += el.workpointRecordHour
            })
            this.setState({
                data: {...this.state.data, list: res, total: total}
            })
        })
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {
                    if (params.prop == 'delete') { 
                        Alert.alert('提示', "确认删除？", [{text: '确认', onPress: () => {
                            Freedomen.global.api.call('AppWokerPoint/delete', this.props.navigation.state.params.row.record).then(res => {
                                this.props.navigation.goBack()
                            })
                        }}, {text: '取消'}])
                    } else if (params.prop == 'tianjia') {
                        this.props.navigation.push('CP_Worker', {label: '选择工人', formName: 'jg_xinjian', ...params.row})
                    } else if (params.prop == 'edit') {
                        this.props.navigation.push('JG_XinJian', {label: '修改工人消耗记录', ...this.props.navigation.state.params, list: params.row.list})
                    }
                }}
                data={this.state.data}
                redux={'jg_xianqin'}
                columns={[
                    [
                        {type: 'text-form-label', value: '清单'},
                        {type: 'text-form-label', prop: 'date', style: {flex: 1, marginLeft: 10}},
                        {type: 'button-image-icon', prop: 'edit', value: require('../../assets/bianji.png')},
                        {type: 'button-image-icon', prop: 'delete', value: require('../../assets/shanchu.png')},
                        {type: 'br-form-row'}
                    ],
                    {type: 'views', prop: 'list', value: [], columns: [
                        {type: 'text-form-label',prop: '$index', filter: value => value + 1, style: {marginRight: 15}},
                        {type: 'text-form-label', prop: 'workerName', style: {flex: 1}},
                        {type: 'text-form-label', prop: 'workpointRecordHour'},
                        {type: 'text-h5', value: '小时', style: {paddingLR: 10}}, 
                        {type: 'br-form-row'}
                    ]}, [
                        {type: 'text-label', value: '记录人： 王大头', style: {flex: 1}},
                        {type: 'text-label', prop: 'total', filter: value => `合计: ${value || '-'} 小时`},
                        {type: 'br-form-row'}
                    ] 
                ]}
            /> 
        );
    }
  }