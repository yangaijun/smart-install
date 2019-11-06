import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {Text, Alert, ScrollView} from 'react-native' 
import Modal from "react-native-modal";
var choose = []
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.label,
        headerRight: <Freedomen.Region 
            event={params => {
                if (navigation.state.params.label == '批量删除') {
                    Alert.alert('提示', '确定删除？', [{text: '确定', onPress: () => {
                        Freedomen.global.api.call('Material/delete', choose).then(res => {
                            Freedomen.global.toast('删除成功')
                            Freedomen.global.fn && Freedomen.global.fn()
                            navigation.goBack()
                        })
                    }}, {text: '取消'}])
                } else {
                    navigation.state.params.open && navigation.state.params.open()
                }
            }}
            redux={'page_title'}
            columns={[
                {type: 'button-right', prop: 'size', filter: value => `完成(${value})`, value: 0},
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            list: props.navigation.state.params.data,
            visible: false,
            kinds: []
        }
        choose = this.choose = []
        props.navigation.setParams({open: () => {
            this.setState({
                visible: true
            })
            }
        })
    }
    componentDidMount() {
        Freedomen.global.api.call('/MaterialType/select').then(res => {
            if (res.length)
                this.setState({ 
                    kinds: res
                })
        })
    }
    render() {
        const _columns = [
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
            {type: 'br-list-item', prop: 'into'}
        ]
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
            <Modal 
                isVisible={this.state.visible}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={300}
                onBackdropPress={() => {
                    this.setState({visible: false}) 
                }}
                onBackButtonPress={() => {
                    this.setState({visible: false})
                }}
                style={{padding: '12%', paddingVertical: '22%'}}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={600}>
                <Text style={{backgroundColor: '#2EBBC4', color: 'white', textAlignVertical: 'center', textAlign: 'center', paddingVertical: 12, borderTopLeftRadius: 8, borderTopRightRadius: 8}}>选择移动分类</Text>
                    <ScrollView style={{backgroundColor: 'white'}}>
                        {
                            this.state.kinds.map((el, key) => {
                                return <Freedomen.Region 
                                    event={params => {
                                        
                                        this.setState({
                                            visible: false
                                        })
                                        choose.map(el => {
                                            el.materialTypeId = params.row.materialTypeId
                                        })
                                        Freedomen.global.api.call('Material/updateList', choose).then(res => {
                                            Freedomen.global.toast('移动成功')
                                            Freedomen.global.fn && Freedomen.global.fn()
                                            this.props.navigation.goBack()
                                        }) 
                                    }}
                                    key={key}
                                    data={el}
                                    columns={[
                                        {type: 'text-form-label', prop: 'materialTypeName'},
                                        {type: 'click-list-item', style: {borderBottomColor: '#f5f5f5', borderBottomWidth: 1}}
                                    ]}
                                />
                            })
                        }
                    </ScrollView>
            </Modal>
            {
                this.state.list.map((el, key) => {
                    return <Freedomen.Region
                        key={key}
                        data={el}
                        event={params => {
                            if (params.prop == 'checked') { 
                                if (params.value)
                                    this.choose.push(params.row)
                                else {
                                    for (var i = 0; i < this.choose.length; i ++) {
                                        if (params.row.materialId ==  this.choose[i].materialId)
                                            break
                                    }
                                    if (i !== this.choose.length)
                                        this.choose.splice(i, 1)
                                } 
                                Freedomen.redux({
                                    page_title: {size: this.choose.length}
                                })
                            }
                        }}
                        columns={_columns}
                    />
                })
            }
            </ScrollView>
        )
    }
}