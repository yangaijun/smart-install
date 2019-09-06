import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import store from 'react-native-freedomen/store';
import WebView from 'react-native-webview'
import datas from '../../region/datas'

export default  class  extends React.Component {
    
    constructor(props) {
        super(props) 

        store.get('measurePaperList').then(res => {
            for (let i of res) {
                if (i.measurePaperId == props.measurePaperId) {
                    this.image = 'data:image/png;base64,' + i.paperUrl
                    return
                }
            }
        })
    }
    componentDidMount() {
        
    }
    //{ key: 'drawPic', pic: '', p}
    //{ key: 'drawPoints', value: [{},{}]} 
    //{ key: 'drawSelect', value: {}} //重画 select point
    //{ key: 'drawAppend', value: {}}
    //{ key: 'drawOne' }
        
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
                        { key: 'drawPic', value: this.image || 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg' }
                    ))  
                         
                    
                }}
                source={{html: datas.html}} 
                onMessage={e => {   
                    this.props.event && this.props.event(e.nativeEvent.data)
                    // if (e.nativeEvent.data == 'drawPicOver') { 
                    //     // this.webView.postMessage(JSON.stringify({
                    //     //     key: 'drawPoints', value: this.points 
                    //     // }))
                    // } else if (Array.isArray(JSON.parse(e.nativeEvent.data))) {
                    //     // let list = JSON.parse(e.nativeEvent.data)
                    //     // if (list.length > 1) { 
                    //     //     this.setState({
                    //     //         chooseList: {list: list}
                    //     //     }) 
                    //     //     this.choosePointSlidePop.show()
                    //     // } else {
                    //     //     this._showList(list[0])
                    //     // }
                    // }
                }} 
            />
        );
    }
  }