import React from 'react'
import {ScrollView, Alert} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
import valid from '../../region/validations'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '工作内容',
            headerRight: <Freedomen.Region 
                event={params => { 
                    
                    Freedomen.redux({
                        sgrz_gonzuoneiron: (data) => {
                            Freedomen.redux({
                                sgrz_xinjian: info => {
                                    if (data.constructContentTypeName) {
                                        data.list.push({
                                            ...data,
                                            list: undefined
                                        })
                                    }
                                    return {
                                        ...info,
                                        gonzuoneirons: data.list 
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
                        if(params.value && params.value.prop == 'bianji')
                            this.props.navigation.push('SGRZ_GonZuoNeiRonXiuGai', params.value.row)
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
                        else if (params.prop == 'neironfenlei')
                            this.props.navigation.push('CP_NeiRonFenLei', {...params.row, label: '内容分类', formName: 'sgrz_gonzuoneiron'})
                        else if (params.prop == 'gonZuoNeiRonTianJia') {
                            if (valid(params.row, 'SGRZ_GonZuoNeiRon')) {
                                params.row.list.push({...params.row, list: undefined})
                                return {...params.row, jobContentRemark: '', jobConentContentDescribe: '', constructContentTypeName: ''}
                            } else {
                                return params.row
                            }
                        }
 
                    }}
                    redux={'sgrz_gonzuoneiron'}
                    data={this.state.data}
                    columns={[
                        {type: 'views', prop: 'list', style:{marginBottom: 2}, columns: [
                            {type: 'text', prop: '$index', filter: value => value + 1 + '、  ' },
                            [
                                {type: 'text-h5', prop: 'constructContentTypeName', filter: value => `内容分类：${value}`},
                                {type: 'text-h5', prop: 'jobConentContentDescribe', filter: value => `描述：${value || ''}`},
                                {type: 'text', prop: 'jobContentRemark', filter: value => `备注：${value || ''}`},
                                {type: 'br', style: {flex: 1}}
                            ], [
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'button-image-icon', prop: 'shanchu', value: require('../../assets/shanchu.png')},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-form-row'}
                        ]},
                        columns.SGRZ_GonZuoNeiRon,
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'text-primary',  value: '添加工作内容', style: {marginLeft: 5}},
                            {type: 'click-form-row', prop: 'gonZuoNeiRonTianJia', style: {align: 'center'}}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }