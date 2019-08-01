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
        Freedomen.global.fresh = this._loadData
    }

    componentDidMount() { 
       this._loadData()
    } 

    _loadData = () => { 
        store.get('scslData').then(res => {
            this.setState({data: {list: res}})
        }).catch(e => {
            Freedomen.global.api.get('api/paperPointInfo/getMeasuredInfoList', {
                projectId: Freedomen.global.project.projectId
            }).then(res => {
                res[0].tonbu = 0
                store.get('pointInfo').then(ret => {  
                    res[0].tonbu =  Object.keys(ret).length
                    this.setState({data: {list: res}})
                }).catch(e => {
                    this.setState({data: {list: res}})
                }) 
                store.set('scslData', res) 
            }) 
        })
        store.get('checkList').catch(e => {
            Freedomen.global.api.get('api/checkListTypes/admin/getCheckListTypesList', {
                checkType: 0,
                pageSize: 100
            }).then(res => { 
                store.set('checkList', res || [])
            }) 
        })
        // Freedomen.global.api.get('api/paperPointInfo/getPaperPointInfoNums', {
        //     projectId: Freedomen.global.project.projectId
        // }).then(res => {  
        //     res = res || [] 
        //     res[0].tonbu = 0

        //     store.get('pointInfo').then(ret => {  
        //         res[0].tonbu =  Object.keys(ret).length
        //         this.setState({data: {list: res}})
        //     }).catch(e => {
        //         this.setState({data: {list: res}})
        //     })
           
        // }) 
    }
    render() {
        return ( <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    event={params => {  
                        if (params.value && params.value.prop == 'glrk') 
                            this.props.navigation.navigate('GuoLvQiRuKou', params.index === 0 ?  {} : params.value.row)
                        else if (params.value && params.value.prop == 'scsl')
                            this.props.navigation.navigate('ShiCeShiLian', params.value.row)
                        else if (params.value && params.value.prop == 'upload') {
                            store.get('pointInfo').then(res => {   
                                
                                let arr = []
                                for(let key in res) { 
                                    let item = res[key] 
                                    item.map(ret => { 
                                        
                                        let inputItemList = ret.logList.filter(el => { 
                                            
                                            if (el.value != void 0 || el.inputData != void 0) {
                                                el.inputData = el.value || el.inputData
                                                el.checkTypeId = ret.checkTypeId
                                                el.checkTypeName = ret.content
                                                let temp = el.value - parseInt(ret.standardNum || 0) 
                                                el.state = (temp < parseInt(ret.errorUpperLimit) && temp > (ret.errorLowerLimit)) ? 0 : 1
                                                return el
                                            }
                                        })
                                        console.log(inputItemList)
                                        if (inputItemList.length) {
                                            ret.inputItemList = inputItemList
                                            arr.push(ret)
                                        }
                                    }) 
                                }
                                console.log(arr)
                                if (arr.length) { 
                                    console.log(JSON.stringify(arr))
                                    Freedomen.global.api.post('api/pointDataInputLog/addPointDataInputLog', {
                                        jsonString: JSON.stringify(arr)
                                    }).then(res => {
                                        console.log('tongbuok')
                                        store.remove('pointInfo')
                                        let data = this.state.data
                                        data.list[0].tonbu = 0
                                        this.setState({
                                            data: data
                                        })
                                    })
                                }
                            })
                        }
                    }}
                    data={this.state.data}
                    redux={'scsl_list'}
                    columns={[{
                        type: 'scroll', prop: 'list', value: [], columns: [
                            [
                                {type: "text-h4", value: '实测实量'},
                                [
                                    {type: 'text-label', prop: 'doneNums', value: '0', filter: value => `测量点位:${value}`},
                                    {type: 'text-label', prop: 'pointNums', value: '0', filter: value => `/ ${value}`},
                                    {type: 'text-label', prop: 'problemNums', value: '8', filter: value => `  爆点数量:${value}`},
                                    {type: 'br', style: {flexDirection: 'row'}}
                                ],
                                {type: 'click', prop: 'scsl', style: {flex: 1}}
                            ],
                            {type: 'button-image', prop: 'glrk', value: require('../../assets/w.png'), style: {width: 30, height: 30, marginLR: 8}},
                            {type: 'button-image', prop: 'upload',  load: (value, data)=> data.tonbu != void 0, value: require('../../assets/tonbu.png'), style: {width: 30, height: 30, marginLR: 5}},
                            {type: 'text-badge', prop: 'tonbu', load: (value, data)=> {return data.tonbu != void 0 && value}, style: {marginLeft: -14, marginTop: -22}},
                            {type: 'br-row', style: {marginTB: 1}}
                        ]
                    }
                    ]}
                />  
            ) 
    }
  }