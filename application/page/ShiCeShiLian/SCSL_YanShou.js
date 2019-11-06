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
                        self: data => {
                            Freedomen.global.api.call('/MeasureProblem/check', {
                                measureProblemId: data.measureProblemId,
                                score: data.score,
                                state: data.state ? 1 : 2
                            }).then(res => {
                                Freedomen.global.fn()
                                navigation.goBack()
                            })
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
            data: this.props.navigation.state.params
        }
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5', flex: 1}} 
                event={params => {
                    if (params.prop == 'sw')
                        return {label: params.value?'通过':'不通过'}
 
                }} 
                redux={'self'}
                data={this.state.data}
                columns={[
                    [
                        {type: 'text-h4', value: '工作结果', style: {flex: 1}},
                        {type: 'text', value: '不通过', prop: 'label', style: (value, data) => {
                            if (data.state == 1)
                                return {color: '#2EBBC4'}
                        }},
                        {type: 'switch', prop: 'state', value: false},
                        {type: 'br-form-row', style: {marginTB: 1}}
                    ],
                    [
                        {type: 'text-h4', value: '评分', style: {flex: 1}},
                        {type: 'rate', value: 1, prop: 'score'},
                        {type: 'br-form-row', style: {marginBottom: 1}}
                    ],
                ]}
            />
               
        );
    }
  }