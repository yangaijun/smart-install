import React from 'react'
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '筛选',
        headerRight: <Freedomen.Region 
            event={params => { 
                Freedomen.redux({
                    form_shaixuan: {
                        wcks: '',wcjs: '',cjks: '',cjjs:''
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
        this.state = { }
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
                            {type: 'text-form-label', value: '项目', style: {flex: 1}},
                            {type: 'text-h5', value: 'XXX项目'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '创建日期'},
                            [
                                {type: 'text', value: '开始日期', style: {flex: 1}},
                                {type: 'pick-date', prop: 'cjks', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', borderBottomColor: '#f5f5f5', borderBottomWidth: 1, paddingTB: 12}}
                            ], [
                                {type: 'text', value: '结束日期', style: {flex: 1}},
                                {type: 'pick-date', prop: 'cjjs', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 12}}
                            ],
                            {type: 'br-form-col'}
                        ], [
                            {type: 'text-form-label', value: '完成日期'},
                            [
                                {type: 'text', value: '开始日期', style: {flex: 1}},
                                {type: 'pick-date', prop: 'wcks', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', borderBottomColor: '#f5f5f5', borderBottomWidth: 1, paddingTB: 12}}
                            ], [
                                {type: 'text', value: '结束日期', style: {flex: 1}},
                                {type: 'pick-date', prop: 'wcjs', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 12}}
                            ],
                            {type: 'br-form-col'}
                        ], [
                            {type: 'text-form-label', value: '工作状态', style: {flex: 1}},
                            {type: 'text', value: '请选择'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row'}
                        ], [
                            {type: 'button-primary', value: '确定', style: {width: '55', borderRadius: 28}},
                            {type: 'br', style: {backgroundColor: 'white', align: 'center', paddingTop: 25}}
                        ]
                        
                    ]}
                />
        );
    }
  }