import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, Alert, ScrollView} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '分类管理',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.state.params.show({title: '新建分类'})
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/tianjia.png')}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            visible: false,
            dialog: {title: ''}
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({show: (dialog) => {
            this.setState({
                visible: true,
                dialog: dialog 
            })
        }})
        this._loadData()
       
    }
    _loadData() {
        Freedomen.global.api.call('/MaterialType/select').then(res => {
            this.setState({
                list: res 
            })
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5'}}>
                <ScrollView>
                {
                    this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            key={key} data={el}
                            event={params => {
                                if (params.prop == 'edit') {
                                    this.setState({
                                        visible: true,
                                        dialog: {
                                            ...params.row,
                                            title: '分类修改'
                                        }
                                    })
                                } else if (params.prop == 'delete') {
                                    Alert.alert('提示','当前分类被删除，其下物资将转到未分类下，确定删除？',
                                        [
                                            {text: "确认", onPress: () => {
                                                Freedomen.global.api.call('/MaterialType/delete', [params.row]).then(res => {
                                                    this._loadData()
                                                })
                                            }},
                                            {text: "取消"}, 
                                        ]
                                    );
                                }
                            }}
                            columns={[ 
                                {type: 'text-h4', prop: 'materialTypeName', style: {flex: 1}},
                                {type: 'button-image-icon', prop: 'edit', value: require('../../assets/bianji.png'), style: {marginRight: 12}},
                                {type: 'button-image-icon', prop: 'delete', value: require('../../assets/shanchu.png')},
                                {type: 'br-form-row', style: {flexDirection: 'row'}}
                            ]}
                        /> 
                    })
                } 
                </ScrollView>
                <Modal 
                    isVisible={this.state.visible}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'cancel' || params.prop == 'confirm') {
                                if (params.prop == 'confirm') { 
                                    Freedomen.global.api.call('/MaterialType/add', params.row).then(res => {
                                        this._loadData()
                                    })
                                }
                                this.setState({
                                    visible: false
                                })
                            }
                        }}
                        data={this.state.dialog}
                        columns={[
                            {type: 'text-dialog-title', prop: 'title', value: '新建分类'},
                            {type: 'input-text', prop: 'materialTypeName', placeholder: '请输入分类名称',others: {autoFocus: true}, style: {backgroundColor: '#f5f5f5', paddingTB: 8, paddingLR: 15, borderRadius: 5}},
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </Modal>
            </View>
        );
    }
  }