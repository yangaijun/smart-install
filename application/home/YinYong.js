import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {ScrollView, StatusBar, View} from 'react-native'
import columns from '../region/columns'
import datas from '../region/datas'  

export default  class  extends React.Component {
    constructor(props) {
        super(props) 
    }
    componentWillMount() {
        let  param =  {
            userName: 'admin',
            password: '123456'
        } 
        Freedomen.global.api.call('/JasoUser/loginPc', param).then(res => {
            console.warn('登录成功')
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
                                const to = (router, params) => {
                                    if (!params) {
                                        params = {}
                                    }
                                    params.router = router
                                    this.props.navigation.navigate('XM_XuanZe', params)
                                }
                                if (params.value.row.label == '物资')
                                    to('WZ_Home')
                                else if (params.value.row.label == '实测实量')
                                    to('SCSL_Home')
                                else if (params.value.row.label == '质量')
                                    to('ZA_Home', {type: 1, label: params.value.row.label})
                                else if (params.value.row.label == '安全')
                                    to('ZA_Home', {type: 2, label: params.value.row.label})
                                else if (params.value.row.label == '日报')
                                    to('RZY_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '工作')
                                    to('GZ_Home', {label: '的' + params.value.row.label})
                                else if (params.value.row.label == '施工日志')
                                    to('SGRZ_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '记工')
                                    to('JG_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '机械')
                                    to('JX_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '文件')
                                    to('WJ_Home')
                                else if (params.value.row.label == '考勤')
                                    to('KQ_Home', {label: '阿里爹爹'})
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