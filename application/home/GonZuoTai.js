import React from 'react'
import {Text, Image, ScrollView} from "react-native";
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
            }
        }
    }
    componentWillMount() {console.log(this.state.data)
        Freedomen.global.api.get('api/newsInfo/admin/getNewsInfoList', {
            pageSize: 2
        }).then(res => { 
        })
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#f5f5f5'}}> 
                <Swiper autoplay={true} style={{height: 160, width: '100%', backgroundColor: 'white', paddingTop: 10}}>
                {
                    [require('../assets/banner1.jpg'), require('../assets/banner2.jpg'), require('../assets/banner3.jpg'), require('../assets/banner4.jpg')].map((el, key) => {
                        return <Image source={el} key={key} style={{width: '96%', height: 160, alignSelf: 'center', borderRadius: 5, resizeMode: 'cover'}} />
                    })
                }
                </Swiper>
                <Freedomen.Region 
                    event={params => { 
                        if (params.prop == 'zixun_more') 
                            this.props.navigation.push('ZiXun')
                        else if (params.value.row && ['负责的','分派的', '参与的'].includes(params.value.row.label))
                            this.props.navigation.push('GonZuoHome', params.value.row)
                        else if (params.value.row && params.value.row.label == '新建') 
                            this.props.navigation.push('GonZuoXinJian')
                    }}
                    data={this.state.data}
                    columns={[
                        [
                            {type: 'text-h4', value: '星期一  6月10日', style: {paddingTB: 10, width: '96' }},
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