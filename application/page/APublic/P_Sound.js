import {AudioRecorder, AudioUtils} from 'react-native-audio'   
import Sound from 'react-native-sound'

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
                
                console.log(upload)  
                resolve(upload)
            }) 
        })
        
    },
    play: (path) => {
        var sound = new Sound(path, (e) => {
            console.log('error')
        });

        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
        })
    }
} 