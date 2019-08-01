import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns'
const Search = columns.CK_Search('请输入名称、规格', 'name')

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '物资库存',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.state.params.show()
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/more.png')}
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
        this.props.navigation.setParams({show: () => {
            this.setState({
                visible: true
            })
        }})
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 400);
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
                                this.setState({
                                    visible: true
                                })
                            }}
                            data={this.state.list}
                            columns={[
                                {type: 'text-h4', value: '螺丝刀'},
                                [
                                    {type: 'text', value: '45*45*98', style: {flex: 1}},
                                    {type: 'text', value: '单位：个'},
                                    {type: 'br', style: {flexDirection: 'row', paddingTB: 5}}
                                ],
                                [
                                    {type: 'text', value: 40, filter: value => `入：${value}`, style: {flex: 1}},
                                    {type: 'text', value: 40, filter: value => `出：${value}`, style: {flex: 1}},
                                    [
                                        {type: 'text', value: '存：'},
                                        {type: 'text-primary', value: 40},
                                        {type: 'br', style: {flexDirection: 'row', flex: 1}}

                                    ],
                                    {type: 'br', style: {flexDirection: 'row'}}
                                ],
                                {type: 'br-list-item'}
                            ]}
                        />
                    </View>
                </View>
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
                        {type: 'button-image', prop: 'cancel', filter: value => { return value ? require('../../assets/wz_quxiao.png') : require('../../assets/za_jia.png')}, style: {height: 58, width: 58, marginBottom: 5, alignItems: 'flex-end'}},
                    ]}
                />
                <Modal 
                    isVisible={this.state.visible}
                    onSwipeComplete={() => this.setState({ visible: false })}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={{justifyContent: 'flex-end', margin: 0}}>
                    <Freedomen.Region 
                        event={params => {
                            this.setState({
                                visible: false
                            })
                        }}
                        columns={[
                            {type: 'button-text', value: '分类管理', style: {padding: 15}},
                            {type: 'button-text', value: '分类管理', style: {padding: 15}},
                            {type: 'button-text', value: '分类管理', style: {padding: 15}},
                            {type: 'br', style: {backgroundColor: 'white'}}
                        ]}
                    />
                </Modal>
            </View>
            
        );
    }
  }