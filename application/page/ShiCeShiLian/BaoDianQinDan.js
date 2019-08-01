import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
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
    } 
    componentDidMount() { 
        Promise.all([
            Freedomen.global.api.get('api/checkListTypes/admin/getCheckListTypesList', {
                checkType: 0
            }),
            Freedomen.global.api.get('api/paperPointInfo/getPaperPointInfoNumsByBuilding', {
                projectId: Freedomen.global.project.projectId,
                buildingNames: this.props.navigation.state.params.buildingNames,
                checkTypes: this.props.navigation.state.params.checkTypes
            })
        ]).then(res => {  
            let guolv = this.state.guolv
            guolv.jianchaxian = res[0]
            guolv.cequleixin = res[1]
            this.setState({
                list:[res[1]],
                guolv: guolv
            })
        }) 
        this.bdqdParams = {status: 0}
        this._loadBdqd()

        Freedomen.global.fn = () => {
            this._loadBdqd()
        }
    } 
    _loadBdqd() {
        Freedomen.global.api.get('api/measuredProblem/getMeasuredProblemByProjectId', {
            projectId: Freedomen.global.project.projectId,
            status: this.bdqdParams.status,
            siteId: this.props.navigation.state.params.siteId || null,
            bfmIds: this.bdqdParams.bfmIds,
            checkTypeIds: this.bdqdParams.checkTypeIds
        }).then(res => { 
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
                            this.bdqdParams.status = params.value == '待办事项' ? 0 : null
                            this._loadBdqd()
                            this.setState({
                                activity: params.value == '待办事项' ? 'dbsx' : 'wtdt',
                                chooseFlag: false
                            })
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
                        style={{height: 42, backgroundColor: 'white'}}
                        event={params => {
                            if (params.value === '0')
                                this.setState({plzp: true})

                            this.bdqdParams.status = params.value
                            this._loadBdqd(params.value)
                        }}
                        columns={[
                            {type: 'select', options: {'0': '待指派',  '2': '待验收'}}
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
                            />: null}
                        <Freedomen.Region 
                            event={params => {
                                if (params.prop == 'contain' && params.row.status === 0)
                                    this.props.navigation.push('WenTiXianQin', params.row)
                                else if (params.prop == 'status' && params.value === 0)
                                    this.props.navigation.push('SC_ZhiPai', params.row)
                                else if (params.prop == 'contain' && params.row.status === 2 || params.row.status === 1 || params.row.status === 3) {
                                    params.row.label = {0: '待指派', 1: '进行中', 2: '待验收', 3: '已完成'}[params.row.status] 
                                    this.props.navigation.push('SC_JinXinZhon', params.row)
                                } else if (params.row.status === 2) {
                                    this.props.navigation.push('SC_YanShou', params.row)
                                }
                            }}
                            style={{flex: 1}}
                            data={el}
                            columns={[
                                {type: 'text-h3', prop: 'title'},
                                {type: 'button-text', prop: 'status', prop: 'status', filter: {'0': '指派',  1: '详情', 2: '验收', 3: '详情'}, style: {alignItems: 'flex-end', color: '#2EBBC4', marginBottom: 6}},
                                [ 
                                    {type: 'text-h4', filter: (value, data) => {
                                        return {0: '待指派',  1: '进行中', 2: '待验收', 3: '已完成'}[data.status]
                                    }, style: (value, data) => {
                                            let color = {0: '#fc2f68', 1: '#FF7800', 2: '#2EBBC4', 3: '#999'}[data.status] 
                                            return {borderTopColor: '#f5f5f5', borderTopWidth: 1, color: color, paddingTB: 6}
                                        }
                                    },
                                    {type: 'text-h5', prop: 'content'},
                                    {type: 'text', prop: 'contentDetail'},
                                    {type: 'click', prop: 'contain'}
                                ],
                                {type: 'br', style: {backgroundColor: 'white', margin: 5, borderRadius: 5, padding: 15}}
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
                    style={{height: 52, backgroundColor: 'white'}}
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
                            console.log(JSON.stringify(strs) )
                            Freedomen.global.api.post('api/measuredProblem/updateMeasuredProblemList', {
                                editString: JSON.stringify(strs) 
                            }).then(res => { 
                                alert('ok')

                            }) 
                        }
                    }}
                    columns={[
                        {type: 'button-text', prop: 'plzp', value: '批量指派', load: () => !this.state.chooseFlag, style: {color: '#2EBBC4', height: 52, align: 'center', width: '100'}},
                        [
                            {type: 'button-text', prop: 'cancel', value: '取消', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                            {type: 'button-text', prop: 'all', value: '全选', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                            {type: 'button-text', prop: 'zpfzr', value: '指派负责人', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                            {type: 'pick-date', prop: 'zprq', value: '指派日期', filter: (value) =>  '指派日期', style: {color: '#2EBBC4', flex: 1, align: 'center'}},
                            {type: 'br', load: () => this.state.chooseFlag, style: {height: 52,flexDirection: 'row'}},
                        ]
                    ]} /> 
                : null
            }
            <Freedomen.SlidePop style={{backgroundColor: 'white', left: 120}} ref="slidePop">
                <Freedomen.Region 
                    data={this.state.guolv}
                    columns={[
                        {type: 'tags', prop: 'jc', value: '', options: '检查结果不一致', style: {marginLeft: 5, marginTop: 15}},
                        ...columns.GuoLv
                    ]}
                />
            </Freedomen.SlidePop>
        </View>
        );
    }
  }