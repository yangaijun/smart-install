import React from 'react'
import {Image, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen' 
import store from 'react-native-freedomen/store'

export default  class  extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '任务', 
        tabBarIcon: ({tintColor,focused}) => <Image source={focused ? require('../../assets/unrenwu.png') : require('../../assets/renwu.png')} style={{height: 22, width: 22}}/> 
    }; 

    constructor(props) {
        super(props)
        this.state = {
           data: {list: []}
        } 
    }

    componentDidMount() { 
       this._loadData()
    } 

    _loadData = () => { 
        const set = (data) => {
            this.setState({
                data: {
                    list: data
                }
            })
        }

        store.get(Freedomen.global.project.projectId + '').then(res => {
            set(res)
        }).catch(e => {
            Freedomen.global.api.call('/MeasureSite/getCacheData').then(res => {
                set(res.measureFilterDataList)

                store.set(Freedomen.global.project.projectId + '', res.measureFilterDataList)
                store.set('checkTypeList', res.checkTypeList)
                store.set('measurePaperList', res.measurePaperList)
                store.set('pointList', res.pointList)
            })
        })
        
        Freedomen.global.api.call('/MeasureSite/getCacheData').then(res => {
            console.log(res)
            store.set(Freedomen.global.project.projectId + '', res.measureFilterDataList)
            store.set('checkTypeList', res.checkTypeList)
            store.set('measurePaperList', res.measurePaperList)
            store.set('pointList', res.pointList)
        })
    }
    render() {
        return ( <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    event={params => {  
                        if (params.value && params.value.prop == 'glrk') 
                            this.props.navigation.navigate('SCSL_GuoLvQiRuKou', params.value.row)
                        else if (params.value && params.value.prop == 'scsl')
                            this.props.navigation.navigate('SCSL_ShiCeShiLian', params.value.row)
                        else if (params.value && params.value.prop == 'upload') {
                            store.get('pointList').then(res => {
                                console.log(JSON.stringify(res))

                                Freedomen.global.api.call('/MeasurePoint/appAdd', res).then(res => {
                                    alert('更新成功')
                                })
                            })
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
                            {type: 'text-badge', prop: 'tonbu', load: (value, data)=> {return data.tonbu != void 0 && value}, style: {marginLeft: -14, marginTop: -22}},
                            {type: 'br-row', style: {marginTB: 1}}
                        ]
                    }
                    ]}
                />  
            ) 
    }
  }