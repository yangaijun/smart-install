import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建施工日志',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        sgrz_xinjian: (data) => {
                            alert(JSON.stringify(data))
                        }
                    })
                }}
                columns={[
                    {type: 'button-right', value: '发布'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        return (
            <View>
                <ScrollView>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        event={params => { 
                            if (params.value == '添加工作内容')
                                this.props.navigation.push('SGRZ_GonZuoNeiRonTianJia')
                            else if (params.value == '添加施工进度')
                                this.props.navigation.push('SGRZ_ShiGonJinDuTianJia')
                            else if (params.value == '添加生产情况')
                                this.props.navigation.push('SGRZ_ShenChanQinKuaiTianJia')
                        }}
                        redux={'sgrz_xinjian'}
                        data={{}}
                        columns={[
                            [
                                {type: 'text-form-label', value: '日期', style: {flex: 1}},
                                {type: 'pick-date', placeholder: '请选择日期'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-form-row', style: {marginBottom: 0}}
                            ], [
                                columns.SGRZ_Table,
                                {type: 'br-normal-row', style: {backgroundColor: 'white'}}
                            ], [
                                {type: 'text-form-label', value: '标段'},
                                {type: 'text-must', value: '*', style: {flex: 1}},
                                {type: 'text', value: '请选择标段'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row'}
                            ], [
                                {type: 'text-label', value: '生产情况'},
                                {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                            ], [
                                {type: 'image-form', value: require('../../assets/tianjia.png')},
                                {type: 'button-text-primary', value: '添加生产情况', style: {marginLeft: 5}},
                                {type: 'br-form-row', style: {align: 'center', marginBottom: 5}}
                            ], [
                                {type: 'text-label', value: '工作内容'},
                                {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                            ], [
                                {type: 'image-form', value: require('../../assets/tianjia.png')},
                                {type: 'button-text-primary', value: '添加工作内容', style: {marginLeft: 5}},
                                {type: 'br-form-row', prop: 'SGRZ_GonZuoNeiRonTianJia', style: {align: 'center', marginBottom: 5}}
                            ], [
                                {type: 'text-label', value: '施工进度'},
                                {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                            ], [
                                {type: 'image-form', value: require('../../assets/tianjia.png')},
                                {type: 'button-text-primary', value: '添加施工进度', style: {marginLeft: 5}},
                                {type: 'br-form-row', style: {align: 'center', marginBottom: 5}}
                            ], [
                                {type: 'text-form-label', value: '存在问题', style: {flex: 1}},
                                {type: 'text',  prop: 'start', value: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row'}
                            ], [
                                {type: 'text-form-label', value: '次日主材申请', style: {flex: 1}},
                                {type: 'text',  prop: 'start', value: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row'}
                            ], [
                                {type: 'text-form-label', value: '次日机械申请', style: {flex: 1}},
                                {type: 'text',  prop: 'start', value: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row'}
                            ], [
                                {type: 'text-form-label', value: '自检报告'},
                                {type: 'text-must', value: '*', style: {flex: 1}},
                                {type: 'text',  prop: 'start', value: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', style: {marginBottom: 5}}
                            ], [
                                {type: 'text-form-label', value: '图片'},
                                {type: 'br-form-col'}
                            ]
                        ]}
                    />
                </ScrollView> 
           </View>
        );
    }
  }