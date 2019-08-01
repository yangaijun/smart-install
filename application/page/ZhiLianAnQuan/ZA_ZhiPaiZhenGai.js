import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '指派整改',
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text', value: '提交', style: {marginRight: 12}}
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
                        {type: 'text-form-label', value: '整改人'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '检查名称：', style: {flex: 1}},
                        {type: 'text', value: '天理何在'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '截止日期'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'pick-date', prop: 'zdp',  placeholder: '请选择截止日期'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ],  [
                        {type: 'text-form-label', value: '参与人', style: {flex: 1}},
                        {type: 'text', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '重要程度', style: {flex: 1}},
                        {type: 'select', value: '请选择', prop: 'zp', options: '一般,重要', style: {width: 100, height: 40}},
                        {type: 'br-form-row'}
                    ]
                ]}
            />
        );
    }
  }