import React from 'react'
import {Image, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'
import Swiper from 'react-native-swiper'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const title = (name, prop) => {
            return [
                {type: 'text', value:'', style: {height: 20, width: 4, backgroundColor: '#2EBBC4', marginRight: 5}},
                {type: 'text-title', value: name},
                {type: 'button-text', prop: prop, value: '更多'},
                {type: 'image', value: require('../assets/right.png'), style: {width: 16, height: 16}},
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f5f5f5'}}
            ]
        }
        const Stxx = title('视听学习', 'shitinxuexi'), Ydzl = title('阅读资料', 'yueduziliao'), Dtjh = title('答题精华', 'datijinhua')

        return (
            <ScrollView>
            
            <Freedomen.Region 
                event={params => {
                    if (params.prop == 'meiriyilian')
                        this.props.navigation.push('XX_MeiRiYiLian')
                    else if (params.prop == 'zaixiantiku')
                        this.props.navigation.push('XX_ZaiXianTiKu')
                    else if (params.prop == 'shijian')
                        this.props.navigation.push('XX_ShiJian')
                }}
                columns={[
                    [
                        {type: 'image-item', value: require('../assets/xx_meiriyilian.png')},
                        {type: 'text-h4', value: '每日一练'},
                        {type: 'click', prop: 'meiriyilian', style: {align: 'center', flex: 1}}
                    ], [
                        {type: 'image-item',  value: require('../assets/xx_zaixiantiku.png')},
                        {type: 'text-h4', value: '在线题库'},
                        {type: 'click', prop: 'zaixiantiku', style: {align: 'center', flex: 1}}
                    ], [
                        {type: 'image-item', value: require('../assets/xx_shijian.png')},
                        {type: 'text-h4', value: '事件'},
                        {type: 'click', prop: 'shijian', style: {align: 'center', flex: 1}}
                    ], [
                        {type: 'image-item',  value: require('../assets/xzhilian.png')},
                        {type: 'text-h4', value: '签到'},
                        {type: 'click', prop: 'jianchaxian', style: {align: 'center', flex: 1}}
                    ],
                    {type: 'br-row', style: {width: '98', borderRadius: 5}}
                ]} 

                />

                <Swiper autoplay={true} style={{height: 160, width: '100%', backgroundColor: 'white', paddingTop: 10}}>
                    {
                        [require('../assets/banner1.jpg'), require('../assets/banner2.jpg'), require('../assets/banner3.jpg'), require('../assets/banner4.jpg')].map((el, key) => {
                            return <Image source={el} key={key} style={{width: '96%', height: 160, alignSelf: 'center', borderRadius: 5}} />
                        })
                    }
                </Swiper>

                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'shitinxuexi')
                            this.props.navigation.push('XX_ShiTinXueXi')
                        else if (params.prop == 'yueduziliao')
                            this.props.navigation.push('XX_YueDuZiLiao')
                        else if (params.prop == 'datijinhua')
                            this.props.navigation.push('XX_DaTiJinHua')
                    }}
                    columns={[
                        Stxx, 
                        {type: 'views', prop: 'XinWenZiXun', value: [{},{}], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                            {type: 'text-h4', value: '天外飞来了一头猪'},
                            {type: 'text', value: '19-08-11'},
                            {type: 'click-col'}
                        ]},
                        Ydzl,
                        {type: 'views', prop: 'XinWenZiXun', value: [{},{}], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                            {type: 'text-h4', value: '天外飞来了一头猪'},
                            {type: 'text', value: '19-08-11'},
                            {type: 'click-col'}
                        ]},
                        Dtjh,
                        {type: 'views', prop: 'XinWenZiXun', value: [{},{}], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                            {type: 'text-h4', value: '天外飞来了一头猪'},
                            {type: 'text', value: '19-08-11'},
                            {type: 'click-col'}
                        ]}
                    ]}
                />
            </ScrollView>
        );
    }
  }