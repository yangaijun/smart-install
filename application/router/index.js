import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
 

import React from 'react'

import BottomBar from './BottomBar.js'
import HeaderBar from './HeaderBar'

import XueXi from '../home/XueXi'
import GonZuoTai from '../home/GonZuoTai'
import TianJia from '../home/TianJia'
import XianMu from '../home/XianMu'
import YinYong from '../home/YinYong'
import DenLu from '../home/DenLu'
import WanJiMiMa from '../home/WanJiMiMa';
import YinYongSheZhi from '../home/YinYongSheZhi'

import ZiXun from '../page/ZiXun' 
import CP_UserList from '../page/CP_UserList'
 
import ListChoose_Components from '../page/AListChoose';
import Public_Components from '../page/APublic';

import ShiCeShiLian_Page from '../page/ShiCeShiLian'
import KaoQin_Page from '../page/KaoQin'
import ShiGonRiZhi_Page from '../page/ShiGonRiZhi'
import GonZuo_Page from '../page/GonZuo'
import RiZhouYueBao_Page from  '../page/RiZhouYueBao'
import WuZi_Page from '../page/WuZi'
// import ZhiLianAnQuan_Page from '../page/ZhiLianAnQuan'
import ZhiLian_Page from '../page/ZhiLian';
import XueXi_Page from '../page/XueXi'
import JiGon_Page from '../page/JiGon'
import JiXie_Page from '../page/JiXie'
import WenJian_Page from '../page/WenJian';
import XianMu_Page from '../page/XianMu'
import GeRenZhonXin_Page from '../page/GeRenZhonXin';
import ShiGonRenWuDan_Page from '../page/ShiGonRenWuDan';

const Home = createBottomTabNavigator({
    GonZuoTai: GonZuoTai,
    YinYong: YinYong,
    XianMu: XianMu,
    TianJia: TianJia,
    XueXi: XueXi,
}, {
    initialRouteName: "GonZuoTai",
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
    tabStyle: {
        height: 65
    },
    navigationOptions : ({navigation}) => {
        return {
            title: navigation.state.params.label, 
        }
    }
});

const AppNavigator = createStackNavigator({
    YinYongSheZhi: YinYongSheZhi,
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
    // ...ZhiLianAnQuan_Page,
    ...ZhiLian_Page,
    //学习模块
    ...XueXi_Page,
    //记工
    ...JiGon_Page,
    //机械
    ...JiXie_Page,
    //文件
    ...WenJian_Page,
    //项目
    ...XianMu_Page,
    //个人中心
    ...GeRenZhonXin_Page,
    //施工任务单
    ...ShiGonRenWuDan_Page
}, {
    initialRouteName: "Home",
});

const LAF = createStackNavigator({
    DenLu: {
        screen: DenLu,
        navigationOptions: {
            header:　null
        }
    },
    WanJiMiMa: WanJiMiMa
}, {
    initialRouteName: 'DenLu',
    headerMode: 'float',  
})

const Entry = createSwitchNavigator({
    DenLu: LAF,
    AppNavigator: {
        screen: AppNavigator
    } 
}, {
    initialRouteName: "DenLu",
})

export default createAppContainer(Entry);
 