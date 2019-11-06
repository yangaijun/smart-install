import React from 'react'
import {Image, View, Text, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'
import Swiper from 'react-native-swiper' 

export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [{},{}],
            data: {
                ShiTinXueXi: [],
                YueDuZiLiao: [],
                qiandao: false
            }
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/StudyImage/select', {pageVo: {pageNo: 1, pageSize: 4}}).then(res => {
            this.setState({
                images: res.data
            })
        })
        Promise.all([
            Freedomen.global.api.call('/StudyFile/select', {pageVo: {pageSize: 2, pageNo: 1}, type: 1}),
            Freedomen.global.api.call('/StudyFile/select', {pageVo: {pageSize: 2, pageNo: 1}, type: 2}),
            Freedomen.global.api.call('/StudyData/selectMainList')
        ]).then(rs => {
            this.setState({
                data: {
                    ShiTinXueXi: rs[0].data,
                    YueDuZiLiao: rs[1].data,
                    DaTiJinHua: rs[2]
                }
            }) 
        })
        Freedomen.global.api.call('/StudyPractice/select').then(res => {
            Freedomen.global.meiriyilian = this.meiriyilian = res.map(el => {
                el.fail = (Math.random() * 50).toFixed(2) + '% 的人数败给这道题'
                return el
            })
        })
    }
    render() {
        const title = (name, prop) => {
            return [
                {type: 'text', value:'', style: {height: 14, width: 4, borderRadius: 2, backgroundColor: '#2EBBC4', marginRight: 5}},
                {type: 'text-title', value: name},
                {type: 'button-text', prop: prop, value: '更多'},
                {type: 'image', value: require('../assets/right.png'), style: {width: 16, height: 16}},
                {type: 'br', style: {flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f5f5f5'}}
            ]
        }
        const Stxx = title('视听学习', 'shitinxuexi'), Ydzl = title('阅读资料', 'yueduziliao'), Dtjh = title('答题精华', 'datijinhua')

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}> 
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'meiriyilian')
                                this.props.navigation.push('XX_MeiRiYiLian', {list: this.meiriyilian})
                            else if (params.prop == 'zaixiantiku')
                                this.props.navigation.push('XX_ZaiXianTiKu')
                            else if (params.prop == 'shijian')
                                this.props.navigation.push('XX_ShiJian')
                            else if (params.prop == 'qiandao')
                                Freedomen.global.api.call('/UserIntegralLog/add').then(res => {
                                    if (res && res === true)
                                        this.setState({qiandao: true})
                                    else 
                                        Freedomen.global.toast('今日已经签到了，明天再来吧')
                                })
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
                                {type: 'click', prop: 'qiandao', style: {align: 'center', flex: 1}}
                            ],
                            {type: 'br-row', style: {width: '98', borderRadius: 5}}
                        ]} 
                    />
                    <Swiper autoplay={true} style={{height: 150, width: '100%', backgroundColor: 'white', paddingTop: 10}}>
                        {
                            this.state.images.map((el, key) => {
                                return <Image source={{uri:  `http://www.jasobim.com:8085/${el.pic}`}} key={key} style={{width: '96%', height: 150, alignSelf: 'center', borderRadius: 5}} />
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
                            else if (params.value && params.value.prop == 'shitixianqin') {
                                this.props.navigation.push('XX_PlayVideo')
                            } else if (params.value && params.value.prop == 'timuxianqin') {  
                                this.props.navigation.push('XX_TiMuXianQin', params.value.row)
                            }
                        }}
                        data={this.state.data}
                        columns={[
                            Stxx, 
                            {type: 'views', prop: 'ShiTinXueXi', value: [], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                                [
                                    {type: 'text-h4', prop: 'title', value: '天外飞来了一头猪'},
                                    {type: 'text', prop: 'name', value: '19-08-11'},
                                    {type: 'br', style: {flex: 1}}
                                ],
                                [
                                    {type: 'image', value: require('../assets/play.png'), style: {width: 26, height: 26}},
                                    {type: 'backimage', prop: 'pic', filter: value =>`http://www.jasobim.com:8085/${value}`, style: {width: 120, height: 80, align: 'center'}},
                                ],
                                {type: 'click-col', prop: 'shitixianqin', style: {flexDirection:'row'}}
                            ]},
                            Ydzl,
                            {type: 'views', prop: 'YueDuZiLiao', value: [], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                                [
                                    {type: 'text-h4', prop: 'title', value: '天外飞来了一头猪'},
                                    {type: 'text', prop: 'name', value: '19-08-11'},
                                    {type: 'br', style: {flex: 1}}
                                ],
                                {type: 'image', prop: 'pic', filter: value =>`http://www.jasobim.com:8085/${value}`, style: {width: 120, height: 80}},
                                {type: 'click-col', prop: 'shitixianqin', style: {flexDirection:'row'}}
                            ]},
                            Dtjh,
                            {type: 'views', prop: 'DaTiJinHua', value: [], style: {backgroundColor: '#f5f5f5', paddingBottom: 7}, columns: [
                                {type: 'text-h4', prop: 'dataName', value: '天外飞来了一头猪'},
                                {type: 'text', prop: 'name', value: '19-08-11'},
                                {type: 'click-col', prop: 'timuxianqin'}
                            ]}
                        ]}
                    />
                    
                </ScrollView>
                {
                    !Freedomen.global.favourite.length && 
                    <View style={{position:　'absolute', width: '100%', height: '100%'}}>
                        <Freedomen.Region 
                            style={{width: '100', height: '100', backgroundColor:'white'}}
                            columns={[
                                [
                                    {type: 'text', style: {height: 2, width: 45, backgroundColor: '#2EBBC4'}},
                                    {type: 'text-primary', value: '选择你感兴趣的模块', style: {padding: 15}},
                                    {type: 'text', style: {height: 2, width: 45, backgroundColor: '#2EBBC4'}},
                                    {type: 'br-normal-row', style: {align: 'center'}}
                                ],
                                {type: 'tags', prop: 'tag', options: Freedomen.global.favouriteList || '', size: 5, style: {width: '28', borderRadius: 15, padding: 20, marginBottom: 5}},
                                {type: 'button-primary', prop: 'study', value: '进入学习', style: {width: 220, alignSelf: 'center', borderRadius: 22, marginTop: 15}}
                            ]}
                        />
                    </View> 
                }
                {
                    this.state.qiandao && 
                    <View 
                        style={{position:　'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center'}} >
                        <Text style={{position:　'absolute', width: '100%', height: '100%'}} onPress={() => {
                            this.setState({qiandao: false})
                        }}></Text>
                        <Freedomen.Region 
                            columns={[
                                {type: 'text', value: '恭喜获得 1 积分', style: {color: 'white'}},
                                {type: 'image', value: require('../assets/jifen.png')},
                                {type: 'text', value: '越努力越幸运 !', style: {color: 'white'}},
                                {type: 'br', style: {align: 'center'}}
                            ]}
                        />
                    </View> 
                }
            </View>
        );
    }
  }