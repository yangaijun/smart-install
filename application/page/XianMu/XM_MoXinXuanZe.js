import React from 'react'
import {View, ScrollView} from 'react-native'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '选择模型'
        }
    }
    constructor(props) {
        super(props)
        this.state = {  
        } 
    }
    componentDidMount() {
        Freedomen.global.api.call('/Bimface/getModelViewToken', Freedomen.global.project).then(res => {
            console.log(1, res)
        })
    }
    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#f5f5f5'}}> 
                <Freedomen.Region  
                    data={this.state.data}
                    columns={[
                        {type: 'text-h4', prop: 'projectName'},
                        {type: 'text-h5', prop: 'weather', value: '多云转晴 17-36℃'},
                        {type: 'text', prop: 'projectAddress', value: '地址', style: {paddingTop: 5}},
                        {type: 'br', style: {marginBottom: 1, backgroundColor: 'white', padding: 10}}
                    ]}
                />  
                <ScrollView style={{flex: 1,  backgroundColor: 'white'}}>
                    {
                        datas.XianMu.map((el, key) => {
                            return <Freedomen.Region 
                                key={key}
                                data={el}
                                event={params => { 
                                    if (params.value.row.label == '物资')
                                        this.props.navigation.navigate('WZ_Home')
                                    else if (params.value.row.label == '实测实量')
                                        this.props.navigation.navigate('SCSL_Home')
                                    else if (params.value.row.label == '质量')
                                        this.props.navigation.navigate('ZL_Home', {type: 1})
                                    else if (params.value.row.label == '安全')
                                        this.props.navigation.navigate('ZL_Home', {type: 2})
                                    else if (params.value.row.label == '记工')
                                        this.props.navigation.navigate('JG_Home', {label: params.value.row.label})
                                }}
                                columns={ columns.YinYon }
                            />
                        })
                    }
                </ScrollView>
            </View>
        );
    }
  }