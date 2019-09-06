import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Image} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '统计', 
        tabBarIcon: ({tintColor,focused}) => <Image source={focused ? require('../../assets/untonji.png') : require('../../assets/tonji.png')} style={{height: 22, width: 22}}/> 
    }; 
    constructor(props) {
        super(props)
        let date = new Date()
        this.month = date.getMonth() + 1
        this.year = date.getFullYear()
        this.state = {
            data: {
                days: this.getDateArr(this.year, this.month),
                yearMonth: this.year + '年' + this.month + '月'
            }
        }
    }
    componentDidMount() { }

    getDaysOfMonth = (year, month) => {
        var day = new Date(year, month, 0)
        var dayCount = day.getDate()
        return dayCount
    } 
    getFirstDay = (year, month) => {
        var day = new Date(year, month - 1)
        var dayCount = day.getDay()
        if (dayCount == 0) {
            dayCount = 7
        }
        return dayCount
    }
    getDateArr(year, month) {
        let spaceCount = this.getFirstDay(year, month) 
        let arr = []
        for (let i = 1; i < spaceCount; i ++) {
            arr.push({label: ''})
        }
        let days = this.getDaysOfMonth(year, month)
        for (let i = 0; i < days; i ++) {
            arr.push({label: i + 1, record: i == 0 || i == 1})
        }
        return arr

    }
    render() {
        return (
            <Freedomen.Region  
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'pjgs') {
                        return {
                            ...params.row,
                            pjgs: !params.row.pjgs
                        }
                    }
                }}
                data={this.state.data}
                columns={[
                    [
                        {type: 'button-image', prop:　'pre', value: require('../../assets/leftprimary.png'), style: {paddingLR: 45, width: 20, height: 20}},
                        {type: 'text-primary', prop: 'yearMonth', value: '2019年7月', style: {fontSize: 18, fontWeight: '400'}},
                        {type: 'button-image', prop:　'next', value: require('../../assets/rightprimary.png'), style: {paddingLR: 45, width: 20, height: 20}},
                        {type: 'br-form-row', style: {align: 'center', marginBottom: 2}}
                    ], [
                        {type: 'text-form-label', value: '平均工时：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}小时`},
                        {type: 'image-form', filter: (value, data) => {
                            return data.pjgs ? require('../../assets/top.png') : require('../../assets/bottom.png')
                        }},
                        {type: 'click-form-row', prop: 'pjgs'}
                    ], [
                        {type: 'text', value: 'nihao'},
                        {type: 'text', value: 'ndddihao'},
                        {type: 'text'},
                        {type: 'br', load: (value, data) => data.pjgs, style: {backgroundColor: '#f5f5f5'}}
                    ], [
                        {type: 'text-form-label', value: '出勤天数：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}天`},
                        {type: 'click-form-row' }
                    ], [
                        {type: 'text-form-label', value: '休息天数：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}天`},
                        {type: 'click-form-row' }
                    ], [
                        {type: 'text-form-label', value: '迟到：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}次`},
                        {type: 'click-form-row' }
                    ], [
                        {type: 'text-form-label', value: '早退：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}次`},
                        {type: 'click-form-row' }
                    ], [
                        {type: 'text-form-label', value: '缺卡：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}次`},
                        {type: 'click-form-row' }
                    ], [
                        {type: 'text-form-label', value: '旷工：', style: {flex: 1}},
                        {type: 'text-label', value: 10, filter: value => `${value}次`},
                        {type: 'click-form-row' }
                    ]  
                ]}
            />
        );
    }
  }