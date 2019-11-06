import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View, Dimensions} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '验收',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        gz_yanshou: data => {
                            let params = {
                                ...data,
                                type: data.type ? 1 : 2
                            } 
                            
                            if (data.partFlag == '质量管理') {
                                Freedomen.global.api.call('/QualityCheck/check', params).then(res => {
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '工作任务') {
                                Freedomen.global.api.call('/WorkTask/check', params).then(res => {
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '安全管理') { 
                                Freedomen.global.api.call('/SecurityCheck/check', params).then(res => {
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '实测实量') { 
                                params = {
                                    ...data,
                                    state: data.type ? 1 : 2
                                } 
                                Freedomen.global.api.call('/MeasureProblem/check', params).then(res => {
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    navigation.goBack()
                                })
                            }
                            Freedomen.global.toast('验收完成')
                            
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '验收', style: {marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props) 
        this.state = {
            data: {...props.navigation.state.params, type: false}
        } 
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5', flex: 1}} 
                event={params => {
                    if (params.prop == 'sw')
                        return {label: params.value?'通过':'不通过'}

                    thisParams = params.row
                }} 
                data={this.state.data}
                redux={'gz_yanshou'}
                columns={[
                    [
                        {type: 'text-h4', value: '工作结果', style: {flex: 1}},
                        {type: 'text', value: '不通过', filter: (value, data) => data.type ? '通过' : '不通过',  style: (value, data) => {
                            return (data.type == 1) && {color: '#2EBBC4'}
                        }},
                        {type: 'switch', prop: 'type', value: false},
                        {type: 'br-form-row', style: {marginTB: 1}}
                    ],
                    [
                        {type: 'text-h4', value: '评分', style: {flex: 1}},
                        {type: 'rate', value: 1, prop: 'score'},
                        {type: 'br-form-row', style: {marginBottom: 1}, load: (value, data) => data.type == 1}
                    ],
                ]}
            />
               
        );
    }
  }