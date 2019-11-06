import React from 'react'
import {View} from "react-native";  
import WebView from 'react-native-webview'
import datas from '../../region/datas'
import Freedomen from 'react-native-freedomen' 
var point = {}

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '选择点位',
            headerRight: <Freedomen.Region 
                event={params => { 
                    let obj = {}
                    obj[navigation.state.params.form] = (data) => {
                        return {
                            ...data,
                            ...point,
                            projectPaperId: navigation.state.params.projectPaperId,
                            position: point.x ? `x:${point.x} y:${point.y}`: null
                        }
                    }
                    Freedomen.redux(obj)
                    navigation.navigate(navigation.state.params.router)
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)  
    }
  
    _instruction(params) {
        this.webView.postMessage(JSON.stringify(params))
    }

    render() {
        return (
            <WebView    
                ref={ref => this.webView = ref}
                javaScriptEnabled={true}  
                useWebKit={true}  
                onLoadEnd={() => { 
                    this.webView.postMessage(JSON.stringify(
                        { key: 'drawPic', value: 'http://www.jasobim.com:8085/' + this.props.navigation.state.params.paperUrl }
                    ))  
                }}
                source={{html: datas.html}} 
                onMessage={e => {   
                    if (e.nativeEvent.data == 'drawPicOver') {
                        this.webView.postMessage(JSON.stringify({key: 'drawOne'}))
                    } else {
                        point = JSON.parse(e.nativeEvent.data)
                    }
                }} 
            />
        );
    }
  }