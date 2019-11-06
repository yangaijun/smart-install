import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Text} from 'react-native' 
import CarouselPager from 'react-native-carousel-pager';
export default  class  extends React.Component {
    static navigationOptions = {
        title: '每日一练',
    }
    constructor(props) {
        super(props)
        let params = Freedomen.global.meiriyilian || this.props.navigation.state.params.list
        this.state = {
            list: params,
            data: {
                pre: params[params.length - 2].createTime,
                next: '----'
            }
        }
        this.index = this.state.list.length - 2
        console.log(this.state.list)
    }
    render() {
        return (
            <View style={{flex: 1, paddingVertical: '16%', backgroundColor: '#f5f5f5', paddingTop: '26%'}}>
                <Freedomen.Region 
                    style={{height: 52, alignItems: 'center', marginBottom: 15}}
                    data={this.state.data}
                    event={params => {
                        if (params.prop == 'pre') {
                            this.index --
                            let pre
                            if (this.index >= 0) {
                                pre = this.state.list[this.index].createTime 
                                this.carousel.goToPage(this.index)
                            } else this.index ++

                            return {
                                pre: pre,
                                next: this.state.list[this.index + 2] && this.state.list[this.index + 2].createTime
                            }
                        } else if (params.prop == 'next') {
                            this.index ++
                            let next
                            if (this.index < this.state.list.length) {
                                next = this.state.list[this.index].createTime 
                                this.carousel.goToPage(this.index)
                            } else this.index --

                            return {
                                pre: this.state.list[this.index - 2] && this.state.list[this.index - 2].createTime,
                                next: next
                            }
                        }
                    }}
                    columns={[
                        {type: 'button-text', prop: 'pre', value: '2019-08-07', style: {flex: 1, align: 'center'}},
                        {type: 'image-icon', value: require('../../assets/xx_riqi.png')},
                        {type: 'button-text', prop: 'next', value: '----', style: {flex: 1, align: 'center'}},
                        {type: 'br', style: {flexDirection: 'row', align: 'center', backgroundColor: 'white', width: '87', padding: 12,  borderRadius: 5}}
                    ]}
                />
                <CarouselPager  ref={ref => this.carousel = ref} initialPage={this.state.list.length} pageStyle={{backgroundColor: '#fff', borderRadius: 5}}>
                    {
                        this.state.list.map((el, key) => {
                            return <View key={key} style={{flex: 1, justifyContent: 'flex-end'}}>
                                <Freedomen.Region  
                                    event={params => {
                                        if (typeof el.studyDataOptions === 'string')
                                            el.studyDataOptions = el.studyDataOptions.split(';').map(el => {
                                                return {
                                                    xuanxian: el
                                                }
                                            })

                                        this.props.navigation.push('XX_TiaoZhanTiMu', el)
                                    }}
                                    data={el}
                                    columns={[
                                        {type: 'image', value: require('../../assets/xx_jianpai.png'), style: {align: 'center'}},
                                        {type: 'text-h1', prop: 'name', value: '水电工', style: {alignSelf: 'center', paddingTB: 15, fontWeight: 'bold'}},
                                        {type: 'text-primary', value: '来挑战吗？', style: {alignSelf: 'center', padding: 5}},
                                        {type: 'text',   prop: 'fail', style: {alignSelf: 'center', paddingBottom: 20}},
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