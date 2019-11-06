import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Dimensions} from 'react-native' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新增质量检查',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        za_xinzen: (data) => {
                            alert(JSON.stringify(data))
                            Freedomen.global.api.call('/QualityCheck/add', data).then(res => {
                                navigation.goBack()
                            })
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
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    data={{informUserList: [], checkTypeList: []}}
                    event={params => {
                        if (params.prop == 'paper') {
                            this.props.navigation.push('CP_Paper', {router: 'ZA_XinZen', form: 'za_xinzen'})
                        } else if (params.prop == 'jianchaxinzhi') {
                            this.props.navigation.push('CP_JianChaXinZhi', {formName: 'za_xinzen', label: '检查性质', ...params.row})
                        } else if (params.prop == 'zhidinren') {
                            this.props.navigation.push('CP_Users', {formName: 'za_xinzen', label: '指定人', varName: 'informUserList', ...params.row})
                        } else if (params.prop == 'jianchaxiantianjia') {
                            this.checkTypeList = params.row.checkTypeList
                            slidePop.show()
                        } else if (params.value && params.value.prop == 'bianji') {
                            this.props.navigation.push('ZA_JianChaJieGuo', params.value.row)
                        }
                    }}
                    redux={'za_xinzen'}
                    columns={[
                        // [
                        //     {type: 'text-form-label', value: '项目名称'},
                        //     {type: 'text-h5', value: '苏州格林小镇', style: {flex: 1, alignItems: 'flex-end'}},
                        //     {type: 'br-form-row'}
                        // ], 
                        [
                            {type: 'text-form-label', value: '日期'},
                            {type: 'text-must', value: '*'},
                            {type: 'pick-date', prop: 'startDate', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '检查名称'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'input-text-form', prop: 'a', placeholder: '请输入检查名称'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '检查性质', style: {flex: 1}},
                            {type: 'text-h5', prop: 'natureName', placeholder: '请选择检查性质'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'jianchaxinzhi'}
                        ], [
                            {type: 'text-form-label', value: '检查项', style: {flex: 1}},
                            {type: 'button-text-primary', value: '编辑检查项'},
                            {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                        ], {
                            type: 'views', prop: 'checkTypeList', value:[], columns: [
                                {type: 'text', prop: 'name', filter: (value, data) => {
                                    return data.$index + 1 + '.  ' + value
                                }, style: {flex: 1}},
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'br', style: {flexDirection: 'row', paddingLR: 15, backgroundColor: 'white', alignItems: 'center'}}
                            ],
                        }, 
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'text-primary', value: '添加检查项', style: {marginLeft: 5}},
                            {type: 'click-form-row', prop: 'jianchaxiantianjia', style: {align: 'center', marginBottom: 2, marginTop: 1}}
                        ], 
                        [
                            {type: 'text-form-label', value: '是否通过', style: {flex: 1}},
                            {type: 'switch', prop: 's'},
                            {type: 'br-form-row', style: {marginTop: 5}}
                        ], [
                            {type: 'text-form-label', value: '指定人'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text-h5', placeholder: '请选择', prop: 'informUserList', filter: value => value.map(el => {
                                return el.userRealName
                            }).join(',')},
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
                                this.props.navigation.push('ZA_JianChaXianTianJia', {checkTypeList: this.checkTypeList})
                            }
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '手动输入', style: {color: '#2EBBC4', marginBottom: 1}},
                            {type: 'button-pop-item', value: '检查项选择', style: {color: '#2EBBC4', marginBottom: 5}}, 
                            {type: 'button-pop-item', value: '取消', style: {color: '#898989'}}
                        ]}
                    />
                </Freedomen.SlidePop>
            </View>
        );
    }
  }