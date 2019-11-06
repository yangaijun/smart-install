import React from 'react'
import {ScrollView, KeyboardAvoidingView, Alert, Dimensions} from 'react-native'  
import JPush from 'jpush-react-native';
const {width, height} = Dimensions.get('window')
import Freedomen from 'react-native-freedomen'
import store from 'react-native-freedomen/store' 
import Log from '../assets/old/log.png'

export default  class  extends React.Component {
    constructor(props) {
        super(props)
        store.get('userInfo').then(res => {
            Freedomen.global.api.call('/JasoUser/loginPc', res).then(res2 => {
                this.loginSuccess(res2)
            }).catch(e => {
                store.get('user').then(res3 => {
                    Freedomen.global.user = res3
                })
            })
            store.get('menuList').then(res1 => {
                Freedomen.global.controlMenuList = res1
            }).catch(res2 => {
                Freedomen.global.controlMenuList = res.menuList.map(el => el.menuName)
                store.set('menuList', Freedomen.global.controlMenuList)
            })
            this.props.navigation.navigate('AppNavigator')
        })
    }
    componentDidMount() {
        JPush.addReceiveOpenNotificationListener && JPush.addReceiveOpenNotificationListener((map) => {
            this.props.navigation.navigate('TianJia')
        });
    }
    loginSuccess(res) {
        Freedomen.global.user = res 

        Freedomen.global.api.call('/StudyPersonalPreference/select').then(res => {
            Freedomen.global.favourite = res
        })
        Freedomen.global.api.call('/StudyWorkerType/selectList').then(res => { 
            let obj = {}
            res.map (el => {
                obj[el.studyWorkerTypeId] = el.name
            })
            Freedomen.global.favouriteList = obj
        })
        Freedomen.global.api.call('/Message/getCount').then(res => {
            Freedomen.redux({
                bar_middle: data => {
                    if (res.data === 0)
                        data.badge = 0
                    else data.badge = res

                    return data
                }
            })
        })
        Freedomen.redux({
            'header_bar': data => {
                data.userIcon = res.userIcon
                return data
            }
        })
    }
    render() {
        return (  
            <KeyboardAvoidingView>
                <ScrollView>
                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'login') { 
                            if (!params.row.userName) {
                                Alert.alert('提示', '请输入用户名', [{text: '确定'}, {text: '取消'}])
                            } else if (!params.row.password) {
                                Alert.alert('提示', '请输入密码', [{text: '确定'}, {text: '取消'}])
                            } else {
                                
                                Freedomen.global.api.call('/JasoUser/loginPc', params.row).then(res => {
                                    store.set('userInfo', params.row)
                                    store.set('user', res)
                                    this.loginSuccess(res)
                                    this.props.navigation.navigate('AppNavigator')

                                    JPush && JPush.setAlias(res.jasoUserId + '', () => {
                                        console.log("Set alias succeed");
                                    }, () => {
                                        console.log("Set alias failed");
                                    });

                                    store.get('menuList').then(res1 => {
                                        Freedomen.global.controlMenuList = res1
                                    }).catch(res2 => {
                                        Freedomen.global.controlMenuList = res.menuList.map(el => el.menuName)
                                        store.set('menuList', Freedomen.global.controlMenuList)
                                    })

                                    
                                }).catch(e => {
                                    Alert.alert('提示', '用户名或密码错误', [{text: '确定'}, {text: '取消'}])
                                })
                            }
                        }  else if (params.prop == 'wanjimima') {
                            this.props.navigation.navigate('WanJiMiMa')
                        } 
                    }} 
                    columns={[
                        {type: 'image', value: Log, style: {width: 112, height: 112, marginTop: 85, marginBottom: 94, resizeMode: 'stretch'}}, 
                        [
                            {type: 'input-text', others: {placeholderTextColor: '#c0c0c0'}, prop: 'userName', placeholder: '请输入您的帐号', style: {width: '86', borderBottomWidth: 2, borderBottomColor: '#f5f5f5', paddingBottom: 2}},  
                            {type: 'input-password', others: {placeholderTextColor: '#c0c0c0'}, prop: 'password', placeholder: '请输入您的密码', style: {marginTop: 40, marginBottom: 15, width: '86', borderBottomWidth: 2, paddingBottom: 2,borderBottomColor: '#f5f5f5'}}, 
                            {type: 'button', value: '忘记密码', prop: 'wanjimima', style: {alignItems: 'flex-end', color: '#878787', textDecorationLine: 'underline', fontSize: 14}},
                            {type: 'br'}
                        ],
                        {type: 'button-primary', prop: 'login', value: '登录', style: {width: 214, height: 44, borderRadius: 22, marginTop: 40}},
                        {type: 'backimage', value: require('../assets/old/bg.png'), style: {width: width, height: height, alignItems: 'center', resizeMode: 'stretch'}}
                    ]}
                /> 
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
  }