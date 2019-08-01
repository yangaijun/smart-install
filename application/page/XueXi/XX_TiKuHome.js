import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Dimensions} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '在线题库'
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
                list: [{}, {}, {}, {}]
            })
        }, 100);
    }
    render() {
        return (
            <Freedomen.Region 
                style={{flex: 1, alignItems: 'center', paddingTop: Dimensions.get('screen').height * 0.04}}
                event={params => {
                    this.props.navigation.push('XX_TiMu')
                }}
                columns={[
                    {type: 'text-h2', value: 'XXXX什么题目', style: {paddingTB: 10}},
                    [
                        {type: 'text-h4', value: '50道（40道单项选择题，10道多项选择题） 做题时间：120分钟', filter: value => `题型题量： ${value}`, style: {paddingTB: 5, alignItems: 'flex-start', lineHeight: 24} },
                        {type: 'text-h4', value: 'lfjdaljdsa', filter: value => `做题时间： ${value}` , style: {paddingTB: 5}},
                        {type: 'br', style: {marginTB: 10, width: '100', padding: 20}}
                    ],
                    {type: 'button-primary',  value: '开始做题', style: {borderRadius: 22, paddingTB: 10, width: '42', marginTop: 22}}
                ]}
            />
        );
    }
  }