import React from 'react';
import {Dimensions, Alert} from 'react-native'  
import Freedomen from 'react-native-freedomen'

export default class extends React.Component { 
    static navigationOptions = { 
        title: '忘记密码'
    }
    constructor (props) {
        super (props) 
        this.state = { 
            data: {isSend: false}
        }
    }
    async componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task. 
    } 
    render() {
        return ( 
            <Freedomen.Region 
                event={params => { 
                    if (params.prop == 'getcode') {
                        if (!params.row.mobile || params.row.mobile.length !== 11) {
                            Alert.alert('提示', '手机号码不正确', [{text: '确认'}])
                            return
                        }
                        Freedomen.global.api.call('/JasoUser/getIdentifyingCode', {mobile: params.row.mobile}).then(res => {
                            this.setState({
                                data: {isSend: true}
                            })
                        })
                    } else if (params.prop == 'submit') {
                        if (params.row.repassword !== params.row.password) {
                            Alert.alert('提示', '再次密码不相同', [{text: '确认'}])
                            return
                        }
                        Freedomen.global.api.call('/JasoUser/getIdentifyingInfo', params.row).then(res=> {
                            Freedomen.global.toast('修改成功')
                            this.props.navigation.goBack()
                        })
                    }
                }}
                data={this.state.data}
                style={{alignItems: 'center', flex: 1, paddingTop: 28}}
                columns={[
                    [
                        {type: 'image-icon', value: require('../assets/w_shoujihao.png')},
                        [
                            {type: 'input', others: {placeholderTextColor: '#c0c0c0'}, prop: 'mobile', placeholder: '请输入手机号码', style: {flex: 1}},
                            {type: 'button', prop: 'getcode', value: '获取验证码', filter: (value, data) => data.isSend ? '已经发送': '获取验证码', disabled: (value, data) => data.isSend, style: {width: 140, padding: 6, borderColor: '#BFBFBF', align: 'center', color: '#BFBFBF', borderWidth: 1}},
                            {type: 'br', style: {flexDirection: 'row', width: '82', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0'}}
                        ],
                        {type: 'br-normal-row', style: {marginTop: 22}}
                    ], [
                        {type: 'image-icon', value: require('../assets/w_yanzhenma.png')},
                        {type: 'input', others: {placeholderTextColor: '#c0c0c0'}, prop: 'code', placeholder: '请输入验证码', style: {borderBottomWidth: 1, borderBottomColor: '#f0f0f0',  width: '82'}}, 
                        {type: 'br-normal-row', style: {marginTop: 22}}
                    ], [
                        {type: 'image-icon', value: require('../assets/w_mima.png')},
                        {type: 'input-password', others: {placeholderTextColor: '#c0c0c0'}, prop: 'password', placeholder: '请输入新密码', style: {borderBottomWidth: 1, borderBottomColor: '#f0f0f0', width: '82'}}, 
                        {type: 'br-normal-row', style: {marginTop: 22}}
                    ], [
                        {type: 'image-icon'},
                        {type: 'input-password', others: {placeholderTextColor: '#c0c0c0'}, prop: 'repassword',  placeholder: '请确认新密码', style: {borderBottomWidth: 1, borderBottomColor: '#f0f0f0', width: '82'}}, 
                        {type: 'br-normal-row', style: {marginTop: 22, marginBottom: 30}}
                    ],
                    {type: 'button-primary', prop: 'submit', value: '完成', style: {marginTop: 35,width: 215, borderRadius: 22}},
                ]}
            />
        )
    }
} 