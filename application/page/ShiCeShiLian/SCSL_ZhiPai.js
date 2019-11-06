import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
var thisParams = null, id
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '指派整改',
            headerRight: <Freedomen.Region  
                event={params => {
                    Freedomen.redux({
                        scsl_zhipai: data => {
                            Freedomen.global.api.call('/MeasureProblem/add', [{
                                ...data,
                                rectifyUserIds: data.rectifyUser.map(el => {
                                    return el.jasoUserId
                                }),
                                rectifyUser: undefined
                            }]).then(res => {
                                Freedomen.global.fn()
                                navigation.goBack()
                            })
                        }
                    })
                }}
                columns={[
                    {type: 'button-right', value: '提交'}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: {
                ...props.navigation.state.params,
                rectifyUser: props.navigation.state.params.rectifyUser || []
            }
        }
        console.log(props.navigation.state.params)
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'scsl_zhipai'}
                        data={this.state.data}
                        event={params => {
                            if (params.prop == 'xzzgr') 
                                this.props.navigation.push("CP_Users", {formName: 'scsl_zhipai', varName: 'rectifyUser', label: '选择整改人', ...this.state.data})

                            thisParams = params.row
                        }} 
                        columns={[
                            [
                                {type: 'text-h5',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label', filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.userRealName
                                        }).join(',')
                                    else return value
                                }, prop: 'rectifyUser', value: '请选择', placeholder: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'xzzgr', style: {marginBottom: 1}}
                            ], [ 
                                {type: 'text-h5', value: '爆点', style: {flex: 1}},
                                {type: 'text', prop: 'checkName'},
                                {type: 'br-form-row', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h5', value: '整改日期'},
                                {type: 'pick-date', placeholder: '请选择日期', prop: 'finishedDate', style: {flex: 1, alignItems: 'flex-end', paddingRight: 5}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-form-row', style: {marginBottom: 1}}
                            ]   
                        ]}
                    /> 
             </ScrollView> 
        );
    }
  }