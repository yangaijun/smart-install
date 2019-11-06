import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import {View, ScrollView} from 'react-native'
const Search = columns.ZA_Search()
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '奖惩',
            headerRight: <Freedomen.Region 
                event={params => { 
                    navigation.push('ZA_JianLiXinZen')
                }}
                columns={[
                    {type: 'button-image-right', value: require('../../assets/tianjia.png')}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
            <Freedomen.Region 
                style={{backgroundColor: 'white', padding: 5, paddingBottom:1}}
                event={params => { 
                    if (params.prop == '_clear') {
                        params.row.content = ''
                        return params.row
                    }
                }}
                columns={[
                    Search,
                    [ 
                        {type: 'tags-tab', value: '处罚单', prop: 'dm', options: '处罚单,奖励单'},
                        {type: 'br-row', style: {marginBottom: 1, align: 'center', marginTop: 5, borderTopColor:　'#f5f5f5', borderTopWidth: 1, paddingBottom: 0}}
                    ]
                ]}
            />
            <ScrollView>
                {
                    [1,2].map(e => {
                        return <Freedomen.Region 
                            columns={[
                                {type: 'text-h3', value: '歌林小镇综合'},
                                {type: 'text', value: '因为什么原因处罚', filter: value => `备注:${value}`, style: {paddingTB: 5}},
                                [
                                    {type: 'text', value: '金额:'},
                                    {type: 'text-must', value: 500, filter: value => `￥${value}`, style: {fontWeight: 'bold'}},
                                    {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    {type: 'text', value: '王大头', filter: value => `签发人:${value}`, style: {flex: 1}},
                                    {type: 'text', value: '2019-08-07', filter: value => `日期:${value}`},
                                    {type: 'br-bottoms'}
                                ],
                                {type: 'br-list-item'}
                                
                            ]}
                        />
                    })
                }
            </ScrollView>
        </View>
        );
    }
  }