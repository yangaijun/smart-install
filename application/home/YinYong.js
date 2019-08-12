import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {ScrollView, StatusBar, View} from 'react-native'
import columns from '../region/columns'
import datas from '../region/datas'
const Md5 = require('js-md5')
export default  class  extends React.Component {
    constructor(props) {
        super(props) 
    }
    componentWillMount() {
        let  param =  {
            username: 'wqer',
            password: Md5('123456')
        } 
        Freedomen.global.api.post('api/user/login', param).then(res => {
            Freedomen.global.project = {projectId: 79}       
            Freedomen.global.user = res
        })  
    }
    render() {
        return (
            <ScrollView style={{flex: 1,  backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
                <StatusBar translucent={false} backgroundColor='#fff' barStyle="dark-content" />
                {
                    datas.YinYon.map((el, key) => {
                        return <Freedomen.Region 
                            key={key}
                            data={el}
                            event={params => { 
                                if (params.value.row.label == '物资')
                                    this.props.navigation.navigate('WZ_Home')
                                else if (params.value.row.label == '实测实量')
                                    this.props.navigation.navigate('WoDeRenWu')
                                else if (params.value.row.label == '质量')
                                    this.props.navigation.navigate('ZA_Home', {type: 1, label: params.value.row.label})
                                else if (params.value.row.label == '安全')
                                    this.props.navigation.navigate('ZA_Home', {type: 2, label: params.value.row.label})
                                else if (params.value.row.label == '日报')
                                    this.props.navigation.navigate('RZY_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '工作')
                                    this.props.navigation.navigate('GZ_Home', {label: '的' + params.value.row.label})
                                else if (params.value.row.label == '施工日志')
                                    this.props.navigation.navigate('SGRZ_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '记工')
                                    this.props.navigation.navigate('JG_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '机械')
                                    this.props.navigation.navigate('JX_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '文件')
                                    this.props.navigation.navigate('WJ_Home')
                            }}
                            columns={ columns.YinYon }
                        />
                    })
                }
                <View style={{height: 20}}> 
                </View>
            </ScrollView>
        );
    }
  }