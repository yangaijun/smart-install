import React from 'react'
import {Text, Image, View, Alert} from "react-native";
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageVo: {
                pageNo: 1,
                pageSize: 15
            }
        }
    }
    componentDidMount() {
        this._loadData()
       
    }
    _loadData(refresh = false) {
        Freedomen.global.api.call('Message/select', this.params).then(res => {
            console.log(res)
            if (refresh) {
                this.freshList.resetData(res)
            } else {
                this.setState({
                    list: res
                })
            }
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.FreshList 
                    ref={ref => this.freshList = ref}
                    data={this.state.list}
                    event={params => {
                        const yidu = (row) => {
                            row.state = 1
                            Freedomen.global.api.call('/Message/update', row).then(res => {
                                this._loadData(true)

                                Freedomen.global.api.call('/Message/getCount').then(res => {
                                    Freedomen.redux({
                                        bar_middle: data => {
                                            if (res.data === 0)
                                                data.badge = 0
                                            else data.badge = res

                                            return data
                                        }
                                    })
                                })
                            })
                            
                        }
                        if (['$page', '$fresh'].includes(params.prop)) {
                            this.params.pageVo.pageNo = params.row.pageNo
                            this._loadData()
                        } else if (params.prop == '$delete'){
                            Alert.alert('提示', '确认删除？', [
                                {text: '确认', onPress: () => { 
                                    console.log(params.row)
                                    debugger
                                    Freedomen.global.api.call('/Message/delete', [params.row]).then(res => {
                                        this._loadData(true)
                                    })
                                }}, 
                                {text: '取消'}
                            ])
                        } else if (params.prop == 'into') { 
                            yidu(params.row)
                            if (params.row.type == 1) {
                                Freedomen.global.api.call('/QualityCheck/selectById', {qualityCheckId: params.row.aboutId}).then(res => {
                                    Freedomen.global.ZHILIAN = true
                                        let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                                        res.aboutUserList.map(el => {
                                            if (el.userType == 1) zhenGaiRen.push(el)
                                            else if (el.userType == 2) canYuRen.push(el)
                                            else zhiDinRen.push(el)
                                        }) 
                                        this.props.navigation.push("ZL_XianQin", {
                                                ...params.row, 
                                                ...res,
                                                ...res.qualityCheck,
                                                zhenGaiRen: zhenGaiRen,
                                                canYuRen: canYuRen,
                                                focus: params.value == '回复' || params.value == '验收回复',
                                                zhiDinRen: zhiDinRen})
                                })
                            } else if (params.row.type == 2) {
                                Freedomen.global.api.call('/SecurityCheck/selectById', {securityCheckId: params.row.aboutId}).then(res => {
                                    let zhenGaiRen = [], canYuRen = [], zhiDinRen = []
                                    res.aboutUserList.map(el => {
                                        if (el.userType == 1) zhenGaiRen.push(el)
                                        else if (el.userType == 2) canYuRen.push(el)
                                        else zhiDinRen.push(el)
                                    })
                                    Freedomen.global.ZHILIAN = false
                                    
                                    this.props.navigation.push("ZL_XianQin", {
                                        ...params.row, 
                                        ...res.securityCheck,
                                        ...res,
                                        zhenGaiRen: zhenGaiRen,
                                        canYuRen: canYuRen,
                                        focus: params.value == '回复' || params.value == '验收回复',
                                        zhiDinRen: zhiDinRen
                                    })
                                })
                            } else if (params.row.type == 3) {
                                Freedomen.global.api.call('/MeasureProblem/selectById', {measureProblemId: params.row.aboutId}).then(res => {
                                    this.props.navigation.push('SCSL_XianQin', res.measureProblem)
                                })
                            } else if (params.row.type == 4) {
                                Freedomen.global.api.call('/WorkTask/selectById', {workTaskId: params.row.aboutId}).then(res => {
                                    this.props.navigation.push('GZ_XianQin', res.workTask)
                                })
                            }
                        }
                    }} 
                    onEmpty={<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../assets/nomessage.png')} style={{height: 140, width: 140}} />
                    </View>}
                    columns={[
                        {type: 'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`},
                        {type: 'text', style: {width: 12, height: 12, borderRadius: 6, backgroundColor: 'red', marginLeft: -15}, load: (value, data) => data.state === 0},
                        [
                            {type: 'text-h4', prop: 'title', value: '吸你妹呢'},
                            {type: 'text', prop: 'content'},
                            {type: 'click', prop: 'into', style: {flex: 1, paddingLeft: 10}}
                        ],
                        {type: 'text', prop: 'createTime', filter: 'yyyy-MM-dd'},
                        {type: 'swipe', style:{flexDirection:'row', backgroundColor:'white', padding: 15, marginTop: 1}}
                    ]}
                />
            </View>
        );
    }
  }