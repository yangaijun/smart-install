import React from 'react'
import {ScrollView, View, Alert} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
import valid from '../../region/validations' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '生产情况',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        sgrz_shenchanqinkuan: (data) => {
                            Freedomen.redux({
                                sgrz_xinjian: info => {
                                    return {
                                        ...info,
                                        shenchanqinkuans: data.list 
                                    }
                                }
                            })
                        }
                    })
                    navigation.goBack()
                }}
                columns={[
                    {type: 'button-right', value: '确认'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = { 
            data: props.navigation.state.params
        } 
    } 
    componentDidMount() { } 
    render() { 
        return (
            <ScrollView style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        if (params.value && params.value.prop == 'bianji')
                            this.props.navigation.push('SGRZ_ShenChanQinKuaiXiuGai', params.value.row)
                        else if (params.value && params.value.prop == 'shanchu') { 
                            Alert.alert('删除', '确认删除？', [{
                                text: '确认',
                                onPress: () => {  
                                    params.row.splice(params.index, 1)
                                    this.setState({
                                        data: {
                                            list: params.row
                                        }
                                    })
                                }
                            }, { text: '取消' }])
                        } else if (params.prop == 'shigonbuwei')
                            this.props.navigation.push('CP_ShiGonBuWei', {...params.row, label: '施工部位', formName: 'sgrz_shenchanqinkuan'})
                        else if (params.prop == 'shigonneiron')
                            this.props.navigation.push('CP_ShiGonNeiRon', {...params.row, label: '施工内容', formName: 'sgrz_shenchanqinkuan'})
                        else if (params.prop == 'tianjiashenchanqinkuan') {
                            if (valid(params.row, 'SGRZ_ShenChanQinKuan')) {
                                params.row.list.push({
                                    ...params.row, 
                                    list: undefined 
                                })
                                return {...params.row, constructProgressConstructPart: '', constructContentName: '', 'productionStartTime': '', productionEndTime: '', productionWorkLoad: ''}
                            } else {
                                return params.row
                            }
                        }
                    }}
                    data={this.state.data}
                    redux={'sgrz_shenchanqinkuan'}
                    columns={[
                        {type: 'views', prop: 'list', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                            {type: 'text-list', prop: '$index', filter: value => value + 1},
                            [
                                {type: 'text-h5', filter: (value, data) => `时间：${data.productionStartTime} -  ${data.productionEndTime}`},
                                {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                                {type: 'text-h5', prop: 'constructContentName', filter: value => `施工内容：${value}`},
                                {type: 'text-h5', prop: 'productionWorkLoad', filter: (value, data) => `完成工作量：${value} (${data.constructContentUnit})`},
                                {type: 'br', style: {flex: 1}}
                            ], [
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'button-image-icon', prop: 'shanchu', value: require('../../assets/shanchu.png')},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-normal-row', style: {paddingTB: 10}}
                        ]},
                        columns.SGRZ_ShenChanQinKuan,
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'button-text-primary', prop: 'tianjiashenchanqinkuan', value: '添加生产情况', style: {marginLeft: 5}},
                            {type: 'br-form-row', style: {align: 'center', marginBottom: 2}}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }