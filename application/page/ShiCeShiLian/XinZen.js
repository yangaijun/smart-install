import React from 'react'
import {Text, View, ScrollView, Platform} from "react-native";
import Freedomen from 'react-native-freedomen'
import WebView from 'react-native-webview' 
import datas from '../../region/datas'
import store from 'react-native-freedomen/store'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新增描点'
    }
    constructor(props) {
        super(props)
        this.state = {
            checks: []
            
        }
    }
    componentDidMount() {
        store.get('checkList').then(res => {
            this.setState({
                checks: res
            }) 
        })
    }
    render() { 
 
        return (
            <View style={{flex: 1}}>
               <WebView  
                    ref={ref => {this.webView = ref}}  
                    javaScriptEnabled={true}  
                    onLoadEnd={() => {
                        console.log(this.props.navigation.state.params)
                        this.webView.postMessage(JSON.stringify({
                            key: 'drawPic',
                            value:  this.props.navigation.state.params.paperUrl
                        })) 
                    }}
                    useWebKit={true} 
                    source={{html: datas.html}} 
                    onMessage={e => { 
                        if (e.nativeEvent.data == 'drawPicOver') {
                            this.webView.postMessage(JSON.stringify({
                                key: 'drawOne'
                            }))
                        } else {
                            this.pointInfo = JSON.parse(e.nativeEvent.data)
                            
                            this.slidePop.show()
                        }
                    }} 
                /> 
                <Freedomen.SlidePop style={{top: '55'}} ref={ref => this.slidePop = ref} >
                    <ScrollView>
                        {
                            this.state.checks.map((el, index) => {
                                return <Freedomen.Region 
                                    data={el}
                                    key={index}
                                    event={params => {
                                        this.slidePop.hide() 
                                        let jcx = {
                                            title: params.row.checkName,
                                            content: params.row.remark,
                                            logList: [{prop: 'input0'}],
                                            input0: '',
                                            isNew: true 
                                        } 
                                        Freedomen.global.fn(jcx, this.pointInfo)
                                        this.props.navigation.goBack()
                                    }}
                                    columns={[
                                        {type: 'button-text', prop: 'checkName', value: '123', style: {borderColor: '#666', color: '#333', borderWidth: 1, margin: 5, padding: 12, alignItems: 'center'}}
                                    ]}
                                />       
                            })
                        }
                    </ScrollView>
                </Freedomen.SlidePop>
            </View>
        );
    }
  }