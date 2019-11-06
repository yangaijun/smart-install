import React from 'react'
import {ScrollView, Alert} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
import valid from '../../region/validations'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '施工进度',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        sgrz_shigonjidu: (data) => {
                            if (data.constructProgressStartTime) {
                                if (valid(data, 'SGRZ_ShiGonJinDu')) {
                                    data.list.push({
                                        ...data,
                                        list: undefined
                                    })
                                }
                            }
                            Freedomen.redux({
                                sgrz_xinjian: info => {
                                    return {
                                        ...info,
                                        shigonjidus: data.list 
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
    componentDidMount() { 
     
    } 
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => {
                        if (params.prop == 'banzu')
                            this.props.navigation.push('CP_BanZu', {...params.row, label: '班组', formName: 'sgrz_shigonjidu'})
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
                        }
                        else if (params.prop == 'shigonbuwei')
                            this.props.navigation.push('CP_ShiGonBuWei', {...params.row, label: '施工部位', formName: 'sgrz_shigonjidu'})
                        else if (params.prop == 'shigonneiron')
                            this.props.navigation.push('CP_ShiGonNeiRon', {...params.row, label: '施工内容', formName: 'sgrz_shigonjidu'})
                        else if (params.prop == 'tianjiashigonjindu') {
                            if (valid(params.row, 'SGRZ_ShiGonJinDu')) {
                                params.row.list.push({...params.row, list: undefined})
                                return {...params.row, constructProgressStartTime: '', constructContentName: '', constructProgressEndTime: '', 'constructProgressConstructPart': '', teamsName: ''}
                            } else {
                                return params.row
                            }
                        }
                    }}
                    data={this.state.data}
                    redux={'sgrz_shigonjidu'}
                    columns={[
                        {type: 'views', prop: 'list', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                            {type: 'text-list', prop: '$index', filter: value => value + 1},
                            [
                                {type: 'text-h5', filter: (value, data) => `时间：${data.constructProgressStartTime} -  ${data.constructProgressEndTime}`},
                                {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                                {type: 'text-h5', prop: 'constructContentName', filter: value => `施工内容：${value}`},
                                {type: 'text-h5', prop: 'teamsName', filter: value => `班组：${value}`},
                                {type: 'text-h5', prop: 'constructProgressNums', filter: value => `施工进度：${value + '%'}`},
                                {type: 'br', style: {flex: 1}}
                            ], [
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'button-image-icon', prop: 'shanchu', value: require('../../assets/shanchu.png')},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-normal-row', style: {paddingTB: 10}}
                        ]},
                        columns.SGRZ_ShiGonJinDu,
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'button-text-primary', prop: 'tianjiashigonjindu', value: '添加施工进度', style: {marginLeft: 5}},
                            {type: 'br-form-row', style: {align: 'center', marginBottom: 2}}
                        ]
                    ]}
                />
            </ScrollView>
                
        );
    }
  }