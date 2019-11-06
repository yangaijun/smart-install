import React from 'react';
import {Dimensions} from 'react-native'  
import Freedomen from 'react-native-freedomen'

export default class extends React.Component { 
    static navigationOptions = {  
        title: '关于我们', 
    }; 
    constructor (props) {
        super (props) 
        this.state = { 
        }
    }
    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task. 
    } 

    render() {
        return ( 
                <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 15, paddingBottom: 10}}
                    event={params => {
                        if (params.prop == 'check')
                            alert("已经是最新的喽")
                    }}
                    columns={[
                        {type: 'image', value: require('../../assets/old/guanyu.png'), style: {height: 65, width: 65, resizeMode: 'stretch', borderRadius: 15}},
                        {type: 'text', value: '当前版本：2.5.5', style: {paddingTB: 15}},
                        {type: 'button-text', prop: 'check', value: '检查更新', style: {padding: 15, color: 'black', backgroundColor: 'white', width: '100'}},
                        {type: 'text', style: {flex: 1}},
                        {type: 'text', value: '上海嘉实 （集团） 有限公司 版权所有'} 
                    ]}
                /> 
        )
    }
} 