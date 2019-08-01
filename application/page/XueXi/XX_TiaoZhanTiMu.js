import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <Freedomen.Region 
                event={params => {
                    if (params.prop == 'submit') {
                        params.row.isJieXi = true
                        return params.row
                    }
                }}
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
                    {type: 'text', style: {flex: 1}},
                    {type: 'button-primary', prop: 'submit', value: '提交', load: (value, data) => !data.isJieXi, style: {width: '55', borderRadius: 28, alignSelf: 'center', marginBottom: 25}}
                ]}
            /> 
        );
    }
  }