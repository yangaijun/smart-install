import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, Dimensions} from 'react-native'
import columns from '../../region/columns'
import CP_FenLei from './CP_FenLei' 
var slidePop = null
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '物资库存',
        headerRight: <Freedomen.Region 
            event={params => {
                slidePop.show()
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/more.png')},
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pilian: false,
            button: {choose: [], label: ''}
        }
        this.wuZiParams = {  
            pageVo: {
                pageNo: 1,
                pageSize: 15
            }
        }
        this.Search = columns.CK_Search('请输入名称、规格', 'sizeOrName')
        this.choose = []
    }
    componentDidMount() {
        this._loadWuZi()
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
                        this.kind = params
                        this._loadWuZi(true)
                    }}/> 
                    <View style={{flex: 1}}>
                    <Freedomen.FreshList  
                        ref={"list"}
                        event={params => {
                            if (['$page', '$fresh'].includes(params.prop)) {
                                this.wuZiParams.pageVo.pageNo = params.row.pageNo
                                this._loadWuZi()
                            } else if (params.prop == 'into') {
                                this.props.navigation.push('WZ_LiuShui', {...params.row, material: this.kind})
                            } else if (params.prop == 'checked') {
                                let choose = this.state.button.choose
                                if (params.value)
                                    choose.push(params.value)
                                else {
                                    for (var i = 0; i < choose.length; i ++) {
                                        if (params.value.materialId ==  choose[i].materialId)
                                            break
                                    }
                                    if (i !== choose.length)
                                        choose.splice(i, 1)
                                }
                                this.setState({
                                    button: {
                                        ...this.state.button,
                                        choose: choose
                                    }
                                })
                            }
                        }}
                        data={this.state.list}
                        columns={[
                            {type: 'text-h4', prop: 'materialName', value: '螺丝刀'},
                            [
                                {type: 'text', prop: 'materialSize', value: '45*45*98', style: {flex: 1}},
                                {type: 'text', prop: 'materialUnit', filter: value => `单位: ${value}`},
                                {type: 'checkbox', prop: 'checked', load: value=>value !== void 0, style: {marginLeft: 15}},
                                {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
                            ],
                            [
                                {type: 'text', prop: 'putNum', filter: value => `入：${value}`, style: {flex: 1}},
                                {type: 'text', prop: 'outNum', filter: value => `出：${value}`, style: {flex: 1}},
                                [
                                    {type: 'text', value: '存：'},
                                    {type: 'text-primary', prop: 'leaveNum', value: 40},
                                    {type: 'br', style: {flexDirection: 'row', flex: 1}}

                                ],
                                {type: 'br', style: {flexDirection: 'row'}}
                            ],
                            {type: 'click-list-item', prop: 'into'}
                        ]}
                    /> 
                    </View>
                </View>
                {
                    this.state.pilian ? 
                    <Freedomen.Region 
                        style={{height: 52}}
                        data={this.state.button}
                        columns={[
                            {type: 'button-text', prop: 'label', filter: (value, data) => data.choose.length == 0 ? '取消' : `${value}(${data.choose.length}项)`, style: value => {
                                return { 
                                    align: 'center',
                                    fontWeight: '500',
                                    fontSize: 16,
                                    color: 'white',
                                    backgroundColor: value == '批量删除' ? '#FF6D73' : '#2EBBC4',
                                    flex: 1
                                }
                            }}
                        ]}
                    /> : null
                }
                
                <Freedomen.Region 
                    style={{
                        position: 'absolute',
                        bottom: 45,
                        right: 22
                    }}
                    event={params => {
                        if (params.prop == 'cancel') {
                            return {cancel: !params.row.cancel}
                        }
                    }}
                    columns={[
                        {type: 'button-image', value: require('../../assets/wz_shoudonxinjian.png'), load: (value, data) => data.cancel, style: {width: 110, resizeMode: 'stretch', height: 42, marginRight: 12}},
                        {type: 'button-image', value: require('../../assets/wz_saomadaoru.png'), load: (value, data) => data.cancel, style: {width: 110, resizeMode: 'stretch', height: 42, marginRight: 12}},
                        {type: 'button-image', prop: 'cancel', filter: value => { return value ? require('../../assets/wz_quxiao.png') : require('../../assets/za_jia.png')}, style: {height: 58, width: 58, marginBottom: 5, alignItems: 'flex-end'}}
                    ]}
                />

                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 215, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                            const addCheckBox = (text) => {
                                let data = this.refs.list.getData() 
                                data.map(el => {
                                    el.checked = false
                                })
                                this.refs.list.resetData(data)
                                this.setState({
                                    pilian: true,
                                    button: {
                                        choose: [],
                                        label: text
                                    }
                                })
                            }
                            if (params.value == '分类管理')
                                this.props.navigation.push('WZ_FenLieGuanLi')
                            else if (params.value == '批量移动') {
                                addCheckBox(params.value)
                            } else if (params.value == '批量删除') {
                                addCheckBox(params.value)
                            }
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '分类管理', style: {color: '#2EBBC4', marginBottom: 1}},
                            {type: 'button-pop-item', value: '批量移动', style: {color: '#2EBBC4', marginBottom: 1}},
                            {type: 'button-pop-item', value: '批量删除', style: {color: '#FF6D73', marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#898989'}}
                        ]}
                    />
                </Freedomen.SlidePop>
               
            </View>
            
        );
    }
  }