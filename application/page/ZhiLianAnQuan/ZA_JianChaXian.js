import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Alert} from 'react-native'
import columns from '../../region/columns' 
import Dialog from '../APublic/P_Dialog';
const Search = columns.ZA_Search('请输入检查项名称')
var dialog = null 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label + '检查项',
            headerRight: <Freedomen.Region 
                event={params => { 
                   navigation.state.params.show()
                }}
                columns={[
                    {type: 'button-text', value: '新增', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            data: {}
        }

        this.params = {
            checkType: props.navigation.state.params.type == 1 ? 3 : 2,
            pageVo: {
                pageNo: 1,
                pageSize: 15
            }
        }
    }
    componentDidMount() { 
        this.props.navigation.setParams({show: () => {
            dialog._show()
            this.setState({
                data: {}
            })
        }})
        this._loadData()
    }
    _loadData(fresh = false) {
        Freedomen.global.api.call('/ProjectCheckType/select', this.params).then(res => {
            if (fresh) {
                this.freshList.resetData(res.data)
            }
            this.setState({
                list: res.data
            })
        })
    }

    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 10, marginBottom:1}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        }
                    }}
                    columns={Search}
                />
                <Freedomen.FreshList 
                    ref={ref => this.freshList = ref}
                    data={this.state.list} 
                    event={params => {
                        if (['$page', '$fresh'].includes(params.prop)) {
                            this.params.pageVo.pageNo = params.row.pageNo
                            this._loadData()
                        } else if (params.prop == 'delete') {
                            Alert.alert('提示', '确认删除？', [
                                {
                                    text: '确认',
                                    onPress: () => {
                                        Freedomen.global.api.call('/ProjectCheckType/delete', [params.row]).then(res => {
                                            this._loadData(true)
                                        })
                                    }
                                }, {
                                    text: '取消'
                                },
                            ])
                        } else if (params.prop == 'edit') {
                            this.setState({
                                data: params.row
                            }, () => {
                                dialog._show()
                            })
                        }
                    }}
                    columns={[
                        {type: 'text-h5', prop: 'checkName', style: {flex: 1}},
                        {type: 'button-image-icon', prop: 'edit', value: require('../../assets/bianji.png'), style: {marginRight: 12}},
                        {type: 'button-image-icon', prop: 'delete', value: require('../../assets/shanchu.png')},
                        {type: 'br-form-row'}
                    ]}
                />

                <Dialog ref={ref => dialog = ref}>
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'cancel' || params.prop == 'confirm') {
                                if (params.prop == 'confirm' && params.value) {
                                    Freedomen.global.api.call('/ProjectCheckType/add', {
                                        checkType: this.props.navigation.state.params.type == 1 ? 3 : 2,
                                        ...params.row
                                    }).then(res => {
                                        this._loadData(true)
                                    })
                                }
                                dialog._hide()
                            }
                        }} 
                        data={this.state.data}
                        columns={[
                            {type: 'text-dialog-title', value: '新建检查项', style: {alignSelf: 'center', paddingBottom: 25}},
                            {type: 'input-text', others: {autoFocus: true}, prop: 'checkName', placeholder: '请输入检查项名称', style: {backgroundColor: '#f5f5f5', paddingTB: 8, paddingLR: 15, borderRadius: 5}},
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
               </Dialog>
            </View>
        );
    }
  }