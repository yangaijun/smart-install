import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, ScrollView} from 'react-native'
 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
        title: '学习积分',
        // headerRight: <Freedomen.Region 
        //     event={params => { 
        //     }}
        //     columns={[
        //         {type: 'button-text-primary', value: '交卷', style: {marginRight: 12}}
        //     ]}
        // />
    }}
    constructor(props) {

        super(props)
        this.state = {
            data: {
                resultList: []
            }
        }
    }
    componentDidMount() {
        Freedomen.global.api.call('/UserIntegralLog/select').then(res => {
            console.log(res)
            this.setState({
                data: res
            })
        })
        
    }
    render() {
        return (
           <ScrollView>
               <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    data={this.state.data}
                    event={params => {
                        if (params.value && params.value.prop == 'into') {
                            const routes = {
                                2: 'XX_YueDuZiLiao',
                                3: 'XX_ShiTinXueXi',
                                4: 'XX_MeiRiYiLian',
                                5: 'XX_ZaiXianTiKu'
                            }
                            this.props.navigation.push(routes[params.value.row.type])
                        }
                    }}
                    columns={[
                        [
                            {type: 'text', prop: 'historyNum', value: '23', style: {color: 'white', fontSize: 24, fontWeight: '800'}},
                            {type: 'text', value: '成长积分', style: {color: 'white', fontSize: 18, paddingTB: 8}},
                            [
                                {type: 'image', value: require('../../assets/ygz.png'), style: {width: 22, height: 22}},
                                {type:　'text-primary', prop: 'dd', value: '积分说明'},
                                {type: 'click', style: {backgroundColor: 'white', padding:5, borderRadius: 25, flexDirection:　'row', align: 'center', paddingLR: 10}}
                            ],
                            {type: 'backimage', value: require('../../assets/xx_bg.png'), style: {backgroundColor: '#444', align: 'center', padding: 45}}
                        ], [
                            {type: 'text-h3', value:'积分规则', style: {flex: 1}},
                            {type: 'text-form-label', value: '今日已累积', style: {marginRight: 5}},
                            {type: 'text-primary', prop: 'todayNum', value: 3, filter: value => `${value}积分`},
                            {type: 'br-form-row'}
                        ],
                        {type: 'views', prop: 'resultList', value: [{}, {}, {}], columns:[
                            {type: 'text-h4', prop: 'name', value: '登录'},
                            [
                                [
                                    {type: 'text-h5', prop: 'rule', style: {paddingTB: 8}},
                                    [
                                        {type: 'progress', filter: (value, data) => parseInt((data.num / data.allNum) * 100) + 0.1, style: {width: 180, marginRight: 5}},
                                        {type: 'text', filter: (value, data) => `已获${data.num}分/上限${data.allNum}`},
                                        {type: 'br-normal-row'}
                                    ],
                                    {type:　'br', style: {flex: 1}}
                                ],
                                {type: 'button-text', prop: 'into', filter: (value, data) => parseInt((data.num / data.allNum) * 100) == 100 ? '已完成' : '去看看', style: (value, data) => {
                                    return {
                                        color: parseInt((data.num / data.allNum) * 100) == 100 ? '#232323' : '#2EBBC4',
                                        backgroundColor: parseInt((data.num / data.allNum) * 100) == 100 ? '#F5F5F5' : '#fdfdfd',
                                        padding: 5,
                                        paddingLR: 8
                                    }
                                }}, 
                                {type: 'br', style: {flexDirection: 'row'}}
                            ],
                            {type: 'br-list-item'}
                        ]}
                    ]}
               />
           </ScrollView>
        );
    }
  }