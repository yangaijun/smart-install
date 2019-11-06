import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import valid from '../../region/validations.js'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.logType === 0 ? '新建入库物资' : '新建出库物资',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        wz_xinjian: (data) => {
                            if (valid(data, 'WZ_XinJian')) {
                                Freedomen.redux({
                                    rkck_bar: data => {
                                        data.count ? data.count ++ : data.count = 1
                                        return data
                                    }
                                })
                                Freedomen.global.fn && Freedomen.global.fn(data)
                                navigation.goBack()
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
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'fenlei') {
                        this.props.navigation.push('WZ_FenLeiXuanZe', params.row)
                    }
                }}
                redux={'wz_xinjian'}
                columns={[
                    [
                        {type: 'text-form-label', value: '物资编码', style: {flex: 1}},
                        {type: 'input-text-form', prop: 'materialCode', placeholder: '请输入物资编码'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '物资名称'},
                        {type: 'text-form-must', value: '*'}, 
                        {type: 'input-text-form', prop: 'materialName', placeholder: '请输入物资名称'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'text-valid-message', prop: 'materialName-valid', load: value => value}, 
                    [
                        {type: 'text-form-label', value: '分类'},
                        {type: 'text-form-must', value: '*'}, 
                        {type: 'text-h5', prop: 'materialTypeName', placeholder: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'fenlei'}
                    ],
                    {type: 'text-valid-message', prop: 'materialTypeName-valid', load: value => value}, 
                    [
                        {type: 'text-form-label', value: '规格型号', style: {flex: 1}},
                        {type: 'input-text-form', prop: 'materialSize', placeholder: '请输入物资名称'},
                        {type: 'br-form-row'}
                    ], 
                    {type: 'text-valid-message', prop: 'materialSize-valid', load: value => value}, 
                    [
                        {type: 'text-h4', value: '单位'},
                        {type: 'text-form-must', value: '*'}, 
                        {type: 'input-text-form', prop: 'materialUnit', placeholder: '请输入单位'},
                        {type: 'br-form-row'}
                    ], 
                    {type: 'text-valid-message', prop: 'materialUnit-valid', load: value => value}, 
                    [
                        {type: 'text-h4', value: '入库数量', filter: value => this.props.navigation.state.params.logType === 0 ? '入库数量' : '出库数量'},
                        {type: 'text-form-must', value: '*'}, 
                        {type: 'input-text-form', prop: 'putNum',  placeholder: '请输入入库数量(必填)'},
                        {type: 'br-form-row'}
                    ], 
                    {type: 'text-valid-message', prop: 'putNum-valid', load: value => value}, 
                    [ 
                        {type: 'text-h4', value: '单价', style: {flex: 1}},
                        {type: 'input-text-form', prop: 'price', placeholder: '请输入单价(元)'},
                        {type: 'br-form-row'}
                    ], 
                    {type: 'text-valid-message', prop: 'price-valid', load: value => value}, 
                    [ 
                        {type: 'text-h4', value: '备注', style: {flex: 1}},
                        {type: 'input-text-form', prop: 'remark', placeholder: '请输入备注'},
                        {type: 'br-form-row'}
                    ], [ 
                        {type: 'text-h4', value: '是否常用', style: {flex: 1}},
                        {type: 'switch', prop: 'isCommon', value: false},
                        {type: 'br-form-row'}
                    ]
                ]}
            />
        );
    }
  }