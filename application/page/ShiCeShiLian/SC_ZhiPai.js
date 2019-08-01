import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
var thisParams = null, id
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '指派整改',
            headerRight: <Freedomen.Region 
                style={{flex: 1, align: 'center', paddingRight: 10}}
                event={params => {
                    if (thisParams == null) {
                        alert('请正确输入')
                        return
                    } 
                    let p = {
                        id: id,
                        fDate: thisParams.fDate,
                        rectifyUser: thisParams.zgr.map(el => {
                            return el.id
                        }).join(',')
                    }
                    let formData = new FormData()
                    formData.append('id', p.id)
                    formData.append('fDate', p.createDate)
                    formData.append('rectifyUser', p.rectifyUser)
                    Freedomen.global.api.postForm('api/measuredProblem/updateMeasuredProblem', formData).then(res => {
                        Freedomen.global.fn()
                        navigation.goBack()
                    }) 
                }}
                columns={[
                    {type: 'button-text', value: '提交'}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        let data = props.navigation.state.params
        if (data.rectifyUser) {
            let rectifyUserNames = data.rectifyUserNames
            let zgr = data.rectifyUser.split(',').map((el, index) => {
                return {
                    id: el,
                    realName: rectifyUserNames[index]
                }
            })
            data.zgr = zgr
        }
        this.state = {
            data: data
        }
        id = data.id
        console.log(props.navigation.state.params)
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'wt_data'}
                        event={params => {
                            if (params.prop == 'xzzgr') 
                                this.props.navigation.push("ZhenGaiRen", params.row.zgr)

                            thisParams = params.row
                        }}
                        data={this.state.data}
                        columns={[
                            [
                                {type: 'text-h4',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label', filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.realName
                                        }).join(',')
                                    else return value
                                }, prop: 'zgr', value: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'xzzgr', style: {marginBottom: 1}}
                            ], [ 
                                {type: 'text-h4', value: '爆点', style: {flex: 1}},
                                {type: 'text', prop: 'title'},
                                {type: 'br-form-row', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h4', value: '整改期限',},
                                {type: 'pick-date', placeholder: '请选择日期', prop: 'createDate', style: {flex: 1, alignItems: 'flex-end', paddingRight: 5}},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-form-row', style: {marginBottom: 1}}
                            ],  
                        ]}
                    /> 
             </ScrollView> 
        );
    }
  }