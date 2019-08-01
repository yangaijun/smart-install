import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新建入库物资',
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text', value: '保存', style: {marginRight: 12}}
            ]}
        />
    }
    constructor(props) {
        super(props)
        this.state = { }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { }}
                columns={[
                    [
                        {type: 'text-form-label', value: '物资编码', style: {flex: 1}},
                        {type: 'text', value: 'hh'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '物资名称', style: {flex: 1}},
                        {type: 'input-text', prop: 'd', placeholder: '请输入物资名称'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '分类'},
                        {type: 'text-must', value: '*',style: {flex: 1}}, 
                        {type: 'text', value: '必填'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '规格型号', style: {flex: 1}},
                        {type: 'text', value: 'hh'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-h4', value: '单位', style: {flex: 1}},
                        {type: 'input-text', prop: 'dw', placeholder: '请输入单位(必填)'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-h4', value: '入库数量', style: {flex: 1}},
                        {type: 'input-text', prop: 'dw',  placeholder: '请输入入库数量(必填)'},
                        {type: 'br-form-row'}
                    ], [ 
                        {type: 'text-h4', value: '单价', style: {flex: 1}},
                        {type: 'input-text', prop: 'dw', placeholder: '请输入单价(元)'},
                        {type: 'br-form-row'}
                    ], [ 
                        {type: 'text-h4', value: '备注', style: {flex: 1}},
                        {type: 'input-text', prop: 'bz', placeholder: '请输入备注'},
                        {type: 'br-form-row'}
                    ], [ 
                        {type: 'text-h4', value: '是否常用', style: {flex: 1}},
                        {type: 'switch', prop: 'cy', value: false},
                        {type: 'br-form-row'}
                    ]
                ]}
            />
        );
    }
  }