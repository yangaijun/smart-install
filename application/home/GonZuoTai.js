import React from 'react'
import {Text, Image, StatusBar, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen' 
import Swiper from 'react-native-swiper'
import columns from '../region/columns'
import datas from '../region/datas'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
               ...datas.GonZuo 
            },
            banner: [{}, {}, {}, {}]
        }
    }
    componentWillMount() {  
        let fn = () => {
            Promise.all([
                Freedomen.global.api.call('/ImageRotation/select', {pageVo: {pageNo: 1, pageSize: 15}}),  
                Freedomen.global.api.call('/NewsInfo/select', {pageVo: {pageNo: 1, pageSize: 2}}),
                Freedomen.global.api.call('/ConstructLog/select', {
                    jasoUserId: Freedomen.global.user.jasoUserId, pageVo: {
                    pageNo: 1,
                    pageSize: 4
                }})
            ]).then(res => {
                let arr = res[2].data.map(el => {
                    let content = el.contentList.length ? el.contentList[0] : {}
                    let date = new Date(el.constructLog.constructDate) 
                    let week = '星期' + ({
                        1: '一',
                        2: '二',
                        3: '三',
                        4: '四',
                        5: '五',
                        6: '六',
                        0: '日'
                    }[date.getDay()] || '')
     
                    let shigonjindus = [], gonzuoneirons = [], shenchanqinkuans = []
                    el.contentList.map(el => {
                        if (el.constructProgressStartTime) {
                            shigonjindus.push(el)
                        } else if (el.jobContentContentType) {
                            gonzuoneirons.push(el)
                        } else if (el.productionWorkLoad) {
                            shenchanqinkuans.push(el)
                        }
                    })
                    return {
                        ...el.constructLog,
                        ...content,
                        week: week,
                        shigonjindus: shigonjindus,
                        gonzuoneirons: gonzuoneirons,
                        shenchanqinkuans: shenchanqinkuans
                    }
                })  
                this.setState({
                    banner: res[0].data,
                    data: {
                        XinWenZiXun: res[1].data,
                        sgrz: arr
                    }
                })
            })
        }
        let i = 0
        let timer = setInterval(() => {
            i ++
            if (i >= 10) {
                clearInterval(timer)
            }
            if (Freedomen.global.user) {
                fn()
                clearInterval(timer)
            }
        }, 400);
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#f5f5f5'}}> 
                <StatusBar translucent={false} backgroundColor='#fff' barStyle="dark-content" />
                <Swiper autoplay={true} style={{height: 150, width: '100%', backgroundColor: 'white', paddingTop: 10}}>
                {
                    this.state.banner.map((el, key) => {
                        return <Image source={{uri: `http://www.jasobim.com:8085/${el.imageRotationUrl}`}} key={key} style={{width: '96%', height: 132, alignSelf: 'center', borderRadius: 3, resizeMode: 'cover'}} />
                    })
                }
                </Swiper>
                <Freedomen.Region 
                    event={params => {  
                        if (params.prop == 'zixun_more') 
                            this.props.navigation.push('ZiXun')
                        else if (params.value.row && ['负责的', '分派的', '参与的'].includes(params.value.row.label))
                            this.props.navigation.push('GZ_Home', {type: {'负责的': 1, '分派的': 2, '参与的': 3}[params.value.row.label], label: params.value.row.label})
                        else if (params.value.row && params.value.row.label == '新建') 
                            this.props.navigation.push('GZ_XinJian')
                        else if (params.prop == 'kaoqin_qudaka')
                            this.props.navigation.navigate('KQ_Home', {label: '阿里爹爹'})
                        else if (params.value && params.value.prop == 'into') {
                            this.props.navigation.push('P_View', {uri: params.value.row.content, ...params.value.row})
                        } else if (params.value && params.value.prop == 'sgrz-detail') {
                            this.props.navigation.push('SGRZ_XianQin', params.value.row)
                        } else if (params.prop == 'sgrz_more') {
                            params.router = 'SGRZ_Home'
                            params.label = '施工日志'
                            // this.props.navigation.navigate(router, params)
                            this.props.navigation.navigate('XM_XuanZe', params)
                        }
                    }}
                    data={this.state.data}
                    columns={[
                        [
                            {type: 'text-h4', prop: 'd', value: '星期一  6月10日', filter: () => {
                                let date = new Date() 
                                return '星期' + ({
                                    1: '一',
                                    2: '二',
                                    3: '三',
                                    4: '四',
                                    5: '五',
                                    6: '六',
                                    0: '日'
                                }[date.getDay()] || '') + '  ' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
                            }, style: {paddingTB: 10, width: '96' }},
                            {type: 'br', style: {backgroundColor: 'white', alignItems: 'center'}}
                        ], 
                        columns.GonZuoTai_KaoQin,
                        columns.GonZuoTai_GonZuo,
                        columns.GonZuoTai_ShiGonRiZhi,
                        columns.GonZuoTai_XinWenZiXun 
                    ]}
                />
            </ScrollView>
        );
    }
  }