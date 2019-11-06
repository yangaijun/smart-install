import React from 'react'
import Freedomen from 'react-native-freedomen'
import utils from '../../region/utils'
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
        this.data = []
        this.state = {
            data: {
                days: [],
                yearMonth: this.year + '年' + this.month + '月'
            }
        }
    }
    componentDidMount() { 
        this._loadData()
    }
    _loadData() { 
        Freedomen.global.api.call('/AppWokerPoint/count', {workpointDate: `${this.year}-${this.month}-01` }).then(res => {
            console.log(res);
        })

        Freedomen.global.api.call('/AppWokerPoint/select', {workpointDate: `${this.year}-${this.month}-01` }).then(res => {
            this.data = res.map(el => {
                el.workpointDate = utils.formatDate.format(new Date(el.workpointDate), "yyyy-MM-dd")
                return el
            })
            this.setState({
                data: {
                    days: this.getDateArr(this.year, this.month),
                    yearMonth: this.year + '年' + this.month + '月',
                    label: [{label: '一'}, {label: '二'}, {label: '三'}, {label: '四'}, {label: '五'}, {label: '六'}, {label: '日'}]
                }
            })
        })
    }
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
            let item = this.data.find((item) => { 
                return item.workpointDate == year + '-' + (month > 9 ? month : '0'+ month) + "-" + (i + 1 > 9 ? i + 1 : "0" + (i + 1))
            })  
            arr.push({label: i + 1, record: item, item: item, date: year + '-' + (month > 9 ? month : '0' + month) + "-" + (i + 1 > 9 ? i + 1 : "0" + (i + 1))})
        }
        return arr
    }
    render() {
        return (
            <ScrollView>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        console.log(params)
                        if (params.prop == 'JG_TonJi') {
                            this.props.navigation.push('JG_TonJi', {label: '项目记工统计'})
                        } else if (params.prop == 'JG_JieSuan') {
                            this.props.navigation.push('JG_JieSuan', {label: '项目记工结算'})
                        } else if (params.prop == 'mince') {
                            // this.props.navigation.push('JG_XinJian', {label: '新建人工消耗'})
                        } else if (['pre', 'next'].includes(params.prop)) {
                            this.month += params.prop == 'pre' ? -1 : 1
                            if (this.month >= 13)
                                this.month = 1
                            else if (this.month <= 0) 
                                this.month = 12 
                            this._loadData() 
                        } else if (params.value && params.value.prop == 'dayItem') {
                            params.value.row.record 
                            ?
                            this.props.navigation.push('JG_XiaoHaoJiLu', params.value) 
                            :
                            this.props.navigation.push('JG_XinJian', {label: '新建人工消耗', ...params.value}) 
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
                            {type: 'click-form-row', prop: 'mince'}
                        ], [
                            {type: 'text-form-label', value: '标准工时', style: {flex: 1}},
                            {type: 'text', value: 10, filter: value => `${value} 小时/天`},
                            {type: 'image-form', value:　require('../../assets/right.png')},
                            {type: 'click-form-row'}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }