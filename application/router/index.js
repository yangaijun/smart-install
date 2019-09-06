import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
 

import React from 'react'

import BottomBar from './BottomBar.js'
import HeaderBar from './HeaderBar'

import XueXi from '../home/XueXi'
import GonZuoTai from '../home/GonZuoTai'
import TianJia from '../home/TianJia'
import XianMu from '../home/XianMu'
import YinYong from '../home/YinYong'

import ZiXun from '../page/ZiXun'
import ZhiLianJianCha from '../page/GonZuo/ZhiLianJianCha'
import ZhiLianZhenGai from '../page/GonZuo/ZhiLianZhenGai'
import CP_UserList from '../page/CP_UserList'

// import SC_JinXinZhon from '../page/ShiCeShiLian/SC_JinXinZhon'
// import SC_YanShou from '../page/ShiCeShiLian/SC_YanShou'
// import GuoLvQiRuKou from '../page/ShiCeShiLian/GuoLvQiRuKou'
// import BaoDianQinDan from '../page/ShiCeShiLian/BaoDianQinDan'
// import ShiCeShiLian from '../page/ShiCeShiLian/ShiCeShiLian'
// import WenTiXianQin from '../page/ShiCeShiLian/WenTiXianQin'
// import SC_ZhiPai from '../page/ShiCeShiLian/SC_ZhiPai'
// import MiaoDian from '../page/ShiCeShiLian/MiaoDian'
// import WoDeRenWu from '../page/ShiCeShiLian/WoDeRenWu'
// import XinZen from '../page/ShiCeShiLian/XinZen'
// import TonJi from '../page/ShiCeShiLian/TonJi' 
// import ZhenGaiRen from '../page/ShiCeShiLian/ZhenGaiRen'


import ListChoose_Components from '../page/AListChoose';
import Public_Components from '../page/APublic';

import ShiCeShiLian_Page from '../page/ShiCeShiLian'
import KaoQin_Page from '../page/KaoQin'
import ShiGonRiZhi_Page from '../page/ShiGonRiZhi'
import GonZuo_Page from '../page/GonZuo'
import RiZhouYueBao_Page from  '../page/RiZhouYueBao'
import WuZi_Page from '../page/WuZi'
import ZhiLianAnQuan_Page from '../page/ZhiLianAnQuan'
import XueXi_Page from '../page/XueXi'
import JiGon_Page from '../page/JiGon'
import JiXie_Page from '../page/JiXie'
import WenJian_Page from '../page/WenJian';
import XianMu_Page from '../page/XianMu'

const Home = createBottomTabNavigator({
    GonZuoTai: GonZuoTai,
    YinYong: YinYong,
    TianJia: TianJia,
    XianMu: XianMu,
    XueXi: XueXi,
}, {
    initialRouteName: "YinYong",
    tabBarComponent: BottomBar,
    navigationOptions : ({navigation}) => { 
        return {
            header:  <HeaderBar navigation={navigation} />
        }
    }
});


const SCSL_Home = createBottomTabNavigator({
    SCSL_RenWu: ShiCeShiLian_Page.SCSL_RenWu,
    SCSL_TonJi: ShiCeShiLian_Page.SCSL_TonJi,
},{
    tabBarOptions: {
        activeTintColor: '#2EBBC4',
        inactiveTintColor: '#cacaca',
    },
    navigationOptions :{
        title:'实测实量', 
    }
});
  
const KQ_Home = createBottomTabNavigator({
    KQ_DaKa: KaoQin_Page.KQ_DaKa,
    KQ_TonJi: KaoQin_Page.KQ_TonJi,
},{
    tabBarOptions: {
        activeTintColor: '#2EBBC4',
        inactiveTintColor: '#cacaca',
    },
    navigationOptions : ({navigation}) => {
        return {
            title: navigation.state.params.label, 
        }
    }
});
const AppNavigator = createStackNavigator({
    Home: Home,
    // ShiCeShiLianHome: ShiCeShiLianHome,
    // GuoLvQiRuKou: GuoLvQiRuKou,
    // ShiCeShiLian: ShiCeShiLian,
    // MiaoDian: MiaoDian,
    // WenTiXianQin: WenTiXianQin,
    // ZhenGaiRen: ZhenGaiRen,
    // SC_ZhiPai: SC_ZhiPai,
    // XinZen:XinZen,
    // SC_JinXinZhon: SC_JinXinZhon,
    // SC_YanShou: SC_YanShou,
    // BaoDianQinDan: BaoDianQinDan,
    
    ZiXun: ZiXun,
    ZhiLianJianCha: ZhiLianJianCha,
    ZhiLianZhenGai: ZhiLianZhenGai,

    UserList: CP_UserList,
    //考勤
    KQ_Home: KQ_Home,
    KQ_YueLi: KaoQin_Page.KQ_YueLi,
    
    //选项列表
    ...ListChoose_Components,
    //实测实量
    SCSL_Home: SCSL_Home,
    ...ShiCeShiLian_Page,
    //公用组件  或者 库
    ...Public_Components,
    //施工日志
    ...ShiGonRiZhi_Page,
    //工作
    ...GonZuo_Page,
    //日报 周报 月报
    ...RiZhouYueBao_Page,
    //物资
    ...WuZi_Page,
    //质量安全
    ...ZhiLianAnQuan_Page,
    //学习模块
    ...XueXi_Page,
    //记工
    ...JiGon_Page,
    //机械
    ...JiXie_Page,
    //文件
    ...WenJian_Page,
    //项目
    ...XianMu_Page
}, {
    initialRouteName: "Home",
});
  
export default createAppContainer(AppNavigator);
 