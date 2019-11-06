import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
var nowChoose = null

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: <Freedomen.Region 
                event={params => { 
                    if (nowChoose != null) {
                        let obj = {}
                        obj[navigation.state.params.formName] = (data) => {
                            data[navigation.state.params.varName] = nowChoose
                            return data
                        }
                        Freedomen.redux(obj)
                        navigation.goBack()
                    }
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    }
    //formName, label, varName
    constructor(props) {
        super(props)
        this.state = {
            list: [], 
        } 
        nowChoose = null
        this.choose = props.navigation.state.params[props.navigation.state.params.varName].map(el => {
            return el.departmentId
        })
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/Department/selectDepartmentByProjectId').then(res => {
            this.setState({
                list: res
            })
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                {
                    this.state.list.map((el, index) => {
                        return <Freedomen.Region 
                            key={index}
                            data={el}
                            event={params => {
                                if (params.prop == 'checkbox') {
                                    let arr = nowChoose || this.props.navigation.state.params[this.props.navigation.state.params.varName]
                                    if (params.value) { 
                                        if (arr.filter(el => {
                                            return el.departmentId == params.row.departmentId
                                        }).length == 0)
                                            arr.push(params.row)
                                    } else {
                                        arr = arr.filter(el => {
                                            return el.departmentId != params.row.departmentId
                                        })
                                    }
                                    nowChoose = arr
                                }
                            }}
                            columns={[
                                {type: 'checkbox', prop: 'checkbox', value: this.choose.includes(el.departmentId), checked: require('../../assets/check.png'), unCheck: require('../../assets/uncheck.png'), style: {paddingRight: 15}},
                                {type: 'text-h4', prop: 'departmentName'},
                                {type: 'br-form-row'}
                            ]}
                        />
                    })
                }    
            </ScrollView>
        );
    }
  }