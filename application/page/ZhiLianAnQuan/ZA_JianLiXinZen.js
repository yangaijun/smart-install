import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新建奖励',
        headerRight: <Freedomen.Region 
            event={params => { 
                Freedomen.redux({
                    za_jianlixinzen: (data) => {
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
                event={params => { 

                }}
                redux={'za_jianlixinzen'}
                columns={[
                    [
                        {type: 'text-form-label', value: '奖励事由'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text-h4', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '日期'},
                        {type: 'text-must', value: '*'},
                        {type: 'pick-date', prop: 'd', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '受奖人'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'text-h4', value: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '奖励金额'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'input-text', prop:'dd', placeholder: '请输入金额', style: {alignItems: 'flex-end'}},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '备注'}, 
                        {type: 'input-area-form', prop:　'ar', maxLength: 200},
                        {type: 'br-form-col'}
                    ]
                ]}
            />
        );
    }
  }