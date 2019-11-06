import React from 'react'
import {View} from "react-native";  
import WebView from 'react-native-webview'
import datas from '../../region/datas'
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '点位详情' 
        }
    }
    constructor(props) {
        super(props)  
        console.log(this.props.navigation.state.params)
    } 
    render() {
        return (
            <WebView    
                ref={ref => this.webView = ref}
                javaScriptEnabled={true}  
                useWebKit={true}  
                onLoadEnd={() => { 
                    this.webView.postMessage(JSON.stringify(
                        { key: 'drawPic', value: 'http://www.jasobim.com:8085/' + (this.props.navigation.state.params.projectPaperUrl || this.props.navigation.state.params.paperUrl) }
                    ))  
                }}
                source={{html: datas.html}} 
                onMessage={e => {   
                    if (e.nativeEvent.data == 'drawPicOver') {
                        this.webView.postMessage(JSON.stringify({key: 'drawPoints', value: [this.props.navigation.state.params]}))
                    }  
                }} 
            />
        );
    }
  }