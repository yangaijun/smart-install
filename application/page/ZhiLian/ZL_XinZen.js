import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Dimensions, ScrollView, Alert} from 'react-native' 
import valid from '../../region/validations'
var cache = null
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: Freedomen.global.ZHILIAN ? '新增质量检查' : '新增安全检查',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        zl_xinzen: (data) => { 
                            if (valid(data, Freedomen.global.ZHILIAN ? 'ZL_XinJian': 'AQ_XinJian')) {
                                let params = {...data, createTime: undefined, type: data.type ? 1 : 2, checkTypeList: data.checkTypeList.map(el => {
                                    el.state = el.state ? 1 : 0
                                    if (el.luyins)
                                        el.voiceFiles = el.luyins.map(el => el.luyin).join(',')
                                    if (el.pictures)
                                        el.imageFiles = el.pictures.map(el =>  el.picture).join(',')
                                    return el
                                })} 
                                Freedomen.global.api.call(Freedomen.global.ZHILIAN ? '/QualityCheck/add': '/SecurityCheck/add', params).then(res => {
                                    
                                    Freedomen.global.toast('创建成功')
                                    Alert.alert('提示', '安排整改？', [{text: '暂不安排', onPress: () => {
                                        Freedomen.global.fn && Freedomen.global.fn()
                                        navigation.goBack()
                                    }}, {text: '马上安排', onPress: () =>{
                                        console.log(res)
                                        navigation.push('ZL_ZhiPaiZhenGai', res)
                                    }}])
                                    
                                })
                            }
                            return data
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = { } 
        Freedomen.global.goBack = () => {
            this.props.navigation.goBack()
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    data={{informUserList: [], checkTypeList: []}}
                    event={params => { 
                        if (params.prop == 'paper') {
                            this.props.navigation.push('CP_Paper', {router: 'ZL_XinZen', form: 'zl_xinzen'})
                        } else if (params.prop == 'jianchaxinzhi') {
                            this.props.navigation.push('CP_JianChaXinZhi', {formName: 'zl_xinzen', label: '检查性质', ...params.row})
                        } else if (params.prop == 'zhidinren') {
                            this.props.navigation.push('CP_Users', {formName: 'zl_xinzen', label: '指定人', varName: 'informUserList', ...params.row})
                        } else if (params.prop == 'jianchaxiantianjia') {
                            this.checkTypeList = params.row.checkTypeList
                            slidePop.show()
                        } else if (params.value && params.value.prop == 'bianji') {
                            this.props.navigation.push('ZL_JianChaJieGuo', params.value.row)
                        } else if (params.prop == 'bianji') {
                            this.props.navigation.push('ZL_JianChaXianLeiBiao', {checkTypeList: params.row.checkTypeList})
                        } 
                    }}
                    redux={'zl_xinzen'}
                    columns={[
                        [
                            {type: 'text-form-label', value: '日期'},
                            {type: 'text-must', value: '*'},
                            {type: 'pick-date', prop: 'startDate', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], 
                        {type: 'text-valid-message', prop: 'startDate-valid', load: value => value},
                        [
                            {type: 'text-form-label', value: '检查名称'},
                            {type: 'text-must', value: '*', style: {flex: 1}},  
                            {type: 'input-text-form', prop: 'qualityCheckName', placeholder: '请输入检查名称'},
                            {type: 'br-form-row', load: ()=>Freedomen.global.ZHILIAN}
                        ], [
                            {type: 'text-form-label', value: '检查名称'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'input-text-form', prop: 'securityCheckName', placeholder: '请输入检查名称'},
                            {type: 'br-form-row', load: ()=>!Freedomen.global.ZHILIAN}
                        ], 
                        {type: 'text-valid-message', prop: 'qualityCheckName-valid', load: value => value},
                        {type: 'text-valid-message', prop: 'securityCheckName-valid', load: value => value},
                        [
                            {type: 'text-form-label', value: '检查性质', style: {flex: 1}},
                            {type: 'text-h5', prop: 'natureName', placeholder: '请选择检查性质'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'jianchaxinzhi'}
                        ], [
                            {type: 'text-form-label', value: '检查项', style: {flex: 1}},
                            {type: 'button-text-primary',prop: 'bianji', value: '编辑检查项'},
                            {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                        ], {
                            type: 'views', prop: 'checkTypeList', value:[], columns: [
                                [
                                    {type: 'text', prop: 'name', filter: (value, data) => {
                                        return data.$index + 1 + '.  ' + value
                                    }, style: {flex: 1}},
                                    {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                    {type: 'br-normal-row', style: {padding: 10, backgroundColor: 'white'}}
                                ], [
                                    {type: 'text-label', value: '结果:', style: {width: 48}},
                                    {type: 'text', prop: 'state', filter: value => value? '合格': '不合格', style: value => value && {color: '#2EBBC4'}},
                                    {type: 'br-normal-row', style: {backgroundColor: 'white', paddingLeft: 32}, load: (value, data) => data.state !== void 0}
                                ], [
                                    {type: 'text-label', value: '备注:', style: {width: 48}},
                                    {type: 'text', prop: 'describe'},
                                    {type: 'br-normal-row', style: {backgroundColor: 'white', paddingLeft: 32}, load: (value, data) => data.describe !== void 0}
                                ], 
                                (data) => {   
                                    let arr = []
                                    if (data.pictures && data.pictures.length) {
                                        for (let i = 0; i < data.pictures.length; i ++) {
                                            arr.push({type: 'button-image-picture', prop: 'picture', value: `http://www.jasobim.com:8085/${data.pictures[i].picture}`})
                                        }
                                        arr.push({type: 'br-normal-row', style: {backgroundColor: 'white', paddingLeft: 32}})
                                    }
                                    return arr
                                }
                            ],
                        }, [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'text-primary', value: '添加检查项', style: {marginLeft: 5}},
                            {type: 'click-form-row', prop: 'jianchaxiantianjia', style: {align: 'center', marginBottom: 2, marginTop: 1}}
                        ], [
                            {type: 'text-form-label', value: '是否通过', style: {flex: 1}},
                            {type: 'switch', prop: 'type'},
                            {type: 'br-form-row', style: {marginTop: 5}}
                        ], [
                            {type: 'text-form-label', value: '指定人', style: {flex: 1}},
                            {type: 'text-h5', placeholder: '请选择', prop: 'informUserList', filter: value => value.map(el => {
                                    return el.userRealName
                                }).join(',')
                            },
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'zhidinren'}
                        ], [ 
                            {type: 'text-form-label', value: '图纸位置', style: {flex: 1}},
                            {type: 'text-h5', prop: 'position', placeholder: '请选择' },
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row' , prop: 'paper'}
                        ]
                    ]}
                />
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 163, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                            if (params.value == '手动输入') {
                                this.props.navigation.push('ZL_JianChaXianTianJia', {checkTypeList: this.checkTypeList})
                            } else if (params.value == '检查项选择') {
                                this.props.navigation.push('ZL_JianChaXianXuanZe')
                            }
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '手动输入', style: {color: '#2EBBC4', marginBottom: 1}},
                            {type: 'button-pop-item', value: '检查项选择', style: {color: '#2EBBC4', marginBottom: 5}}, 
                            {type: 'button-pop-item', value: '取消', style: {color: '#898989'}}
                        ]}
                    />
                </Freedomen.SlidePop>
            </ScrollView>
        );
    }
  }