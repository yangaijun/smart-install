import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, ScrollView} from 'react-native' 
var choose = []
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '选择检查项',
            headerRight: <Freedomen.Region 
                event={params => { 
                    if (choose.length) {
                        Freedomen.redux({
                            zl_xinzen: data => {
                                choose.map(el => {
                                    data.checkTypeList.push({
                                        name: el
                                    })
                                }) 
                                return data
                            }
                        })
                        navigation.goBack()
                    }
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            /> 
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [] 
        }

        this.params = {
            checkType: Freedomen.global.ZHILIAN ? 2 : 3,
            pageVo: {
                pageNo: 1,
                pageSize: 1000
            }
        }
        choose = []
    }
    componentDidMount() {  
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/ProjectCheckType/select', this.params).then(res => {
            console.log(res)
            this.setState({
                list: res.data
            })
        })
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                {
                    this.state.list.map((el, index) => {
                        return <Freedomen.Region 
                            data={el}
                            key={index}
                            event={params => {
                                if (params.prop == 'checkbox') {
                                    if (params.value) {
                                        choose.push(params.row.checkName)
                                    } else {
                                        let index = choose.indexOf(params.row.checkName)
                                        if (index != -1) {
                                            choose.splice(index, 1)
                                        }
                                    } 
                                }
                            }}
                            columns={[
                                {type: 'checkbox', prop: 'checkbox', value: choose.includes(el.checkName), checked: require('../../assets/check.png'), unCheck: require('../../assets/uncheck.png'), style: {paddingRight: 15}},
                                {type: 'text-h4', prop: 'checkName'},
                                {type: 'br-form-row'}
                            ]}
                        />
                    })
                }
            </ScrollView>
        );
    }
  }