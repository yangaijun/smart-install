import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View} from 'react-native' 
import P_PickImage from './P_PickImage';
import P_Sound from './P_Sound' 

export default  class  extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = { 
            data: {msg:[{}, {}, {},{isSelf: 1}]},
            jiaohu: {yuyin: '按住说话'}
        }
    }
    componentDidMount() { 
    } 
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    <Freedomen.Region 
                        data={this.state.data}
                        event={params => {
                           
                        }}
                        columns={[
                            [
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'text', value: '任务动态', style: {paddingLR: 10}},
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'br', style: {flexDirection: 'row', align: 'center', padding: 10}}
                            ], 
                            {type: 'views', prop: 'msg', value: [], columns: [
                                [
                                    [
                                        {type: 'image-header', prop: 'commentUserIcon', value: require('../../assets/image_header.png')},
                                        {type: 'text-h4', prop: 'commentUserName', value: '木工王大头'},
                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center',padding: 5}}
                                    ],
                                    {type: 'text', prop: 'commentContent', load: value => value, style: (value, data) => {
                                            let bgColor = {0: 'white', 1: '#2EBBC4', 2: '#fc2f68'}[data.type]
                                            let color = {0: 'black', 1: 'white', 2: 'white'}[data.type]
                                            return  {marginLeft: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                    }},
                                    {type: 'image', prop: 'pictures', value: require('../../assets/image_header.png'), load: value => value , style: {marginLeft: 42, width: 80, height: 80}},
                                    [
                                        {type: 'image', prop: 'voices', filter: () => {
                                            return require('../../assets/voice_right_3.png')
                                        }, style: {width: 25, height: 25}},
                                        {type: 'click', prop: 'voices', load: value => value, style: {marginLeft: 55, padding: 5, backgroundColor: '#ECF2F2', width: 140}}
                                    ],
                                    {type: 'text', value: '', prop: 'createDate', style: {marginLeft: 55, padding: 5}},
                                    {type: 'br', load: (value, data) => !data.isSelf, style: {padding: 10}}
                                ], [
                                    {type: 'image-header', prop: 'commentUserIcon',  value: require('../../assets/image_header.png')},
                                    {type: 'text', prop: 'commentContent', load: value => value, style: (value, data) => {
                                            let bgColor = {0: '#ECF2F2', 1: '#2EBBC4', 2: '#fc2f68'}[data.type]
                                            let color = {0: 'black', 1: 'white', 2: 'white'}[data.type]
                                            return  {marginRight: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                        } 
                                    },
                                    {type: 'image', prop: 'pictures', value: require('../../assets/image_header.png'), load: value => value , style: {marginRight: 55, width: 80, height: 80}},
                                    [
                                        {type: 'image', prop: 'voices', filter: () => {
                                            return require('../../assets/voice_left_3.png')
                                        }, style: {width: 25, height: 25}},
                                        {type: 'click', prop: 'voices', load: value => value, style: {marginRight: 55, padding: 5, backgroundColor: '#ECF2F2', width: 140, alignItems: 'flex-end'}}
                                    ],
                                    
                                    {type: 'text', value: '', prop: 'createDate', style:  {marginRight: 55, padding: 5}},
                                    {type: 'br', load: (value, data) => data.isSelf, style: {alignItems: 'flex-end', padding: 10}}
                                ]
                            ]} 
                        ]}
                    />
                </ScrollView>
                <Freedomen.Region 
                    style={{height: 52, backgroundColor: 'white'}}
                    event={params => {
                        if (params.prop == 'send') {
                           
                        } else if (params.prop == 'image') {
                            let pick = P_PickImage()
                            if (pick) {

                            }
                        } else if ('qiehuan' == params.prop) {
                            let qiehuan = params.value == require('../../assets/yuyinr.png') ? require('../../assets/jp.png') : require('../../assets/yuyinr.png')
                            return {isYuyin: !params.row.isYuyin, qiehuan: qiehuan}
                        } 
                    }}
                    data={this.state.jiaohu}
                    columns={[
                        {type: 'button-image-icon', prop: 'qiehuan', value: require('../../assets/yuyinr.png'), style: {width: 38, height: 38}},
                        {type: 'button-text', others: {
                            onPressIn: () => {
                                this.setState({
                                    jiaohu: {yuyin: '松开发送'}
                                })
                                P_Sound.startRecording()
                                
                            },
                            onPressOut: () => {
                                this.setState({
                                    jiaohu: {yuyin: '按住说话'}
                                })
                                P_Sound.stopRecording().then(upload => {
                                    console.log(upload)
                                })
                            }
                        }, prop: 'yuyin', load:(value, data) => data.isYuyin, value: '按住说话', style: {flex: 1, align: 'center', borderColor: '#666', borderWidth: 1, color: '#666', padding: 5, borderRadius: 5}},
                        {type: 'input-text', prop: 'commentContent', load:(value, data) => !data.isYuyin, placeholder: '发送工作消息', style: {padding: 5 ,flex: 1, borderColor: '#ccc', borderWidth: .4, borderRadius: 5, marginLR: 5}},
                        {type: 'button-image-icon', prop: 'image', value: require('../../assets/tupian.png'), style: {width: 38, height: 38}},
                        {type: 'button-primary',  prop: 'send', value: '发送', style: {padding: 5, borderRadius: 5}},
                        {type: 'br', style: {flex: 1, alignItems: 'center', paddingTB: 5, paddingLR: 10, flexDirection: 'row'}}
                    ]}
                />
            </View>
        );
    }
  }