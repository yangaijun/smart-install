import React from 'react'
import Freedomen from 'react-native-freedomen'  
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建任务',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        gz_xinjian: (data) => {
                            alert(JSON.stringify(data))
                            if (!data.jh) {
                                data.v_jh = '请输入任务描述'
                                return data
                            } else {
                                data.v_jh = ''
                                return data
                            }
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
            list: []
        }
    }
    componentDidMount() { }
    render() {
        return (
            <Freedomen.Region 
                style={{flex: 1, backgroundColor: '#f5f5f5'}}
                redux={'gz_xinjian'}
                columns={[
                    [
                        {type: 'text-form-label', value: '项目', style: {flex: 1}},
                        {type: 'text', value: '什么什么项目'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '任务标题'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'input-text', prop: 'jh', placeholder: '请输入任务标题', style: {alignItems: 'flex-end'}},
                        {type: 'text-must', prop: 'v_jh'},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '任务描述'},
                        {type: 'input-area-form', prop: 'j3h', placeholder: '请输入任务描述', maxLength: 500},
                        {type: 'br-form-col'}
                    ],  [
                        {type: 'text-form-label', value: '日期'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'pick-date', prop: 'ddd3', placeholder: '请选择日期'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '执行人'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '重要程度', style: {flex: 1}},
                        {type: 'select', prop: 'c', options: '一般,重要', style: {width: 120, height: 42}},
                        {type: 'br-form-row'}
                    ]
                ]}
            />
        );
    }
}