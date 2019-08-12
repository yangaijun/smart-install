import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, ScrollView} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '机械进场详情' ,
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
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        columns={[
                            [
                                [
                                    [
                                        {type: 'text-primary', value: '进场', style: {backgroundColor: '#EFFAFA', padding: 2, paddingLR: 8, marginRight: 10}},
                                        {type: 'text-form-label', value: '2019-07-01 09:36'},
                                        {type: 'text-label', value: '进场人'},
                                        {type: 'br-normal-row', style: {marginBottom: 8}}
                                    ], [
                                        {type: 'text-must', value: '退场', style: {backgroundColor: '#FFF3F4', padding: 2, paddingLR: 8, marginRight: 10}},
                                        {type: 'text-form-label', value: '2019-07-01 09:36'},
                                        {type: 'text-label', value: '进场人'},
                                        {type: 'br-normal-row'}
                                    ],
                                    {type: 'br', style: {flex: 1}}
                                ],
                                {type: 'button', value: '退场', style: {color: '#FF6B73', borderColor: '#FF6B73', borderWidth: 1, padding: 2, paddingLR: 15, borderRadius: 2}},
                                {type: 'br-form-row', style: {marginBottom: 10}}
                            ], [
                                {type: 'text-label', value: '编号：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-label', value: '名称：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-label', value: '规格型号：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-label', value: '备注：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row', style: {marginBottom: 10}}
                            ], [
                                {type: 'text-label', value: '来源：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-label', value: '数量：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-label', value: '单价：', style: {width: 100}},
                                {type: 'text-h5', value: 'F202-620'},
                                {type: 'br-form-row'}
                            ] 
                        ]}
                    />
                </ScrollView>
                <Freedomen.Region 
                    style={{height: 52}}
                    columns={[
                        [
                            {type: 'image-icon', value: require('../../assets/shanchu.png')},
                            {type: 'text-must', value: '删除'},
                            {type: 'click', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                        ], [
                            {type: 'image-icon', value: require('../../assets/bianji.png')},
                            {type: 'text-primary', value: '编辑'},
                            {type: 'click', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                        ],
                        {type: 'br', style: {flexDirection: 'row', backgroundColor: 'white'}}
                    ]}
                />
            </View>
        );
    }
  }