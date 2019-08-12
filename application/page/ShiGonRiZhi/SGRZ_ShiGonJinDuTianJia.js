import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '施工进度',
            headerRight: <Freedomen.Region 
                event={params => { }}
                columns={[
                    {type: 'button-right', value: '保存'},
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
            <ScrollView style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => {
                    }}
                    columns={[
                        [
                            {type: 'text-form-label', value: '开始时间'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'pick-date',  prop: 'start', placeholder: '请选择开始时间'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '结束时间'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'pick-date',  prop: 'start', placeholder: '请选择结束时间'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '施工部位'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text',  value: '请选择施工部位'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row'}
                        ], [
                            {type: 'text-form-label', value: '施工内容'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text',  value: '请选择施工内容'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row'}
                        ], [
                            {type: 'text-form-label', value: '班组'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text',  value: '请选择施工内容'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row'}
                        ], [
                            {type: 'text-form-label', value: '工作进度'},
                            {type: 'text-must', value: '*'},
                            {type: 'slider', prop: 'slider',  value: .2, style: {flex: 1, paddingLR: 10}},
                            {type: 'text-primary', value: .2, filter: (value, data) => parseInt((data.slider || value) * 100) + '%', style: {minWidth: 40}},
                            {type: 'br-form-row'}
                        ],
                    ]}
                />
            </ScrollView>
                
        );
    }
  }