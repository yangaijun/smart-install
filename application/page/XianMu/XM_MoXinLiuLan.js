import React from 'react'
import {View, ScrollView} from 'react-native' 
import WebView from 'react-native-webview'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) =>{
        return {
            title: '模型浏览'
        }
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {}
    render() {
        console.log(this.props.navigation.state.params.viewToken)
        return (
            <WebView    
                ref={ref => this.webView = ref}
                javaScriptEnabled={true}  
                useWebKit={true}  
                source={{html: `
                <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title>My first BIMFACE app</title>
                        <style type="text/css">
                        * {
                            margin: 0;
                            padding: 0;
                        }
                        html, body {
                            height: 100%;
                        }
                        #domId {
                            height: 100%;
                        }
                        </style>
                    </head>
                    <body>
                        <div id="domId"></div>
                        <script src="https://static.bimface.com/api/BimfaceSDKLoader/BimfaceSDKLoader@latest-release.js"></script>
                        <script>
                        var viewToken = '${this.props.navigation.state.params.viewToken}';
                        // 设置BIMFACE JSSDK加载器的配置信息
                        var loaderConfig = new BimfaceSDKLoaderConfig();
                        loaderConfig.viewToken = viewToken;
                        
                        // 加载BIMFACE JSSDK加载器
                        BimfaceSDKLoader.load(loaderConfig, successCallback, failureCallback);
                        // 加载成功回调函数
                        
                        function successCallback(viewMetaData) {
                            // 创建WebApplication，直接显示模型或图纸
                            var dom4Show = document.getElementById('domId');
                            new Glodon.Bimface.Application.WebApplicationDemo(viewMetaData, dom4Show); 
                        }
                        // 加载失败回调函数
                        function failureCallback(error) {
                            console.log(error);
                        }
                        </script>
                    </body>
                    </html>
                `}}  
            />
        );
    }
  }