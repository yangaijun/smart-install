import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns'
const Search = columns.CK_Search('请输入名称、规格', 'name')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.label,
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('WZ_XinJian')
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
            list: [],
            activityId: 1,
            activity: 'full',
            kinds: {kinds:[{kind: '全部分类'}, {kind: '分类1'}, {kind: '分类2'}, {kind: '分类3'}]}
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 600);
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                columns={[
                    [
                        {type: 'text-form-label', value: '日期：', style: {flex: 1}},
                        {type: 'pick-date', placeholder: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'br-form-row'}
                    ], [
                        {type: 'text-form-label', value: '领取人:'},
                        {type: 'text-must', value: '*', style: {flex: 1}},
                        {type: 'pick-date', placeholder: '请选择'},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ], [
                        {type: 'text-form-label', value: '备注:', style: {flex: 1}},
                        {type: 'input-text', prop: 'bz', placeholder: '请输入备注'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'text', value: '本次入库物资', style: {padding: 12, align: 'center'}},
                    {type: 'views', value: [{}, {}], columns: [
                        {type: 'text-form-label', value: '螺丝', style: {flex: 1}},
                        {type: 'text-form-label', value: 2, filter: value => `${value}个`},
                        {type: 'br-form-row'}
                    ]}
                ]}
            />
        );
    }
  }