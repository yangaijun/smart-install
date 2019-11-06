import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Dimensions} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '在线题库'
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            data: this.props.navigation.state.params
        }
    }
    componentDidMount() { 
        Freedomen.global.api.call('/StudyData/selectList', {
            studyWorkerTypeId: this.props.navigation.state.params.studyWorkerTypeId,
            studyDataList: this.props.navigation.state.params.studyDataList
        }).then(res => {
            this.list = res.map(el => {
                el.isJieXi = 0
                el.studyDataOptions = el.studyDataOptions.split(';').map((res, i) => {
                    return {
                        xuanxian: res
                    }
                })
                return el
            })
        })
    }
    render() {
        return (
            <Freedomen.Region 
                style={{flex: 1, alignItems: 'center', paddingTop: Dimensions.get('screen').height * 0.04}}
                event={params => {
                    this.props.navigation.push('XX_TiMu', {list: this.list, ...this.state.data})
                }}
                data={this.state.data}
                columns={[
                    {type: 'text-h3', prop: 'name', style: {paddingTB: 10}},
                    [
                        {type: 'text-h5', prop: 'dataNum', filter: value => `题型题量： ${value} 道`, style: {paddingTB: 5, alignItems: 'flex-start', lineHeight: 24} },
                        {type: 'text-h5', prop: 'timeNum', filter: value => `做题时间： ${value}分钟` , style: {paddingTB: 5}},
                        {type: 'br', style: {marginTB: 10, width: '100', padding: 20}}
                    ],
                    {type: 'button-primary',  value: '开始做题', style: {borderRadius: 22, width: '42', marginTop: 22}}
                ]}
            />
        );
    }
}