import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label ,
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
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'JG_TonJi') {
                        this.props.navigation.push('JG_TonJi', {label: '项目记工统计'})
                    } else if (params.prop == 'JG_JieSuan') {
                        this.props.navigation.push('JG_JieSuan', {label: '项目记工结算'})
                    } else if (params.prop == 'd') {
                        this.props.navigation.push('JG_XinJian', {label: '新建人工消耗'})
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
                        //this.props.navigation.push('JX_XiaoHaoJiLu')
                    }
                }}
                data={this.state.data}
                columns={[
                    [ 
                        {type: 'tags-tab', value: '我的记录', prop:'mm', options: '我的记录,项目记录'},
                        {type: 'br-row', style: {backgroundColor: 'white', paddingTB: 8, marginBottom: 2}}
                    ], 
                    columns.JI$_RiLi , 
                    [
                        {type: 'text-form-label', value: '项目记工统计', style: {flex: 1}},
                        {type: 'text-primary', value: 1.1, filter: value => `${value}工日`},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'JG_TonJi'}
                    ], [
                        {type: 'text-form-label', value: '记工结算', style: {flex: 1}},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'JG_JieSuan'}
                    ], [
                        {type: 'text-form-label', value: '公司工人名册', style: {flex: 1}},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'd'}
                    ], [
                        {type: 'text-form-label', value: '标准工时', style: {flex: 1}},
                        {type: 'text', value: 10, filter: value => `${value} 小时/天`},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ]
                ]}
            />
        );
    }
  }