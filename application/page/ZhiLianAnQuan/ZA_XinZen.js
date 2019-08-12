import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新增质量检查',
        headerRight: <Freedomen.Region 
            event={params => { 
                Freedomen.redux({
                    za_xinzen: (data) => {
                        alert(JSON.stringify(data))
                    }
                })
            }}
            columns={[
                {type: 'button-text', value: '保存', style: {marginRight: 12}}
            ]}
        />
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {}}
                redux={'za_xinzen'}
                columns={[
                    [
                        {type: 'text-form-label', value: '项目名称'},
                        {type: 'text-h4', value: '苏州格林小镇', style: {flex: 1, alignItems: 'flex-end'}},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '日期'},
                        {type: 'text-must', value: '*'},
                        {type: 'pick-date', prop: 'd', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '检查名称'},
                        {type: 'text-must', value: '*'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '检查性质', style: {flex: 1}},
                        {type: 'text-h4', value: '公司检查'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '检查项', style: {flex: 1}},
                        {type: 'button-text-primary', value: '编辑检查项'},
                        {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                    ], {
                        type: 'views', value:[{},{}], columns: [
                            {type: 'text', value: '1. 常规水电质量检查', style: {flex: 1}},
                            {type: 'button-image-icon', value: require('../../assets/bianji.png')},
                            {type: 'br', style: {flexDirection: 'row', paddingLR: 15, backgroundColor: 'white', alignItems: 'center'}}
                        ]
                    }, [
                        {type: 'text-form-label', value: '是否通过', style: {flex: 1}},
                        {type: 'switch', prop: 's'},
                        {type: 'br-form-row', style: {marginTop: 5}}
                    ], [
                        {type: 'text-form-label', value: '指定人', style: {flex: 1}},
                        {type: 'text-h4', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [ 
                        {type: 'text-form-label', value: '图纸位置', style: {flex: 1}},
                        {type: 'text-h4', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ]
                ]}
            />
        );
    }
  }