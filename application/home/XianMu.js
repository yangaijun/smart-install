import React from 'react'
import {Text, View, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            list: [{},{},{}],
            activity: ''
        }
    } 
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}} >
            <Freedomen.Region 
                event={params => { 
                    this.setState({
                        activity: params.value,
                    } )
                }}
                columns={[ 
                    {type: 'tags', value: '正在进行', options: '正在进行,已竣工', style: {borderWidth: 0, color: '#191919', flex: 1}},
                    {type: 'br-row', style: {marginBottom: 1, align: 'center', paddingTB: 5}}
                ]}
            />
            <ScrollView>
                {
                    this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            key={key}
                            event={params => {
                                if (params.prop == 'row') {
                                    this.props.navigation.push('XianMuHome')
                                }
                            }}
                            columns={[
                                {type: 'image', value: require('../assets/image_header.png'), style: {height: 55, width: 55, borderRadius: 5, paddingRight: 15}},
                                [
                                    {type: 'text-h3', value: '歌林小镇综合机电安装工程'},
                                    {type: 'text', value: '张无忌', filter: value => `项目负责人：${value}`},
                                    {type: 'br', style: {marginLeft: 15}}
                                ],
                                {type: 'click-row', prop: 'row', style: {marginBottom: 1}}
                            ]}
                        />
                    })
                }
               
            </ScrollView>
        </View>
        );
    }
  }