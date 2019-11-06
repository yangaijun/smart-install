import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import utils from '../../region/utils'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '爆点清单'
    }
    constructor(props) {
        super(props) 
        this.state = {  
            activity: 'dbsx',
            guolv: {},
            bdqdList: [],
            plzp: true,
            chooseFlag: false
        }
        this.choose = []
        this.params = {status: 1, pageVo: {}}
    } 
    componentDidMount() { 
        Freedomen.global.fn = () => {
            this._loadData()
        }
        this._loadData()
    } 
    _loadData() {
        Freedomen.global.api.call('/MeasureProblem/selectList', this.params).then(res => {
            console.log(res)
            this.setState({
                bdqdList: res
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}} >
                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'shaixuan') {
                            this.refs.slidePop.show()
                        } else { 
                            this.setState({
                                activity: params.value == '待办事项' ? 'dbsx' : 'wtdt',
                                chooseFlag: false
                            }) 
                            if (params.value == '问题动态') {
                                this.params.status = null
                            } else {
                                this.params.status = 1
                            }
                            this._loadData() 
                        }
                    }}
                    columns={[ 
                        [
                            {type: 'tags', value: '待办事项', options: '待办事项,问题动态', style: {borderWidth: 0, color: '#191919', flex: 1}},
                            {type: 'br', style: {flex: 1, marginLeft: 48}}
                        ],
                        {type: 'button-image', prop: 'shaixuan', value: require('../../assets/w.png'), style: {width: 24, height: 24, marginLR: 12}},
                        {type: 'br-row', style: {padding: 5, marginBottom: 1}}
                    ]}
                />
            <View style={{flex: 1}}>
            {
                this.state.activity == 'dbsx' ? 
                    <Freedomen.Region 
                        style={{height: 42, backgroundColor: 'white', paddingLeft: 5}}
                        event={params => {
                            if (params.value === '1')
                                this.setState({plzp: true}) 
                            this.params.status = params.value
                            this._loadData()
                        }}
                        columns={[
                            {type: 'select', options: {'1': '待指派',  '3': '待验收'}}
                        ]}
                    /> 
                :   null
            }
            <ScrollView>
                {
                    this.state.bdqdList.map((el, index) => {
                        return <View style={{flexDirection: 'row'}}  key={index}>
                        {
                            this.state.chooseFlag ? <Freedomen.Region 
                                event={params => {
                                    if (params.value)
                                        this.choose.push(el)
                                    else {
                                        for (var i = 0; i < this.choose.length; i ++) {
                                            if (el.id == this.choose[i].id)
                                                break
                                        }
                                        if (i !== this.choose.length)
                                            this.choose.splice(i, 1)
                                    }
                                }}
                                data={el}
                                style={{width: 60, align: 'center'}}
                                columns={[
                                    {type: 'checkbox', prop: 'checkbox', checked: require('../../assets/check.png'), unCheck: require('../../assets/uncheck.png')}
                                ]} 
                            /> : null}
                        <Freedomen.Region 
                            event={params => {
                                if (params.prop == 'contain' && params.row.status === 1)
                                    this.props.navigation.push('SCSL_WenTiXianQin', params.row)
                                else if (params.prop == 'status' && params.value === 1)
                                    this.props.navigation.push('SCSL_ZhiPai', params.row)
                                else if (params.prop == 'contain' || params.row.status === 2 || params.row.status === 4) {
                                    // params.row.label = {1: '待指派', 2: '进行中', 3: '待验收', 4: '已完成'}[params.row.status] 
                                    this.props.navigation.push('SCSL_XianQin', params.row)
                                } else if (params.row.status === 3) {
                                    this.props.navigation.push('SCSL_YanShou', params.row)
                                }
                            }}
                            style={{flex: 1}}
                            data={el}
                            columns={[
                                {type: 'text-h4',  filter: (value, data) => `${data.checkSite}实测实量设备安装`},
                                {type: 'button-text', prop: 'status', filter: {1: '指派', 2: '详情', 3: '验收', 4: '详情'}, style: {alignItems: 'flex-end', color: '#2EBBC4', marginBottom: 6}},
                                [ 
                                    {type: 'text-h5', filter: (value, data) => {
                                        return {1: '待指派',  2: '进行中', 3: '待验收', 4: '已完成'}[data.status]
                                    }, style: (value, data) => {
                                            let color = {1: '#fc2f68', 2: '#FF7800', 3: '#2EBBC4', 4: '#999'}[data.status] 
                                            return {borderTopColor: '#f5f5f5', borderTopWidth: 1, color: color, paddingTB: 6}
                                        }
                                    },
                                    [
                                        {type: 'text-h5', prop: 'userRealName', style: {marginRight: 10}},
                                        {type: 'text-h5', prop: 'createTime', filter: 'yyyy-MM-dd hh:mm'},
                                        {type: 'br-normal-row'}
                                    ], [
                                        {type: 'text', prop: 'checkName', filter: value => `${value}: `},
                                        {type: 'text', prop: 'inputDatas'},
                                        {type: 'br-normal-row', style: {paddingTop: 5}}
                                    ],
                                    {type: 'click', prop: 'contain'}
                                ],
                                {type: 'br-list-item'}
                            ]}
                        />
                        </View> 
                    })
                }
            </ScrollView>
            </View>
            {
                this.state.activity == 'dbsx' && this.state.plzp ? 
                    <Freedomen.Region
                        style={{height: 52, backgroundColor: 'white', alignItems: 'center'}}
                        event={params => {
                            if (params.prop == 'plzp' || params.prop == 'cancel')
                                this.setState({
                                    chooseFlag:  !this.state.chooseFlag
                                })
                            else if (params.prop == 'all')  {
                                let bdqdList = this.state.bdqdList
                                this.choose = bdqdList
                                bdqdList.map(el => {
                                    el.checkbox = true
                                })
                                this.setState({bdqdList: bdqdList.slice()})
                            } else if (params.prop == 'zpfzr' && this.choose.length)  {
                                this.props.navigation.push('ZhenGaiRen', {zp: this.choose})
                            } else if (params.prop == 'zprq' && this.choose.length) {
                                let strs = this.choose.map(el => {
                                    return {
                                        id: el.id,
                                        finishedDate: params.value
                                    }
                                }) 
                            
                            }
                        }}
                        columns={[
                            {type: 'button-text', prop: 'plzp', value: '批量指派', load: () => !this.state.chooseFlag, style: {color: '#2EBBC4', height: utils.PhoneType == 'iosx' ? 64 : 52, align: 'center', width: '100'}},
                            [
                                {type: 'button-text', prop: 'cancel', value: '取消', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                                {type: 'button-text', prop: 'all', value: '全选', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                                {type: 'button-text', prop: 'zpfzr', value: '指派负责人', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                                {type: 'pick-date', prop: 'zprq', value: '指派日期', filter: (value) =>  '指派日期', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                                {type: 'br', load: () => this.state.chooseFlag, style: {height: utils.PhoneType == 'iosx' ? 64 : 52, flexDirection: 'row'}},
                            ]
                        ]} 
                    /> 
                : null
            }
            <Freedomen.SlidePop style={{backgroundColor: 'white', left: 120}} ref="slidePop">
                <Freedomen.Region 
                    data={this.state.guolv}
                    columns={[
                        {type: 'tags', prop: 'jc', value: '', options: '检查结果不一致', style: {marginLeft: 5, marginTop: 15}}
                        // ...columns.GuoLv
                    ]}
                />
            </Freedomen.SlidePop> 
        </View>
        );
    }
  }