import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
        }
    } 
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
            <ScrollView>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        if (params.prop == 'JX_JinChan') {
                            this.props.navigation.push('JX_JinChan')
                        } else if (params.prop == 'JX_TaiZhan') {
                            this.props.navigation.push('JX_TaiZhan')
                        } else if (['pre', 'next'].includes(params.prop)) {
                            this.month += params.prop == 'pre' ? -1 : 1
                            if (this.month >= 13)
                                this.month = 1
                            else if (this.month <= 0) 
                                this.month = 12
                            params.row.days = this.getDateArr(this.year, this.month)
                            params.row.yearMonth = this.year + '年' + this.month + '月'
                            return params.row
                        } else if (params.value && params.value.prop == 'dayItem' && params.value.row.record) {
                            this.props.navigation.push('JX_XiaoHaoJiLu')
                        } else {
                            //alert(JSON.stringify(params))
                        }
                    }}
                    data={this.state.data}
                    columns={[
                        [ 
                            {type: 'tags-tab', value: '我的记录', prop:'mm', options: '我的记录,项目记录'},
                            {type: 'br-row', style: {backgroundColor: 'white', paddingTB: 8, marginBottom: 2}}
                        ], 
                        columns.JI$_RiLi, 
                        [
                            {type: 'text-form-label', value: '机械进场记录', style: {flex: 1}},
                            {type: 'text-primary', value: 1.1, filter: value => `${value}工日`},
                            {type: 'image-form', value:　require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'JX_JinChan'}
                        ], [
                            {type: 'text-form-label', value: '机械台账', style: {flex: 1}},
                            {type: 'image-form', value:　require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'JX_TaiZhan'}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }