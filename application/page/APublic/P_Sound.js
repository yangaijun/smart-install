import {AudioRecorder, AudioUtils} from 'react-native-audio'   
import Sound from 'react-native-sound'
import Freedomen from 'react-native-freedomen'

var fileName
export default {
    startRecording: () => {
        fileName = (Math.random() + '').substring(6) + '.aac'

        AudioRecorder.prepareRecordingAtPath(AudioUtils.DocumentDirectoryPath + `/${fileName}`, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "High",            //录音质量
            AudioEncoding: "aac",           //录音格式
            AudioEncodingBitRate: 32000     //比特率
        }).then(res => {
            AudioRecorder.startRecording()
        })
    },
    stopRecording: () => {
        let path =  AudioRecorder.stopRecording() 
        return new Promise((resolve, reject) => {
            path.then(res => {
                let upload = {
                    uri: 'file://' + res,
                    type: 'audio/acc',
                    name: fileName
                } 
                Freedomen.global.api.upload(upload).then(res =>{
                    resolve(res.data.data[0])
                })
                
            }) 
        })
        
    },
    play: (path) => {
        path = 'http://www.jasobim.com:8085/' + path
        console.log(path)
        var sound = new Sound(path, '', (e) => {
            console.log('error')
        });
        var index = 0
        const fn = () => {
            setTimeout(() => { 
                if (!sound._loaded && index ++ <= 10)
                    fn()
                else 
                    sound.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                          } else {
                            console.log('playback failed due to audio decoding errors');
                          }
                    })
            }, 80)
        }
        fn()
    }
} 