import React from 'react'
import {ScrollView, Alert, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import store from 'react-native-freedomen/store';

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '过滤入口',
            headerRight: <Freedomen.Region 
                style={{flex: 1, align: 'center', paddingRight: 10}}
                event={params => {  
                    Freedomen.redux({
                        page_content: data => { 

                            console.log(data, {
                                measureScreenLogId: data.measureScreenLogId,
                                measureScreenLogName: data.measureScreenLogName,
                                jasoUserId: data.jasoUserId,
                                measureSiteId: data.measureSiteId,
                                projectCheckTypeId: data.jianchaxian.map(el => {
                                    return el.projectCheckTypeId
                                }).join(',')
                            })
                            Freedomen.global.api.call('MeasureScreenLog/add', {
                                measureScreenLogId: data.measureScreenLogId,
                                measureScreenLogName: data.measureScreenLogName,
                                jasoUserId: data.jasoUserId,
                                measureSiteId: data.measureSiteId,
                                projectCheckTypeId: data.jianchaxian.map(el => {
                                    return el.projectCheckTypeId
                                }).join(',')
                            }).then(res => {
                                Freedomen.global.fn && Freedomen.global.fn()
                                navigation.goBack()
                            })
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '保存'}
                ]}
            />
      }
    }
    constructor(props) {
        super(props) 
        this.state = {
            data: this.props.navigation.state.params,
            columns: [
                {type: 'input-text',  placeholder: '输入过虑器入口名称', prop: 'measureScreenLogName', style: {padding: 10, backgroundColor: 'white'}},
                [ 
                    {type: 'text-h4',  value: '测区类型', style: {backgroundColor: 'white', marginTop: 1,paddingTB: 10, borderTopWidth: 1, borderTopColor: '#f5f5f5'}},
                    {type: 'select', prop: 'measureSiteId', options:  '', placeholder: '请选择测区类型', style: {marginLeft: 8}},
                    {type: 'text-h4',  value: '检查项', style: {backgroundColor: 'white', marginTop: 1,paddingTB: 10, borderTopWidth: 1, borderTopColor: '#f5f5f5'}},
                    {type: 'views', prop: 'jianchaxian',  style: {backgroundColor: 'white', paddingLeft: 20, paddingBottom: 10}, value:[{}], columns: [
                        {type: 'checkbox', prop: 'b', value: false, unCheck: require('../../assets/uncheck.png'), checked: require('../../assets/check.png')},
                        {type: 'text-h5', prop: 'checkName', value: '--', style: {paddingLeft: 15}},
                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 5}}
                    ]},
                    {type: 'br', style: {backgroundColor: 'white', paddingLR: 10}}
                ]
            ]
        }  
    }
    componentDidMount() {  
        store.get('checkTypeList').then(res => { 
            Freedomen.global.api.call('MeasureSite/selectList', {siteType: 1, checkedStatus: 1}).then(res2 => {
                let options = {}
                res2.map(el => { 
                    options[el.measureSiteId + ''] = el.measureSiteName
                })
                this.state.columns[1][1].options = options

                this.setState({
                    data: { 
                        ...this.state.data,
                        jianchaxian: res
                    }
                })
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, paddingTop: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}> 
                    <Freedomen.Region 
                        style={{flex: 1, backgroundColor: '#f5f5f5'}}
                        data={this.state.data}
                        redux={'page_content'}
                        event={params => { 
                           
                        }}
                        columns={this.state.columns}
                    /> 
                </ScrollView>{
                    this.props.navigation.state.params.measureScreenLogId && <Freedomen.Region
                    style={{height: 52, backgroundColor: 'white'}}
                    event={params => {
                        Alert.alert('提示', '确认删除入口？', [{text: '确认', onPress: () => {
                            Freedomen.global.api.call('MeasureScreenLog/delete', [this.state.data]).then(el => {
                                Freedomen.global.fn && Freedomen.global.fn()
                                this.props.navigation.goBack()
                            })
                            }}, {text: '取消'}])
                    }}
                    columns={[
                        {type: 'button-text', value: '删除入口', style: {color: 'red', height: 52, align: 'center'}}
                    ]} />
                }
            </View>
        );
    }
  }