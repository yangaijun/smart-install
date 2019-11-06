import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.createTime,
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
                data={this.state.data}
                style={{flex: 1, padding: 10}}
                event={params => {
                    if (params.value && params.value.prop == 'choose') {
                        this.state.data.choose = params.value.row.$index
                        this.setState({
                            data: this.state.data
                        })
                    } else if (params.prop == 'submit') {
                        const m416 = {
                            0: 'A',
                            1: 'B',
                            2: 'C',
                            3: 'D',
                            4: 'E',
                            5: 'F'
                        } 
                        console.log({
                            ...params.row,
                            isRight: m416[params.row.choose] == params.row.rightKey ? 1 : 0,
                            personalAnswer: m416[params.row.choose],
                            studyDataId: params.row.studyDataId
                        })
                        Freedomen.global.api.call('/StudyPractice/submit', {
                            ...params.row,
                            isRight: m416[params.row.choose] == params.row.rightKey ? 1 : 0,
                            personalAnswer: m416[params.row.choose],
                            studyDataId: params.row.studyDataId
                        }).then(res => {
                            console.log(res)
                        })
                        return {
                            ...params.row,
                            isJieXi: true
                        }
                    }
                }}
                columns={[
                    {type: 'text-h3', prop: 'dataName', style: {paddingTB: 10,lineHeight: 25}},
                    {
                        type: 'views', 
                        prop: 'studyDataOptions',
                        columns: [
                            {type: 'image-icon', value: require('../../assets/right.png'), filter: (value, data) => {
                                return this.state.data.choose === data.$index ? require('../../assets/check.png'): require('../../assets/uncheck.png')
                            }},
                            {type: 'text-label', prop: 'xuanxian'},
                            {type: 'click-row', prop: 'choose'}
                        ]
                    },
                    [
                        {type: 'text', value: '【正确答案】', style: {color: '#FF6D73', fontWeight: 'bold'}},
                        {type: 'text-h3', prop: 'rightKey', value: 'A'},
                        {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                    ], [
                        {type: 'text', value: '【答题解析】', style: {color: '#2EBBC4', fontWeight: 'bold'}},
                        {type: 'text-h4', prop: 'answerAnalysis'},
                        {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center'}}
                    ],
                    {type: 'text', style: {flex: 1}},
                    {type: 'button-primary', prop: 'submit', value: '提交', load: (value, data) => !data.isJieXi, style: {width: '55', borderRadius: 28, alignSelf: 'center', marginBottom: 25}}
                ]}
            /> 
        );
    }
  }