import React from 'react'
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '进度反馈',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        gz_fankui: data => {
                            if (data.partFlag == '质量管理') {
                                Freedomen.global.api.call('/QualityCheck/setProcess', data).then(res => {
                                    Freedomen.global && Freedomen.global.fn(true)
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '工作任务') {
                                Freedomen.global.api.call('/WorkTask/setProcess', data).then(res => {
                                    Freedomen.global && Freedomen.global.fn(true)
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '安全管理') {
                                Freedomen.global.api.call('/SecurityCheck/setProcess', data).then(res => {
                                    Freedomen.global && Freedomen.global.fn(true)
                                    navigation.goBack()
                                })
                            } else if (data.partFlag == '实测实量') {
                                Freedomen.global.api.call('/MeasureProblem/setProcess', data).then(res => {
                                    Freedomen.global && Freedomen.global.fn(true)
                                    navigation.goBack()
                                })
                            }
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '提交', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = { 
            data: props.navigation.state.params
        }
    }
    render() {
        return (
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5', flex: 1}}
                    event={params => { 
                        
                    }}
                    data={this.state.data}
                    redux={'gz_fankui'}
                    columns={[
                        [
                            {type: 'text-form-label', value: '进度:'},
                            {type: 'slider', value: 5, prop: 'process', style: {flex: 1, paddingLR: 5}},
                            {type: 'text-primary', filter: (value, data) => (data.process || 0) + '%', style: {width: 40}},
                            {type: 'br-form-row'}
                        ] 
                    ]}
                />
        );
    }
  }