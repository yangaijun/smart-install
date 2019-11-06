import React from 'react';
import {Dimensions} from 'react-native'  
import Freedomen from 'react-native-freedomen'
const {width, height} = Dimensions.get('window')
const icon = require('../../assets/icon.png') 
export default class extends React.Component { 
    static navigationOptions = {  
        title: '意见反馈', 
    }; 
    constructor (props) {
        super (props) 
        this.state = { }
    }
    
    render() {
        return ( 
                <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    event={params => {
                        if (params.prop == 'submit') { 
                            if (!params.row.content) {
                                Freedomen.global.toast('请输入您的意见')
                                return
                            }
                            Freedomen.global.api.call('/Feedback/add', params.row).then(res => {
                                Freedomen.global.toast('反馈成功！')
                                this.props.navigation.goBack()
                            })
                        }
                    }}
                    columns={[
                        {type: 'input-area', prop: 'content', placeholder: '请填写您宝贵的意见',maxLength: 500, style: {backgroundColor: 'white', padding: 10}},  
                        {type: 'input-text', prop: 'tel', placeholder: '请输入您的联系方式（选填）', style: {backgroundColor: 'white', height: 52, padding: 10, justifyContent: 'center', marginTB: 10}},
                        {type: 'button-text', prop: 'submit', value: '提交', style: {fontSize: 15, color: '#252525', width: '100',backgroundColor: 'white',paddingTB: 15, align: 'center'}} 
                    ]}
                /> 
        )
    }
} 