import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns'
const Search = columns.CK_Search('请输入名称、规格', 'name')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.label,
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('WZ_XinJian')
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
            activityId: 1,
            activity: 'full',
            kinds: {kinds:[{kind: '全部分类'}, {kind: '分类1'}, {kind: '分类2'}, {kind: '分类3'}]}
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 600);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                 <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'clear') {
                            params.row.name = ''
                            return params.row
                        }
                    }}
                    columns={[
                        {type: 'text-h4', value: '有库存', style: {width: 72}},
                        Search,
                        {type: 'br-row'}
                    ]}
                />
                <View style={{flex: 1, backgroundColor: '#f5f5f5', flexDirection: 'row', marginTop: 1 }}>
                    <Freedomen.Region 
                        style={{width: 88, marginRight: 1}}
                        event={params => {
                            this.setState({
                                activityId: params.value.row.id
                            })
                        }}
                        columns={[
                            {type: 'views-y', prop:'kinds', value: [{id: 1},{id: 2},{id: 3}], style: {width: 88}, columns: [
                                {type: 'button-text', prop: 'kind', value: '全部分类', style: (value, data) => {
                                        let color = this.state.activityId == data.id ? '#2EBBC4': '#191919'
                                        return {padding: 15, align: 'center', backgroundColor: 'white', marginBottom: 1, color: color}
                                    }  
                                }
                            ]}
                        ]}
                    /> 
                    <View style={{flex: 1}}>
                        <Freedomen.FreshList 
                            event={params => {
                                if (params.prop == 'show')
                                    this.setState({
                                        visible: true
                                    })
                            }}
                            data={this.state.list}
                            columns={[
                                [
                                    {type: 'text-h4', value: '螺丝刀'},
                                    {type: 'text-label', value: 7, filter: value => `库存： ${value}`},
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
                    event={params => {
                        if (params.value == '选好了') {
                            const {navigation} = this.props
                            let label = navigation.state.params.type == 1 ? '入' : '出'
                            label = label + '库：确认信息'
                            this.props.navigation.push('WZ_RuKuChuKuQueRen', {label: label})
                        }
                            
                    }}
                    columns={[
                        {type: 'button-image', value: require('../../assets/xuanhao.png'), style: {width: 32, height: 32}},
                        {type: 'text-badge', value: 12, style: {marginTop: -22}},
                        {type: 'text', value: '', style: {flex: 1}},
                        {type: 'button-primary', value: '选好了', style: {width: 115, height: 36, padding: 5, borderRadius: 28}},
                        {type: 'br-row', style: {height: 52}}
                    ]}
                />  
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
                                this.setState({
                                    visible: false
                                })
                            }
                        }}
                        columns={[
                            {type:'text-dialog-title', value: '螺丝刀'},
                            [
                                {type: 'text-h4', value: '数量:'},
                                {type: 'counter', prop: 'counter', value: 1, style: {marginLR: 20}},
                                {type: 'text-h4', value: '把'},
                                {type: 'br-row', style: {alignSelf: 'center'}}
                            ],[
                                {type: 'text-h4', value: '单价:'},
                                {type: 'input-text', value: '0', prop: 'price', style: {marginLR: 20, borderRadius: 5, padding: 3, alignItems: 'center', borderWidth: .6,  width: 115, borderColor: '#ccc'}},
                                {type: 'text-h4', value: '元'},
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