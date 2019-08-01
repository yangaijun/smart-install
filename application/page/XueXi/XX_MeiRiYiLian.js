import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
import CarouselPager from 'react-native-carousel-pager';
export default  class  extends React.Component {
    static navigationOptions = {
        title: '每日一练',
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{flex: 1, paddingVertical: '16%', backgroundColor: '#f5f5f5', paddingTop: '26%'}}>
                <Freedomen.Region 
                    style={{height: 52, alignItems: 'center', marginBottom: 15}}
                    columns={[
                        {type: 'pick-date', prop: 'f', value: '2019-08-07', style: {flex: 1, align: 'center'}},
                        {type: 'image-icon', value: require('../../assets/xx_riqi.png')},
                        {type: 'pick-date', prop: 'c', value: '2019-08-07', style: {flex: 1, align: 'center'}},
                        {type: 'br', style: {flexDirection: 'row', align: 'center', backgroundColor: 'white', width: '87', padding: 5,  borderRadius: 5}}
                    ]}
                />
                <CarouselPager  ref={ref => this.carousel = ref} initialPage={2} pageStyle={{backgroundColor: '#fff', borderRadius: 5}}>
                    {
                        [1,2,3].map((el, key) => {
                            return <View key={key} style={{flex: 1, justifyContent: 'flex-end'}}>
                                <Freedomen.Region  
                                    event={params => {
                                        this.props.navigation.push('XX_TiaoZhanTiMu', {label: '2019-08-07'})
                                    }}
                                    columns={[
                                        {type: 'image', value: require('../../assets/xx_jianpai.png'), style: {align: 'center'}},
                                        {type: 'text-h1', value: '水电工', style: {alignSelf: 'center', paddingTB: 15, fontWeight: 'bold'}},
                                        {type: 'text-primary', value: '来挑战吗？', style: {alignSelf: 'center', padding: 5}},
                                        {type: 'text', value: '19.78% 的人数败给这道题', style: {alignSelf: 'center', paddingBottom: 20}},
                                        {type: 'button-primary', value: '进入挑战', style: {borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingTB: 14, fontSize: 22, fontWeight: '800'}},
                                    ]}
                                />
                            </View>
                        })
                    }
                </CarouselPager>
            </View>
        );
    }
  }