import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, Alert} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns'
import CP_FenLei from './CP_FenLei' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.label,
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('WZ_XinJian', navigation.state.params)
            }}
            columns={[
                {type: 'button-image', value: require('../../assets/tianjia.png'), style: {width: 28, height: 28, marginRight: 12}}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            list: [],
            activityId: null, 
            dialog: {}
        }
        this.wuZiParams = {  
            pageVo: {
                pageNo: 1,
                pageSize: 15
            }
        }
        console.log(this.props.navigation.state.params)
        this.WZ = []
        this.Search = columns.CK_Search('请输入名称、规格', 'sizeOrName')
    }
    componentDidMount() {
        this._loadWuZi()
        Freedomen.global.fn = (data) => {
            data.isCommon = data.isCommon ? 1 : 0
            data.currentInputNum = data.putNum
            if (this.props.navigation.state.params.logType === 1) {
                data.putNum = undefined
            }
            this.WZ.push(data)
        }
    }
    _loadWuZi(fresh = false) {
        if (fresh) 
            this.wuZiParams.pageVo.pageNo = 1

        Freedomen.global.api.call('/Material/select', this.wuZiParams).then(res => { 
            !fresh ?
                this.setState({
                    list: res.data
                })
            : this.refs.list.resetData(res.data) 
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                 <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'clear') {
                            this.wuZiParams.sizeOrName = ''
                            this._loadWuZi(true)
                            return {
                                ...params.row,
                                sizeOrName: ''
                            }
                        } else if (params.prop == 'sizeOrName') {
                            this.wuZiParams.sizeOrName = params.value
                            this._loadWuZi(true)
                        } 
                    }}
                    columns={[
                        {type: 'text-h4', value: '有库存', style: {width: 72}},
                        this.Search,
                        {type: 'br-row'}
                    ]}
                />
                <View style={{flex: 1, backgroundColor: '#f5f5f5', flexDirection: 'row', marginTop: 1 }}>
                    <CP_FenLei event={params => {
                        this.wuZiParams.materialTypeId = params.materialTypeId
                        this._loadWuZi(true)
                    }}/>
                    <View style={{flex: 1}}>
                        <Freedomen.FreshList 
                            ref={"list"}
                            event={params => {
                                if (params.prop == 'show')
                                    this.setState({
                                        dialog: {
                                            ...params.row,
                                            price: params.row.price ? params.row.price + '' : ''
                                        },
                                        visible: true
                                    })
                                else if (['$page', '$fresh'].includes(params.prop)) {
                                    this.wuZiParams.pageVo.pageNo = params.row.pageNo
                                    this._loadWuZi()
                                }
                            }}
                            data={this.state.list}
                            columns={[
                                [
                                    {type: 'text-h4', prop: 'materialName', value: '螺丝刀'},
                                    {type: 'text-label', prop: 'leaveNum', value: 7, filter: value => `库存： ${value}`},
                                    {type: 'br', style: {flex: 1}}
                                ], 
                                {type: 'button-image', prop: 'show', value: require('../../assets/tj.png'), style: {width: 32, height: 32}},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ]}
                        />
                    </View>
                </View>
                <Freedomen.Region 
                    style={{height: 52, backgroundColor: 'white', alignItems: 'center'}}
                    redux={'rkck_bar'}
                    event={params => {
                        if (params.value == '选好了') {
                            const {navigation} = this.props
                            this.props.navigation.push('WZ_RuKuChuKuQueRen', {WZ: this.WZ, ...navigation.state.params})
                        }  
                    }}
                    columns={[
                        {type: 'image-icon', value: require('../../assets/xuanhao.png')},
                        {type: 'text-badge', prop: 'count', style: {marginTop: -22, marginLeft: -15}, load: value => value},
                        {type: 'text', value: '', style: {flex: 1}},
                        {type: 'button-primary', value: '选好了', disabled: (value, data) => !data.count, style: {width: 100, height: 34, padding: 5, borderRadius: 18}},
                        {type: 'br-row', style: {height: 52}}
                    ]}
                />  
                <Modal 
                    isVisible={this.state.visible}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={300}
                    backdropTransitionInTiming={300}
                    backdropTransitionOutTiming={600}>
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'cancel' || params.prop == 'confirm') {
                                if (params.prop == 'confirm') {
                                    if (!params.row.logNumTemp) {
                                        return {
                                            ...params.row,
                                            'logNumTemp-valid': '请正确输入数量'
                                        }
                                    }
                                    params.row.currentInputNum = params.row.logNumTemp
                                    this.WZ.push(params.row)

                                    Freedomen.redux({
                                        rkck_bar: (data) => { 
                                            data.count == void 0 ? data.count = 1 : data.count ++
                                            return data
                                        }
                                    })
                                }
                                this.setState({
                                    visible: false
                                })
                            }
                        }}
                        data={this.state.dialog}
                        columns={[
                            {type:'text-dialog-title', prop: 'materialName'},
                            [
                                {type: 'text-h5', value: '数量:'},
                                {type: 'counter', prop: 'logNumTemp', value: 0, max: 100000000, min: -10000000, style: {marginLR: 10}},
                                {type: 'text-h5', prop: 'materialUnit', value: '把'},
                                {type: 'br-row', style: {alignSelf: 'center'}}
                            ], 
                            {type: 'text-valid-message', prop: 'logNumTemp-valid', load: value => value, style: {marginLeft: 40}}, 
                            [
                                {type: 'text-h5', value: '单价:'},
                                {type: 'input-text', prop: 'price', value: '0',  style: {marginLR: 10, borderRadius: 5, padding: 3, alignItems: 'center', borderWidth: .6,  width: 138, borderColor: '#ccc'}},
                                {type: 'text-h5', value: '元'},
                                {type: 'br-row', style: {alignSelf: 'center'}}
                            ],
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </Modal>
            </View>
            
        );
    }
  }