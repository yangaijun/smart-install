import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
var nowChoose = null

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新增参与人',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.global.tianjiacanyuren && Freedomen.global.tianjiacanyuren(nowChoose)
                    navigation.goBack()
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
        this.choose =  props.navigation.state.params.list || []
        nowChoose = []
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        console.log( this.props.navigation.state.params)
        Freedomen.global.api.call('/JasoUser/getListByProjectId', {projectId: this.props.navigation.state.params.projectId}).then(res => {
            let list = res.filter(res => {
                if (!this.choose.find(item => item.jasoUserId == res.jasoUserId))
                    return res
            })
            this.setState({
                list: list
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
                                    let arr = nowChoose
                                    if (params.value) {
                                        if (arr.filter(el => {
                                            return el.jasoUserId == params.row.jasoUserId
                                        }).length == 0)
                                            arr.push(params.row)
                                    } else {
                                        arr = arr.filter(el => {
                                            return el.jasoUserId != params.row.jasoUserId
                                        })
                                    }
                                    nowChoose = arr
                                }
                            }}
                            columns={[
                                {type: 'checkbox', prop: 'checkbox', value: nowChoose.includes(el.jasoUserId), checked: require('../../assets/check.png'), unCheck: require('../../assets/uncheck.png'), style: {paddingRight: 15}},
                                {type: 'text-h4', prop: 'userRealName'},
                                {type: 'br-form-row'}
                            ]}
                        />
                    })
                }    
            </ScrollView>
        );
    }
  }