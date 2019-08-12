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
            timus: [{title: '1.什么题目,下列关于水的写法是不同与其它的是什么？（）',a: '',isJieXi: 0},{title: '2.什么题目,下列关于水的写法是不同与其它的是什么？（）', a: '',isJieXi: 0},{title: '3.什么题目,下列关于水的写法是不同与其它的是什么？（）',a: '',isJieXi: 0}],
            currentIndex: 0
        }
    }
    componentDidMount() {
        var i = 0
        
    }
    render() {
        return (
           <ScrollView>
               <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    columns={[
                        [
                            {type: 'text', value: '23', style: {color: 'white', fontSize: 24, fontWeight: '800'}},
                            {type: 'text', value: '成长积分', style: {color: 'white', fontSize: 18, paddingTB: 8}},
                            [
                                {type: 'image', value: require('../../assets/ygz.png'), style: {width: 22, height: 22}},
                                {type:　'text-primary', prop: 'dd', value: '积分说明'},
                                {type: 'click', style: {backgroundColor: 'white', padding:5, borderRadius: 25, flexDirection:　'row', align: 'center', paddingLR: 10}}
                            ],
                            {type: 'br', style: {backgroundColor: '#444', align: 'center', padding: 45}}
                        ], [
                            {type: 'text-h3', value:'积分规则', style: {flex: 1}},
                            {type: 'text-form-label', value: '今日已累积', style: {marginRight: 5}},
                            {type: 'text-primary', value: 3, filter: value => `${value}积分`},
                            {type: 'br-form-row'}
                        ],
                        {type: 'views', value: [{}, {}, {}], columns:[
                            {type: 'text-h3', value: '登录'},
                            [
                                [
                                    {type: 'text-h5', value: '1分 / 每次登录', style: {paddingTB: 8}},
                                    {type: 'progress', value: .5, style: {width: 180}},
                                    {type:　'br', style: {flex: 1}}
                                ],
                                {type: 'button-cancel', value: '去看看', style: {borderRadius: 6, padding: 5}},
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