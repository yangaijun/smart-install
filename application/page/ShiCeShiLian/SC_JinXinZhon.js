import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View, Dimensions} from 'react-native'
import columns from '../../region/columns'
import ImagePicker from 'react-native-image-picker'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Sound from 'react-native-sound'

const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}; 

var slidePop = null, slidePopDys = null

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: (navigation.state.params.label == '已完成' ? null : <Freedomen.Region 
                event={params => { navigation.state.params.label == '待验收' ? slidePopDys.show() : slidePop.show() }}
                columns={[
                    {type: 'button-image', value: require('../../assets/more.png'), style: {width: 28, height: 28, marginRight: 12}}
                ]}
            />)
        }
    } 
    constructor(props) {
        super(props)
        let params = props.navigation.state.params
        params.msg = []
        this.state = { 
            data: params,
            jiaohu: {yuyin: '按住说话'}
        }
        console.info(params)
    }
    componentDidMount() { 
       this._loadMessage()
    } 
    _loadMessage() {
        Freedomen.global.api.get('api/comment/admin/getCommentList', {
            replyType: 2,
            aboutId: this.state.data.id
        }).then(res => {
            res.map(el => { 
                el.isSelf = el.createUserId == Freedomen.global.user.id 
            })
            let data = this.state.data
            data.msg = res
            this.setState({
                data: data
            })
            
        })
    } 
    _sendMsg(key, value) {
        let formData = new FormData()
        formData.append(key, value)
        formData.append('replyType', 2)
        formData.append('aboutId', this.state.data.id)
        Freedomen.global.api.postForm('api/comment/addComment',  formData).then(res => { 
            this._loadMessage()
        }) 
    }
    _show() {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else { 
                let upload = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }
                console.log(upload)
                this._sendMsg('pics', upload)
            }
          });
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    <Freedomen.Region 
                        style={{flex: 1, backgroundColor: '#f5f5f5'}}
                        data={this.state.data}
                        event={params => {
                            if (params.prop == 'add') {
                                this.props.navigation.push('ZhenGaiRen', {zgr: params.row.zgr, data: this.state.data})
                            } else if (params.value && params.value.prop == 'voices') {
                                // console.log(params.value.row.voices)
                                var sound = new Sound('http://www.jasobim.com:8080/' + (params.value.row.voices || [])[0]);
                                let fn = () => {
                                    setTimeout(() => {
                                        if (!sound._loaded)
                                            fn()
                                        else 
                                            sound.play()
                                    }, 80)
                                }
                                fn()
                            }
                        }}
                        redux={'wt_data'}
                        columns={[
                            columns.GonZuoForm,
                            [
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'text', value: '任务动态', style: {paddingLR: 10}},
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'br', style: {flexDirection: 'row', align: 'center', padding: 10}}
                            ], 
                            {type: 'views', prop: 'msg', value: [], columns: [
                                [
                                    [
                                        {type: 'image-header', prop: 'commentUserIcon', filter: value => `http://www.jasobim.com:8080/${value}`},
                                        {type: 'text-h4', prop: 'commentUserName', value: '木工王大头'},
                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center',padding: 5}}
                                    ],
                                    {type: 'text', prop: 'commentContent', load: value => value, style: (value, data) => {
                                            let bgColor = {0: 'white', 1: '#2EBBC4', 2: '#fc2f68'}[data.type]
                                            let color = {0: 'black', 1: 'white', 2: 'white'}[data.type]
                                            return  {marginLeft: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                    }},
                                    {type: 'image', prop: 'pictures', filter: value => `http://www.jasobim.com:8080/${(value || [])[0]}`, load: value => value , style: {marginLeft: 42, width: 80, height: 80}},
                                    [
                                        {type: 'image', prop: 'voices', filter: () => {
                                            return require('../../assets/voice_right_3.png')
                                        }, style: {width: 25, height: 25}},
                                        {type: 'click', prop: 'voices', load: value => value, style: {marginLeft: 55, padding: 5, backgroundColor: '#ECF2F2', width: 140}}
                                    ],
                                    {type: 'text', value: '', prop: 'createDate', style: {marginLeft: 55, padding: 5}},
                                    {type: 'br', load: (value, data) => !data.isSelf, style: {padding: 10}}
                                ], [
                                    {type: 'image-header', prop: 'commentUserIcon', filter: value => `http://www.jasobim.com:8080/${value}`, value: require('../../assets/image_header.png')},
                                    {type: 'text', prop: 'commentContent', load: value => value, style: (value, data) => {
                                            let bgColor = {0: '#ECF2F2', 1: '#2EBBC4', 2: '#fc2f68'}[data.type]
                                            let color = {0: 'black', 1: 'white', 2: 'white'}[data.type]
                                            return  {marginRight: 55, maxWidth: '65%', backgroundColor: bgColor, color: color, padding: 10, borderRadius: 5}
                                        } 
                                    },
                                    {type: 'image', prop: 'pictures', filter: value => `http://www.jasobim.com:8080/${(value || [])[0]}`, load: value => value , style: {marginRight: 55, width: 80, height: 80}},
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
                            if (params.row.commentContent == '')
                                return 

                            this._sendMsg('commentContent', params.row.commentContent)
                            let jiaohu = this.state.jiaohu
                            jiaohu.commentContent = ''
                            this.setState({
                                jiaohu: jiaohu
                            })
                        } else if (params.prop == 'image') {
                            this._show()
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
                                AudioRecorder.prepareRecordingAtPath(AudioUtils.DocumentDirectoryPath + '/luyin.aac', {
                                    SampleRate: 22050,
                                    Channels: 1,
                                    AudioQuality: "High",            //录音质量
                                    AudioEncoding: "aac",           //录音格式
                                    AudioEncodingBitRate: 32000     //比特率
                                }).then(res => {
                                    AudioRecorder.startRecording()
                                })
                                
                            },
                            onPressOut: () => {
                                this.setState({
                                    jiaohu: {yuyin: '按住说话'}
                                })
                                let path =  AudioRecorder.stopRecording() 
                                path.then(res => {
                                    let upload = {
                                        uri: 'file://' + res,
                                        type: 'audio/acc',
                                        name: 'luyin.aac'
                                    }
                                    console.log(upload)
                                    this._sendMsg('vois', upload)
                                }) 
                            }
                        }, prop: 'yuyin', load:(value, data) => data.isYuyin, value: '按住说话', style: {flex: 1, align: 'center', borderColor: '#666', borderWidth: 1, color: '#666', padding: 5, borderRadius: 5}},
                        {type: 'input-text', prop: 'commentContent', load:(value, data) => !data.isYuyin, placeholder: '发送工作消息', style: {padding: 5 ,flex: 1, borderColor: '#ccc', borderWidth: .4, borderRadius: 5, marginLR: 5}},
                        {type: 'button-image-icon', prop: 'image', value: require('../../assets/tupian.png'), style: {width: 38, height: 38}},
                        {type: 'button-primary',  prop: 'send', value: '发送', style: {padding: 5, borderRadius: 5}},
                        {type: 'br', style: {flex: 1, alignItems: 'center', paddingTB: 5, paddingLR: 10, flexDirection: 'row'}}
                    ]}
                />
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePop.hide()
                        }}
                        columns={[
                            {type: 'button-text', value: '催办工作', style: {color: '#2EBBC4', fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100', marginBottom: 5}},
                            {type: 'button-text', value: '取消', style: {fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100'}}
                        ]}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 109, backgroundColor: '#f5f5f5'}} ref={ref => {slidePopDys = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            slidePopDys.hide()
                            if (params.value == '工作验收') {
                                this.props.navigation.push('SC_YanShou', this.state.data)
                            } 
                        }}
                        columns={[
                            {type: 'button-text', value: '工作验收', style: {color: '#2EBBC4', fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100', marginBottom: 5}},
                            {type: 'button-text', value: '取消', style: {fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100'}}
                        ]}
                    />
                </Freedomen.SlidePop>
            </View>
        );
    }
  }