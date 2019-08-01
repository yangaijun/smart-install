import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '筛选',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        rzy_shaixuan: {kssj: '', jssj: ''}
                    })
                }}
                columns={[
                    {type: 'button-text', value: '重置', style: {marginRight: 12}},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    
                }}
                redux={'rzy_shaixuan'}
                columns={[
                   [
                       {type: 'text-form-label', value: '开始时间', style: {flex: 1}},
                       {type: 'pick-date', placeholder: '请选择开始时间', prop: 'kssj'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'br-form-row'}
                   ], [
                       {type: 'text-form-label', value: '结束时间', style: {flex: 1}},
                       {type: 'pick-date', placeholder: '请选择结束时间', prop: 'jssj'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'br-form-row'}
                   ], [
                       {type: 'text-form-label', value: '创建人', style: {flex: 1}},
                       {type: 'text', value: '请选择'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'click-form-row'}
                   ],[
                        {type: 'button-primary', value: '确定', style: {width: '58', borderRadius: 28}},
                        {type: 'br', style: {paddingTop: 35, backgroundColor: 'white', align: 'center'}}
                   ]
                   
                ]}
            />
        );
    }
  }