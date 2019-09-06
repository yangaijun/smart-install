import React from 'react'
import {Text, View, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'
export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            list: [],
            activity: ''
        }
    } 
    componentDidMount() {
        Freedomen.global.api.call('/Project/selectList').then(res => {
            this.setState({
                list: res
            })
        })
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
                    {type: 'tags-tab', value: '正在进行', options: '正在进行,已竣工'},
                    {type: 'br-row', style: {marginBottom: 1, align: 'center', paddingTB: 5}}
                ]}
            />
            <ScrollView>
                {
                    this.state.list.map((el, key) => {
                        return <Freedomen.Region 
                            key={key}
                            data={el}
                            event={params => {
                                if (params.prop == 'row') {
                                    this.props.navigation.push('XM_Home', params.row)
                                }
                            }}
                            columns={[
                                {type: 'image', prop: 'projectIcon', value: require('../assets/image_header.png'), style: {height: 65, width: 85, borderRadius: 3, paddingRight: 10}},
                                [
                                    {type: 'text-h4', prop: 'projectName', value: '歌林小镇综合机电安装工程', style: {paddingBottom: 10}},
                                    {type: 'text', value: '张无忌', filter: value => `项目负责人：${value}`},
                                    {type: 'br', style: {marginLeft: 10}}
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