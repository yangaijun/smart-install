import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '筛选',
        headerRight: <Freedomen.Region 
            event={params => { 
                Freedomen.redux({
                    form_shaixuan: {
                        cd: '',dad: '',dd: ''
                    }
                })
            }}
            columns={[
                {type: 'button-text', value: '重置', style: {marginRight: 12}}
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
                    event={params => { 
                        
                    }}
                    redux={'form_shaixuan'}
                    columns={[
                        [
                            {type: 'text-form-label', value: '检查状态'},
                            {type: 'tags', prop: 'cd', options: {1: '通过', 2: '不通过'}, style: {marginTB: 8}},
                            {type: 'br-form-col'}
                        ], [
                            {type: 'text-form-label', value: '开始日期'},
                            {type: 'pick-date', prop: 'dd', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '结束日期'},
                            {type: 'pick-date', prop: 'dad', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '选择性质'},
                            {type: 'tags',prop: 'e', options: {1: '公司检查', 2: '季度检查'}, style: {marginTB: 8}},
                            {type: 'br-form-col'}
                        ], [
                            {type: 'text-form-label', value: '发送状态'},
                            {type: 'tags',prop: 'ee', options: {1: '待指派', 2: '进行中', 3: '审核中', 4: '已完成'}, style: {marginTB: 8}},
                            {type: 'br-form-col'}
                        ], [
                            {type: 'button-primary', value: '确定', style: {width: '55', borderRadius: 28}},
                            {type: 'br', style: {backgroundColor: 'white', align: 'center', paddingTop: 25}}
                        ]
                        
                    ]}
                />
        );
    }
  }