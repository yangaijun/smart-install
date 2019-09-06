import React from 'react'
import {Text, View, ScrollView, Platform} from "react-native";
import Freedomen from 'react-native-freedomen'
import WebView from 'react-native-webview' 
import datas from '../../region/datas'
import store from 'react-native-freedomen/store'

import P_WebView from '../APublic/P_WebView'  
 
export default  class  extends React.Component {
    static navigationOptions = {
        title: '新增描点'
    }
    constructor(props) {
        super(props)
        this.state = {
            checkTypeList: {list: []},
        }
    }
    componentDidMount() {  
        console.log(this.props.navigation.state.params)
        store.get('checkTypeList').then(res => { 
            this.setState({ checkTypeList: {list: res} })
        })
    }
    render() { 
 
        return (
            <View style={{flex: 1}}>
                <P_WebView ref={ref => this.webView = ref} measurePaperId={this.props.navigation.state.params.measurePaperId || this.props.navigation.state.params.measurePaperIds} event={params => {
                    if (params == 'drawPicOver') {
                        this.webView._instruction({key: 'drawOne'})
                    } else { 
                        this.point = JSON.parse(params)
                        this.slidePop.show() 
                    }
                    
                    console.log(params)
                    
                }}/>
                <Freedomen.SlidePop style={{top: '48'}} ref={ref => this.slidePop = ref} >
                    <Freedomen.Region 
                        style={{flex: 1, paddingTop: 2}}
                        event={params => {
                            this.slidePop.hide() 
                            Freedomen.global.fn({...this.point, ...params.value.row})
                            this.props.navigation.goBack()
                        }}
                        data={this.state.checkTypeList}
                        columns={[
                            {type: 'scroll', prop: 'list', style: {backgroundColor:'white'}, columns: [
                                {type: 'button-text', prop: 'checkName', value: '123', style: {borderColor: '#f5f5f5', color: '#333', borderWidth: 2, margin: 5, padding: 12, alignItems: 'center'}}
                            ]}
                        ]}
                    /> 
                </Freedomen.SlidePop>
            </View>
        );
    }
  }