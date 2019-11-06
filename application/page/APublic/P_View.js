import React from 'react'
import {ScrollView, Text, ActivityIndicator, View} from "react-native";
import WebView from 'react-native-webview'
import datas from '../../region/datas'
import Freedomen from 'react-native-freedomen';

export default  class  extends React.Component {
    static navigationOptions = {
        title: '详情'
    }
    constructor(props) {
        super(props) 
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.newsInfoId)
            Freedomen.global.api.call('/NewsInfo/update', this.props.navigation.state.params)
    } 
    render() {
        return (
            <View style={{flex: 1}}>
                <WebView    
                    ref={ref => this.webView = ref}
                    javaScriptEnabled={true}  
                    useWebKit={true}  
                    onLoadEnd={params => {
                        this.setState({
                            loading: false
                        })
                    }}
                    source={{ uri: this.props.navigation.state.params.uri}} 
                />
            {
                this.state.loading ? 
                <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 120, width: 130, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 8,alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator color="white" size='large'/>
                        <Text style={{color: 'white', marginTop: 18}}>加载中，请稍等</Text>
                    </View>
                </View> : null
            }
            </View>
            
        );
    }
  }