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

import GonZuoHome from '../page/GonZuo/GonZuoHome'
import ZhiLianJianCha from '../page/GonZuo/ZhiLianJianCha'
import ZhiLianZhenGai from '../page/GonZuo/ZhiLianZhenGai'
import GonZuoXinJian from '../page/GonZuo/GonZuoXinJian'

import SC_JinXinZhon from '../page/ShiCeShiLian/SC_JinXinZhon'
import SC_YanShou from '../page/ShiCeShiLian/SC_YanShou'
import GuoLvQiRuKou from '../page/ShiCeShiLian/GuoLvQiRuKou'
import BaoDianQinDan from '../page/ShiCeShiLian/BaoDianQinDan'
import ShiCeShiLian from '../page/ShiCeShiLian/ShiCeShiLian'
import WenTiXianQin from '../page/ShiCeShiLian/WenTiXianQin'
import SC_ZhiPai from '../page/ShiCeShiLian/SC_ZhiPai'
import MiaoDian from '../page/ShiCeShiLian/MiaoDian'
import WoDeRenWu from '../page/ShiCeShiLian/WoDeRenWu'
import XinZen from '../page/ShiCeShiLian/XinZen'
import TonJi from '../page/ShiCeShiLian/TonJi' 
import ZhenGaiRen from '../page/ShiCeShiLian/ZhenGaiRen'

import XianMuHome from '../page/XianMu/XianMuHome'
import WuZiGuanLi from '../page/XianMu/WuZiGuanLi'
import RuKu from '../page/XianMu/RuKu'
import XinJianWuZi from '../page/XianMu/XinJianWuZi'

import RiZhouYueBao_Page from  '../page/RiZhouYueBao'
import WuZi_Page from '../page/WuZi'
import ZhiLianAnQuan_Page from '../page/ZhiLianAnQuan'
import XueXi_Page from '../page/XueXi'

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


const ShiCeShiLianHome = createBottomTabNavigator({
    WoDeRenWu: WoDeRenWu,
    TonJi: TonJi,
},{
    tabBarOptions: {
        activeTintColor: '#2EBBC4',
        inactiveTintColor: '#cacaca',
    },
    navigationOptions :{
        title:'实测实量', 
    }
});
  
const AppNavigator = createStackNavigator({
    Home: Home,
    ShiCeShiLianHome: ShiCeShiLianHome,
    GuoLvQiRuKou: GuoLvQiRuKou,
    ShiCeShiLian: ShiCeShiLian,
    MiaoDian: MiaoDian,
    WenTiXianQin: WenTiXianQin,
    ZhenGaiRen: ZhenGaiRen,
    SC_ZhiPai: SC_ZhiPai,
    XinZen:XinZen,
    // XianMuHome: XianMuHome,
    // WuZiGuanLi: WuZiGuanLi,
    // RuKu: RuKu,
    // XinJianWuZi: XinJianWuZi,
    SC_JinXinZhon: SC_JinXinZhon,
    SC_YanShou: SC_YanShou,
    ZiXun: ZiXun,
    BaoDianQinDan: BaoDianQinDan,
    GonZuoHome: GonZuoHome,
    ZhiLianJianCha: ZhiLianJianCha,
    ZhiLianZhenGai: ZhiLianZhenGai,
    GonZuoXinJian: GonZuoXinJian,
    
    //日报 周报 月报
    ...RiZhouYueBao_Page,
    //物资
    ...WuZi_Page,
    //质量安全
    ...ZhiLianAnQuan_Page,
    //学习模块
    ...XueXi_Page
}, {
    initialRouteName: "Home",
});
  
export default createAppContainer(AppNavigator);
 