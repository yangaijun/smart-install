import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
        title: navigation.state.params && navigation.state.params.i + 'ddd' ,
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text-primary', value: '交卷', style: {marginRight: 12}}
            ]}
        />
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
        // setInterval(() => {
        //     i ++
        //     this.props.navigation.setParams({i : i})
        // }, 1000)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                 <Freedomen.Region 
                    data={this.state.timus[this.state.currentIndex]}
                    style={{flex: 1, padding: 10}}
                    columns={[
                        {type: 'text-h3', prop: 'title', value: '1.什么题目,下列关于水的写法是不同与其它的是什么？（）', style: {paddingTB: 10,lineHeight: 25}},
                        {type: 'radios', prop: 'a', options: '个不是真的3,个不是真的2,个不是真的4,个不是真的1', style: {flexDirection: 'column', paddingTB: 5}},
                        [
                            {type: 'text', value: '【正确答案】', style: {color: '#FF6D73', fontWeight: 'bold'}},
                            {type: 'text-h3', value: 'A'},
                            {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                        ], [
                            {type: 'text', value: '【答题解析】', style: {color: '#2EBBC4', fontWeight: 'bold'}},
                            {type: 'text-h4', value: 'XXX本题解析内容'},
                            {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center'}}
                        ],
                     ]}
                /> 
                <Freedomen.Region 
                    style={{height: 52, borderTopWidth: 1, borderTopColor: '#f5f5f5'}}
                    event={params => {
                        if (params.prop == 'jiexi') {
                            let timus = this.state.timus
                            timus[this.state.currentIndex].isJieXi = 1
                            this.setState({
                                timus: timus
                            })
                        } else if (params.prop == 'pre') {
                            let currentIndex = this.state.currentIndex
                            currentIndex --
                            this.setState({
                                currentIndex: currentIndex < 0 ? 0 : currentIndex
                            })
                        } else if (params.prop == 'next') {
                            let currentIndex = this.state.currentIndex
                            currentIndex ++
                            this.setState({
                                currentIndex: currentIndex >= this.state.timus.length ? currentIndex - 1 : currentIndex
                            })
                        }
                    }}
                    columns={[
                        {type: 'button-image', value: require('../../assets/xx_jiexi.png'), style: {height: 42, width: 38, marginLR: 10}},
                        {type: 'button-image', value: require('../../assets/xx_datika.png'), style: {height: 42, width: 38, marginLR: 10}},
                        {type: 'text', style: {flex: 1}},
                        {type: 'button-cancel', prop: 'pre', value: '上一题', style: {padding: 5, paddingLR: 15, borderRadius: 2}},
                        {type: 'button-cancel', prop: 'next', value: '下一题', style: {padding: 5, paddingLR: 15, marginLeft: 15, borderRadius: 2}},
                        {type: 'br', style: {alignItems: 'center', height: 52, flexDirection: 'row', paddingLR: 15}}
                    ]}
                />
            </View>
           
        );
    }
  }