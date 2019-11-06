import React from 'react'
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.logType === 0 ? '入库记录详情' : '出库记录详情',
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: {
                ...this.props.navigation.state.params,
                materialLogs: []
            }
        } 
    }
    componentDidMount() {
        Freedomen.global.api.call('/MaterialLog/select', {...this.props.navigation.state.params, pageVo: {}}).then(res => { 
            this.setState({
                data: {
                    ...this.state.data,
                    materialLogs: res
                } 
            })
        })
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                data={this.state.data}
                event={params => {
                    if (params.prop == 'user')
                        this.props.navigation.push('UserList', {label: '选择领取人', formName: 'wz_rkck_queren'});
                }}
                redux={'wz_rkck_queren'}
                columns={[
                    [
                        {type: 'text-form-label', value: '日期：', style: {width: 88}},
                        {type: 'text-label', prop: 'createTime', filter: '2017-08-09'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '领取人:', style: {width: 88}},
                        {type: 'text-label', prop: 'userRealName', value: '张累累'},
                        {type: 'br-form-row', load: (value, data) => data.logType === 1}
                    ],  
                    [
                        {type: 'text-form-label', value: '物资来源:', style: {width: 88}},
                        {type: 'text-label', prop: 'materialFrom'},
                        {type: 'br-form-row',  load: (value, data) => data.logType === 0}
                    ], 
                    [
                        {type: 'text-form-label', value: '备注:', style: {width: 88}},
                        {type: 'text-label', prop: 'remark'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'text-label',  filter: (value, data) =>  data.logType ===0  ? `本次入库物资: ${data.materialLogs.length}项` : `本次出库物资: ${data.materialLogs.length}项`, style: {padding: 12, align: 'center'}},
                    {type: 'views', prop: 'materialLogs', columns: [
                        [
                            {type: 'text-form-label', prop: 'materialName', style: {flex: 1}},
                            {type: 'text-form-label', prop: 'logNum'},
                            {type: 'text-form-label', prop: 'materialUnit'},
                            {type: 'br-normal-row'}
                        ],
                        {type: 'text', prop: 'price', filter: (value, data) => `￥${value} /${data.materialUnit}`, load: value => this.state.data.logType === 0, style: {alignItems: 'flex-end', paddingTop: 5} },
                        {type: 'br-form-col'}
                    ]}
                ]}
            />
        );
    }
  }