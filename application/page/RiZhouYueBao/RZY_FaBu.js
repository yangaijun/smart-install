import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
const Search = columns.ZA_Search('请输入创建人查询')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: <Freedomen.Region 
                event={params => {
                }}
                columns={[
                    {type: 'button-image-right', value: require('../../assets/shaixuan.png')},
                    {type: 'button-image-right', value: require('../../assets/tianjia.png')},
                    {type: 'br', style: {flexDirection: 'row'}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 10}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        }
                    }}
                    columns={[
                        Search,
                        [ 
                            {type: 'tags', value: '我的日报', options: '我的日报,全部日报', style: {borderWidth: 0, color: '#191919', flex: 1, borderRadius: 22, height: 40}},
                            {type: 'br-row', style: {marginBottom: 1, align: 'center', marginTop: 5, borderTopColor:　'#f5f5f5', borderTopWidth: 1, paddingBottom: 0}}
                        ]
                    ]}
                />
                <ScrollView>
                {
                    [1,2].map(e => {
                        return <Freedomen.Region 
                            key={e}
                            columns={[
                                [
                                    {type: 'text-h4', value: '歌林小镇综合',style: {flex: 1}},
                                    {type: 'text', value: '19-06-22 星期六'},
                                    {type: 'br', style: {flexDirection: 'row', alignItems: 'center'}}
                                ], [
                                    {type: 'image', value: require('../../assets/image_header.png'), style: {width: 80, height: 60, marginRight: 5}},
                                    {type: 'text', value: '今日总结： 来是是，天天都是来勘查， 加时。 东奔西走喝茶时嘲框架是哥斯达黎加是鞋架芝加哥进国,达黎加是鞋架芝加哥进国', style: {lineHeight: 22, flex: 1}},
                                    {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingTB: 5}}
                                ], [
                                    {type: 'text', value: '创建人： 王大头', style: {flex: 1}},
                                    {type: 'button-az', value: '评论'},
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