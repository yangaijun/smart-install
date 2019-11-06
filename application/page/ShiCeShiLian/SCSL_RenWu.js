import React from 'react'
import {Image, View, ScrollView, Text, ActivityIndicator} from "react-native";
import Freedomen from 'react-native-freedomen' 
import store from 'react-native-freedomen/store' 

export default  class  extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '任务', 
        tabBarIcon: ({tintColor, focused}) => <Image source={focused ? require('../../assets/unrenwu.png') : require('../../assets/renwu.png')} style={{height: 22, width: 22}}/> 
    } 
    constructor(props) {
        super(props)
        this.state = {
           data: {list: []},
           loading: false,
        } 
        this.goulvrukouParams = {}
    }
    componentDidMount() { 
       this._loadData(true)
       Freedomen.global.fn = () => {
           this._loadData(true)
       }
    } 
    _loadData = (flag) => { 
        const set = (data) => {
            store.get('tonbu').then(res => {
                if (data.list.length != 0)
                    data.list[0].tonbu = res
                this.setState({
                    data: {
                        list: data
                    }
                })
            }).catch(e => {
                store.set('tonbu', 0)
                this.setState({
                    data: {
                        list: data
                    }
                })
            })
        }
        const fn = () => {
            this.setState({
                loading: true
            })
            Freedomen.global.api.call('/MeasureSite/getCacheData').then(res => {
                set(res.measureFilterDataList)
                this.setState({
                    loading: false
                })
                store.set(Freedomen.global.project.projectId + '', res.measureFilterDataList)
                store.set('checkTypeList', res.checkTypeList)
                if (res.measurePaperList.length) {
                    store.set('measurePaperList', res.measurePaperList)
                }
                store.set('pointList', res.pointList)
            })
        }
        if (flag) {
            fn ()
            return
        }
        store.get(Freedomen.global.project.projectId + '').then(res => {
            set(res)
        }).catch(e => {
            fn ()
        })
    }
    render() {
        return ( 
            <View style={{flex: 1}}>
                <ScrollView>
                <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    event={params => {  
                        if (params.value && params.value.prop == 'glrk') {
                            this.props.navigation.navigate('SCSL_GuoLvRuKou', params.$index === 0 ? {} : params.value.row)
                        } else if (params.value && params.value.prop == 'scsl')
                            this.props.navigation.navigate('SCSL_ShiCeShiLian', params.value.row)
                        else if (params.value && params.value.prop == 'upload') {
                            if (params.value.row.tonbu) { 
                                store.get('pointList').then(res => { 
                                    this.setState({
                                        loading: true
                                    })
                                    Freedomen.global.api.call('/MeasurePoint/appAdd', res).then(res => {
                                        store.remove(Freedomen.global.project.projectId + '')
                                        store.set('tonbu', 0)
                                        Freedomen.redux({
                                            scsl_list: data => {
                                                data.list[0].tonbu = 0
                                                return data
                                            }
                                        })
                                        this._loadData()
                                    }).catch(e => {
                                        this.setState({
                                            loading: false
                                        })
                                    })
                                })
                            }
                        }
                    }}
                    data={this.state.data}
                    redux={'scsl_list'}
                    columns={[{
                        type: 'scroll', prop: 'list', columns: [
                            [
                                {type: "text-h4", prop: 'measureScreenLogName', value: '实测实量'},
                                [
                                    {type: 'text-label', prop: 'doneNum', value: '0', filter: value => `测量点位:${value}`},
                                    {type: 'text-label', prop: 'allNum', value: '0', filter: value => `/ ${value}`},
                                    {type: 'text-label', prop: 'problemNum', value: '8', filter: value => `  爆点数量:${value}`},
                                    {type: 'br', style: {flexDirection: 'row'}}
                                ],
                                {type: 'click', prop: 'scsl', style: {flex: 1}}
                            ],
                            {type: 'button-image', prop: 'glrk', value: require('../../assets/w.png'), style: {width: 30, height: 30, marginLR: 8}},
                            {type: 'button-image', prop: 'upload',  load: (value, data)=> data.measureScreenLogId === null, value: require('../../assets/tonbu.png'), style: {width: 30, height: 30, marginLR: 5}},
                            {type: 'text-badge', prop: 'tonbu', load: (value, data)=> {return data.tonbu != void 0 && value},  style: {marginLeft: -14, marginTop: -22, height: 12, width: 12, borderRadius: 6, padding: 0}},
                            {type: 'br-row', style: {marginTB: 1}}
                        ]
                    }
                    ]}
                />  
                </ScrollView>
                {
                    this.state.loading ? 
                    <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: 120, width: 130, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 8,alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator color="white" size='large'/>
                            <Text style={{color: 'white', marginTop: 18}}>加载中，请稍等</Text>
                        </View>
                    </View> : null
                }
            </View>
        ) 
    }
  }