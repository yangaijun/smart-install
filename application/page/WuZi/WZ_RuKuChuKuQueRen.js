import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import valid from '../../region/validations'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.logType === 0 ? '入库:确认信息' : '出库:确认信息',
        headerRight: <Freedomen.Region 
            event={params => {
                const submit = function(param) { 
 
                    Freedomen.global.api.call('/MaterialLog/add', {
                        ...param,
                        log: {
                            ...param,
                            materialLogs: undefined,
                            projectId: Freedomen.global.project.projectId
                        },
                        materialList: param.materialLogs 
                    }).then(res => {
                        Freedomen.redux({
                            rkck_bar: (data) => {
                                data.count = 0
                                return data
                            }
                        })
                        Freedomen.global.toast((navigation.state.params.logType === 0 ? '入库': '出库') + ' 成功')
                        navigation.goBack()
                    }) 
                }
                if (navigation.state.params.logType === 0) {
                    Freedomen.redux({
                        wz_rkck_queren: (data) => {
                            if (valid(data, 'WZ_RKQueRen')) {
                                submit(data)
                            }
                            return data
                        }
                    })
                } else {
                    Freedomen.redux({
                        wz_rkck_queren: (data) => {
                            if (valid(data, 'WZ_CKWueRen')) {
                                submit(data)
                            }
                            return data
                        }
                    })
                }
            }}
            columns={[
                {type: 'button-text', value: '保存', style: {marginRight: 12}}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: {
                logType: this.props.navigation.state.params.logType,
                materialLogs: this.props.navigation.state.params.WZ
            }
        } 
    }
    componentDidMount() {
        // Freedomen.global.api.call('/JasoUser/getListByProjectId').then(res => {
        //     console.log(res)
        // })
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                data={this.state.data}
                event={params => {
                    if (params.prop == 'user')
                        this.props.navigation.push('UserList', {label: '选择领取人', formName: 'wz_rkck_queren'});
                }}
                redux={'wz_rkck_queren'}
                columns={[
                    [
                        {type: 'text-form-label', value: '日期：', style: {flex: 1}},
                        {type: 'pick-date', prop: 'createTime', placeholder: '请选择日期'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '领取人:'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text-h5', prop: 'user', value: '请选择', filter: value => value.userRealName || value},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'user', load: (value, data) => data.logType === 1}
                    ], 
                    {type: 'text-valid-message', prop: 'user-valid', load: value => value}, 
                    [
                        {type: 'text-form-label', value: '物资来源:'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'select', prop: 'materialFrom', options: '供应采购,零星采购,甲供,调拨入库,其他', placeholder: '请选择来源', style: {width: 145, height: 42}},
                        {type: 'br-form-row',  load: (value, data) => data.logType === 0}
                    ],
                    {type: 'text-valid-message', prop: 'materialFrom-valid', load: value => value}, 
                    [
                        {type: 'text-form-label', value: '备注:', style: {flex: 1}},
                        {type: 'input-text-form', prop: 'remark', placeholder: '请输入备注'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'text-label',  filter: (value, data) =>  data.logType ===0  ? `本次入库物资: ${data.materialLogs.length}项` : `本次出库物资: ${data.materialLogs.length}项`, style: {padding: 12, align: 'center'}},
                    {type: 'views', prop: 'materialLogs',  columns: [
                        [
                            {type: 'text-form-label', prop: 'materialName', style: {flex: 1}},
                            {type: 'text-form-label', prop: 'currentInputNum'},
                            {type: 'text-form-label', prop: 'materialUnit'},
                            {type: 'br-normal-row'}
                        ],
                        {type: 'text', prop: 'price', filter: (value, data) => `￥${value} /${data.materialUnit}`, load: value => this.state.data.logType === 0, style: {alignItems: 'flex-end', paddingTop: 5} },
                        {type: 'br-form-col'}
                    ]}
                ]}
            />
        );
    }
  }