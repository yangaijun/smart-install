import React from 'react'
import {Text, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'
var choose = [], _data = null, zp = []
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '整改人',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({ 
                            'wt_data': (oldInfo) => {
                                oldInfo.zgr = choose
                                return oldInfo
                            }
                        })
                    if (_data)  {
                        Freedomen.global.api.post('api/measuredProblem/measuredProblemAddUser', {
                            projectId:  Freedomen.global.project.projectId,
                            measuredProblemId: _data.id,
                            aboutIds: choose.map(el => {
                                return el.id
                            }).join(',')
                        }) 
                    } else if (zp.length && choose.length) {
                        let ids = choose.map(el => {
                            return el.id
                        }).join(',')

                        let strs = zp.map(el => {
                            return {
                                id: el.id,
                                rectifyUserId: ids
                            }
                        }) 
                       console.log(JSON.stringify(strs) )
                        Freedomen.global.api.post('api/measuredProblem/updateMeasuredProblemList', {
                            editString: JSON.stringify(strs) 
                        }).then(res => { 
                            Freedomen.global.fn()

                        }) 
                    }
                    navigation.goBack()
                }}
                style={{flex: 1, align: 'center', paddingRight: 10}}
                columns={[
                    {type: 'button-text', value: '确定'}
                ]}
            />
        }
    }
    constructor(props) {
        choose = []  
        super(props)
        this.state = {
            list: []
        } 
        
        if (Array.isArray(props.navigation.state.params))  {
            choose = props.navigation.state.params
        } else if (typeof props.navigation.state.params === 'object') {
            if (props.navigation.state.params.zp) {
                zp = props.navigation.state.params.zp
            } else {
                choose = props.navigation.state.params.zgr || []
                _data = props.navigation.state.params.data
            }
        }
        
    }
    del(datas, data) {
        for (var i = 0; i < datas.length; i ++) {
            if (datas[i].relName == data.relName)
                break;
        }
        if (i <= datas.length) {
            datas.splice(i, 1)
        }
    }
    componentDidMount() {
        Freedomen.global.api.get('api/user/getUserTeam', {
            projectId: Freedomen.global.project.projectId
        }).then(res => {
            if (choose.length)
                for (let i of res) {
                    for (let j of choose) {
                        if (j.id == i.id)
                            i.ck = true
                    }
                }
                
            this.setState({list: res})
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}} showsVerticalScrollIndicator={false}>
                { this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            event={params => {
                                if (params.prop == 'ck') {
                                    params.value ? choose.push(params.row) : this.del(choose, params.row)
                                }
                            }}
                            key={key}
                            data={el}
                            columns={[
                                {type:'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8080/${value}`},
                                {type: 'text-h4', prop: 'realName',style: {flex: 1}},
                                {type: 'text-h4', prop: 'tel', style: {marginRight: 15}},
                                {type: 'checkbox', prop: 'ck', unCheck: require('../../assets/uncheck.png'), checked: require('../../assets/check.png')},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ]}
                        />
                    }) }
            </ScrollView>
        );
    }
  }