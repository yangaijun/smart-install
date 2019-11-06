import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, KeyboardAvoidingView, View, Modal} from 'react-native' 
import ImageViewer from 'react-native-image-zoom-viewer';
import P_PickImage from './P_PickImage';
import P_Sound from './P_Sound' 

export default  class  extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = { 
            visible: false,
            images: [],
            data: {msg:[]},
            jiaohu: {yuyin: '按住说话'}
        }
        this.addParams = {
            replyType: props.replyType,
            aboutId: props.aboutId
        }
        this.selectParams = {
            replyType: props.replyType,
            aboutId: props.aboutId
        }
    }
    componentDidMount() { 
        this._loadData()
    } 
    _loadData() { 
        Freedomen.global.api.call('/Reply/select', this.selectParams).then(res => { 
            let msg = res.map(el => {
                return {
                    isSelf: Freedomen.global.user.jasoUserId == el.jasoUserId,
                    ...el
                }
            })  
            this.setState({
                data: {
                    msg: msg
                }
            })
        })
    }
    _addData() {
        Freedomen.global.api.call('/Reply/add', this.addParams).then(rse => {
            this._loadData()
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    {
                        this.props.children
                    }
                    <Freedomen.Region 
                        data={this.state.data}
                        event={params => {
                            if (params.value && params.value.prop == 'pictures') { 
                                let images = [{url: `http://www.jasobim.com:8085/${params.value.value}`}]
                                this.setState({
                                    visible: true,
                                    images: images
                                })
                            } else if (params.value && params.value.prop == 'voices') {
                                P_Sound.play(params.row[params.$index].voices)
                            }
                        }}
                        columns={[
                            [
                                {type: 'text', value: '', style: {width: 120, height: 1, backgroundColor: '#dfdfdf'}},
                                {type: 'text', value: '任务动态', style: {paddingLR: 10, color: '#dadada'}},
                                {type: 'text', value: '', style: {width: 120, height: 1, backgroundColor: '#dfdfdf'}},
                                {type: 'br', style: {flexDirection: 'row', align: 'center', padding: 10}}
                            ], 
                            {type: 'views', prop: 'msg', value: [], columns: [
                                [
                                    [
                                        {type: 'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`},
                                        {type: 'text-h4', prop: 'userRealName', value: '木工王大头'},
                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center',padding: 5}}
                                    ],
                                    {type: 'text-h5', prop: 'replyContent', load: value => value, style: (value, data) => {
                                            let bgColor = {1: 'white', 2: '#2EBBC4', 3: '#fc2f68'}[data.colorState]
                                            let color = {1: 'black', 2: 'white', 3: 'white'}[data.colorState]
                                            return  {marginLeft: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                        }
                                    },
                                    {type: 'button-image', prop: 'pictures',  load: (value, data) => !data.replyContent && value , filter: value => `http://www.jasobim.com:8085/${value}`, style: {marginLeft: 42, width: 80, height: 80}},
                                    [
                                        {type: 'image', prop: 'voices', filter: () => {
                                            return require('../../assets/voice_right_3.png')
                                        }, style: {width: 25, height: 25}},
                                        {type: 'click', prop: 'voices', load: (value, data) => !data.replyContent && value, style: {marginLeft: 55, padding: 5, backgroundColor: '#ECF2F2', width: 140}}
                                    ],
                                    {type: 'text',  prop: 'createTime', filter: "yyyy-MM-dd hh:mm:ss", style: {marginLeft: 55, padding: 5, fontSize: 12}},
                                    {type: 'br', load: (value, data) => !data.isSelf, style: {padding: 10}}
                                ], [
                                    {type: 'image-header', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`},
                                    {type: 'text-h5', prop: 'replyContent', load: value => value, style: (value, data) => {
                                            let bgColor = {1: '#ecf2f2', 2: '#2EBBC4', 3: '#fc2f68'}[data.colorState]
                                            let color = {1: 'black', 2: 'white', 3: 'white'}[data.colorState]
                                            return  {marginRight: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                        } 
                                    },
                                    {type: 'button-image', prop: 'pictures', load: (value, data) => !data.replyContent && value , filter: value => `http://www.jasobim.com:8085/${value}`, style: {marginRight: 55, width: 80, height: 80}},
                                    [
                                        {type: 'image', prop: 'voices', filter: () => {
                                            return require('../../assets/voice_left_3.png')
                                        }, style: {width: 25, height: 25}},
                                        {type: 'click', prop: 'voices', load: (value, data) => !data.replyContent && value, style: {marginRight: 55, padding: 5, backgroundColor: '#ECF2F2', width: 140, alignItems: 'flex-end'}}
                                    ],
                                    {type: 'text', value: '', prop: 'createTime', filter: "yyyy-MM-dd hh:mm:ss", style:  {marginRight: 55, padding: 5, fontSize: 12}},
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
                            if (params.row.replyContent) {
                                this.addParams.replyContent = params.row.replyContent
                                this.addParams.pictures = ''
                                this.addParams.voices = ''
                                this._addData()
                                params.row.replyContent = ''
                                return params.row
                            }
                        } else if (params.prop == 'image') {
                            P_PickImage().then(res => {
                                this.addParams.replyContent = ''
                                this.addParams.pictures = res[0]
                                this.addParams.voices = ''
                                this._addData()
                            }) 
                        } else if ('qiehuan' == params.prop) {
                            let qiehuan = params.value == require('../../assets/yuyinr.png') ? require('../../assets/jp.png') : require('../../assets/yuyinr.png')
                            return {isYuyin: !params.row.isYuyin, qiehuan: qiehuan}
                        } 
                    }}
                    data={this.state.jiaohu}
                    columns={[
                        {type: 'button-image', prop: 'qiehuan', value: require('../../assets/yuyinr.png'), style: {width: 28, height: 28, paddingLR: 4}},
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
                                    this.addParams.voices = upload
                                    this.addParams.replyContent = ''
                                    this.addParams.pictures = ''
                                    this._addData() 
                                })
                            }
                        }, prop: 'yuyin', load:(value, data) => data.isYuyin, value: '按住说话', style: {marginLR: 6,flex: 1, align: 'center', borderColor: '#f5f5f5', borderWidth: 1, color: '#999', padding: 8, borderRadius: 5}},
                        {type: 'input-text', prop: 'replyContent', others: {autoFocus: this.props.focus}, load:(value, data) => !data.isYuyin, placeholder: '发送工作消息', style: {padding: 4 ,flex: 1, borderColor: '#ccc', borderWidth: .4, borderRadius: 5, marginLR: 5}},
                        {type: 'button-image-icon', prop: 'image', value: require('../../assets/tupian.png'), style: {width: 28, height: 28, paddingLR: 4}},
                        {type: 'button-primary',  prop: 'send', value: '发送', load:(value, data) => !data.isYuyin, style: {padding: 3, borderRadius: 5, fontWeight: '400', fontSize: 14, padding: 4, paddingLR: 6}},
                        {type: 'br', style: {flex: 1, alignItems: 'center', paddingTB: 5, paddingLR: 10, flexDirection: 'row'}}
                    ]}
                />
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} onSwipeDown={() => {
                        this.setState({
                            visible: false
                        })
                    }}/>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
  }