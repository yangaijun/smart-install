import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '指派整改',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        zl_zhipai: data => {
                            Freedomen.global.api.call(Freedomen.global.ZHILIAN ? '/QualityCheck/send' : '/SecurityCheck/send', data).then(res => {
                                Freedomen.global.fn()
                                navigation.goBack()
                            })
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '提交', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = { 
            data: {...props.navigation.state.params, rectifyUserList: [], participantsList: [], state: 1}
        }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'zhengairen') {
                        this.props.navigation.push('CP_Users', {formName: 'zl_zhipai', label: '整改人', varName: 'rectifyUserList', ...params.row})
                    } else if (params.prop == 'canyuren') {
                        this.props.navigation.push('CP_Users', {formName: 'zl_zhipai', label: '参与人', varName: 'participantsList', ...params.row})
                    }
                }}
                data={this.state.data}
                redux={'zl_zhipai'}
                columns={[
                    [
                        {type: 'text-form-label', value: '整改人'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text', placeholder: '请选择', prop: 'rectifyUserList', filter: value => value.map(el => {
                            return el.userRealName
                        }).join(',')},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'zhengairen'}
                    ], [
                        {type: 'text-form-label', value: '检查名称：', style: {flex: 1}},
                        {type: 'text', prop: 'qualityCheckName', value: '天理何在'},
                        {type: 'br-form-row', load: () => Freedomen.global.ZHILIAN}
                    ], 
                    [
                        {type: 'text-form-label', value: '检查名称：', style: {flex: 1}},
                        {type: 'text', prop: 'securityCheckName', value: '天理何在'},
                        {type: 'br-form-row', load: () => !Freedomen.global.ZHILIAN}
                    ], 
                    [
                        {type: 'text-form-label', value: '截止日期'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'pick-date', prop: 'finishedDate',  placeholder: '请选择截止日期'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ],  [
                        {type: 'text-form-label', value: '参与人', style: {flex: 1}},
                        {type: 'text', placeholder: '请选择', prop: 'participantsList', filter: value => value.map(el => {
                            return el.userRealName
                        }).join(',')},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'canyuren'}
                    ], [
                        {type: 'text-form-label', value: '重要程度', style: {flex: 1}},
                        {type: 'select', value: '请选择', prop: 'state', options: {1: '一般', 2: '重要', 3: '紧急'}, style: {width: 100, height: 40}},
                        {type: 'br-form-row'}
                    ]
                ]}
            />
        );
    }
  }