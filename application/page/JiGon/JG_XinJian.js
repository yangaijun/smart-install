import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Alert} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        jg_xinjian: data => {
                            if (data.list.length === 0) {
                                Alert.alert('提示', '请添加工人', [{text: '确定'}])
                            } else { 
                                Freedomen.global.api.call('/AppWokerPoint/insertOrUpdate', {
                                    ...data,
                                    workpointRecords: data.list,
                                    list: undefined
                                }).then(res => {
                                    navigation.navigate('JG_Home')
                                })
                            }
                        }
                    })   
                }}
                columns={[
                    {type: 'button-right', prop: 'save', value: '保存'},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            data: {...props.navigation.state.params.row.record, workpointDate: props.navigation.state.params.row.date, list: props.navigation.state.params.list || []}
        }
    }
    componentDidMount() {   
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {
                    if (params.value && params.value.prop == 'delete') { 
                        Freedomen.redux({
                            jg_xinjian: data=> {
                                data.list.splice(params.value.$index, 1)
                                return data
                            }
                        })
                    } else if (params.prop == 'tianjia') {
                        this.props.navigation.push('CP_Worker', {label: '选择工人', formName: 'jg_xinjian', ...params.row})
                    }
                }}
                data={this.state.data}
                redux={'jg_xinjian'}
                columns={[
                    [
                        {type: 'text-form-label', value: '清单', style: {marginRight: 10}},
                        {type: 'text-form-label', prop: 'workpointDate'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'views', prop: 'list', value: [], columns: [
                        {type: 'image-form', value: require('../../assets/check.png'), style: {marginRight: 5}},
                        {type: 'text-form-label', prop: 'workerName', style: {flex: 1}},
                        {type: 'counter', prop: 'workpointRecordHour', value: 0},
                        {type: 'text-h5', value: '小时', style: {paddingLR: 10}},
                        {type: 'button-image-icon', prop: 'delete', value: require('../../assets/clear.png')},
                        {type: 'br-form-row'}
                    ]}, [
                        {type: 'image-form', value: require('../../assets/tianjia.png'), style: {marginRight: 8}},
                        {type: 'text-primary', value: '添加项目工人'},
                        {type: 'click-form-row', prop: 'tianjia', style: {align: 'center'}}
                    ]
                    
                ]}
            /> 
        );
    }
  }