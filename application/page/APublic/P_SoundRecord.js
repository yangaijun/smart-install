import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {Dimensions} from 'react-native'
import {AudioRecorder, AudioUtils} from 'react-native-audio'   


//  refs._show  refs._hide
export default  class  extends React.Component {
   
    constructor(props) {
        super(props)  
        this.state = {
            data: {jishi: '00:00'}
        }
    }
    _show = () =>  {
        if (this.timer) {
            this.setState({
                data: {jishi: '00:00'}
            })
            clearInterval(this.timer)
        }
        this.slidePop.show()
    }
    _hide = () =>  {
        this.slidePop.hide()
    }
    _count() {
        let second = 0, minute = 0
        this.timer = setInterval(() => {
            second ++
            if (second >= 60) {
                second = 0
                minute ++
            }
            let f_second = second >= 10 ? second : '0' + second
            let f_minute = minute >= 10 ? minute : '0' + minute
            let jishi = f_minute + ':' + f_second
            this.setState({
                data: {
                    jishi: jishi
                }
            })
        }, 1000);
    }
    startRecording = () => {
        this._fileName = (Math.random() + '').substring(6) + '.aac'

        AudioRecorder.prepareRecordingAtPath(AudioUtils.DocumentDirectoryPath + `/${this._fileName}`, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "High",            //录音质量
            AudioEncoding: "aac",           //录音格式
            AudioEncodingBitRate: 32000     //比特率
        }).then(res => {
            AudioRecorder.startRecording()
        })
    }
    stopRecording = () => {
        let path =  AudioRecorder.stopRecording() 
        return new Promise((resolve, reject) => {
            path.then(res => {
                let upload = {
                    uri: 'file://' + res,
                    type: 'audio/acc',
                    name:  this._fileName
                } 
                Freedomen.global.api.upload(upload).then(res => {
                    console.log(res)
                    resolve(1)
                }).catch(e=> alert(2))
            }) 
        })
        
    }
    render() {
        return (
            <Freedomen.SlidePop style={{top:  Dimensions.get('screen').height - 280}} ref={ref => this.slidePop = ref} close={() => {
                if (this.start) {
                    AudioRecorder.stopRecording() 
                }
            }}>
                <Freedomen.Region 
                    event={params => { 
                        if (params.prop == 'luyin' &&  !params.value) {
                            this.fileName = (Math.random() + '').substring(6) + '.aac'
                            return new Promise((resolve, reject) => { 
                                AudioRecorder.prepareRecordingAtPath(AudioUtils.DocumentDirectoryPath + `/${this.fileName}`, {
                                    SampleRate: 22050,
                                    Channels: 1,
                                    AudioQuality: "High",            //录音质量
                                    AudioEncoding: "aac",           //录音格式
                                    AudioEncodingBitRate: 32000     //比特率
                                }).then(res => {
                                    AudioRecorder.startRecording()
                                    this.start = true
                                    this._count()
                                    resolve({
                                        ...params.row,
                                        luyin: !params.row.luyin
                                    })  
                                })
                            })
                        } else {
                            let path =  AudioRecorder.stopRecording() 
                            path.then(res => {
                                let upload = {
                                    uri: 'file://' + res,
                                    type: 'audio/acc',
                                    name:  this.fileName
                                }
                                this.slidePop.hide()
                                this.start = false
                                Freedomen.global.api.upload(upload).then(res => {
                                    this.props.over && this.props.over(res.data.data[0])
                                }) 
                            }) 
                        } 
                    }}
                    data={this.state.data}
                    columns={[
                        {type: 'text-h4', prop: 'jishi', style: {padding: 15}},
                        {type: 'button-image', prop: 'luyin', filter: value => {
                            return value ? require('../../assets/zantin.png') : require('../../assets/kaishi.png')
                        }, style: {height: 105, width: 105}},
                        {type: 'br', style: {align: 'center', paddingTB: 15, width: '100'}}
                    ]}
                />
            </Freedomen.SlidePop>
        );
    }
  }