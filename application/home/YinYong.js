import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {ScrollView, View} from 'react-native'
import columns from '../region/columns'
import datas from '../region/datas'  
import store from 'react-native-freedomen/store';
export default  class  extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            list: []
        }
        this.menuList = Freedomen.global.user && Freedomen.global.user.menuList.map( el => el.menuName) || []
    }
    componentWillMount() {
        this._setMenu()
        Freedomen.global.setMenuList = () => {
            this._setMenu()
        }
    }
    _setMenu() {
        let newMenuList = []
        if (!Freedomen.global.controlMenuList)
            Freedomen.global.controlMenuList = []
        datas.YinYon.map(el => {
            let list = el.item.filter(i =>  this.menuList.includes(i.label) && Freedomen.global.controlMenuList.includes(i.label))
            if (list.length) {
                newMenuList.push({
                    title: el.title,
                    item: list
                })
            }
        })
        this.setState({
            list: newMenuList
        })
    }
    render() {
        return (
            <ScrollView style={{flex: 1,  backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
                {
                    this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            key={key}
                            data={el}
                            event={params => { 
                                const to = (router, params) => {
                                    if (!params) {
                                        params = {}
                                    }
                                    params.router = router
                                    // this.props.navigation.navigate(router, params)
                                    this.props.navigation.navigate('XM_XuanZe', params)
                                }
                                if (params.value.row.label == '物资')
                                    to('WZ_Home')
                                else if (params.value.row.label == '实测实量')
                                    to('SCSL_Home')
                                else if (params.value.row.label == '质量')
                                    to('ZL_Home', {type: 1})
                                else if (params.value.row.label == '安全')
                                    to('ZL_Home', {type: 2})
                                else if (params.value.row.label == '日报')
                                    to('RZY_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '工作')
                                    this.props.navigation.navigate('GZ_Home', {label: '阿里爹爹'}) 
                                else if (params.value.row.label == '施工日志')
                                    to('SGRZ_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '记工')
                                    to('JG_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '机械')
                                    to('JX_Home', {label: params.value.row.label})
                                else if (params.value.row.label == '文件')
                                    to('WJ_Home')
                                else if (params.value.row.label == '考勤')
                                    this.props.navigation.navigate('KQ_Home', {label: '阿里爹爹'})
                                else if (params.value.row.label == '模型浏览')
                                    to('XM_MoXinLiuLan')
                                else if (params.value.row.label == '施工任务单')
                                    to('SGRWD_Home')
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