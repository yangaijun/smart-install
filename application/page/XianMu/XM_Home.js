import React from 'react'
import {View, ScrollView} from 'react-native'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) =>{
        return {
            title: navigation.state.params.projectName
        }
    }
    constructor(props) {
        super(props)
        this.state = { 
            data: this.props.navigation.state.params
        }
        Freedomen.global.project = this.props.navigation.state.params
    }
    componentDidMount() {
        Freedomen.global.api.getWeather({
            "city":this.props.navigation.state.params.cityCode,
            "key":"8fd4655c8ad5b554912b1aa8c6ab1e89"
        }).then(response => {
            this.setState({
                data: {
                    ...this.state.data,
                    weather: response.data.lives[0].weather + " "+response.data.lives[0].temperature+"℃" + " " + response.data.lives[0].winddirection + "风" + response.data.lives[0].windpower + "级"
                }
            })
        })
    }
    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#f5f5f5'}}> 
                <Freedomen.Region  
                    data={this.state.data}
                    columns={[
                        [
                            {type: 'image-icon', value: require('../../assets/xm_tianqi.png')},
                            {type: 'text', prop: 'weather', value: '多云转晴 17-36℃', style: {fontSize: 12, color: '#878787'}},
                            {type: 'br-normal-row', style: {alignItems: 'center'}}
                        ],
                        {type: 'text', prop: 'projectName', style: {fontWeight: 'bold', fontSize: 18, color: '#191919', paddingTB: 6}},
                        [
                            {type: 'image-icon', value: require('../../assets/xm_dinwei.png'), style: {width: 14, height: 14, marginRight: 3}},
                            {type: 'text', prop: 'projectAddress', value: '地址', style: {fontSize: 12, color: '#878787'}},
                            {type: 'br-normal-row', style: {alignItems: 'center'}}
                        ],
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
                                    else if (params.value.row.label == '施工任务单')
                                        this.props.navigation.navigate('SGRWD_Home')
                                    
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