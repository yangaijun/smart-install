import React from 'react'
import {View, ScrollView} from 'react-native'
import WebView from 'react-native-webview';
 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '视听学习'
        }
    }
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <WebView
                style={{flex: 1}}
                mixedContentMode={'compatibility'}
                source={{html: `
                    <video  autoplay="autoplay">
                        <source src="http://www.jasobim.com:8085/uploadFiles/projectfiles/4dc9855e0a4b2bb7e91d0b9f4c483bdb.mp4" type="video/ogg" /> 
                    </video>
                `}}>
            </WebView>
        );
    }
  }