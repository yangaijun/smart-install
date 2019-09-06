import React from 'react'
import {Animated, Text, Image ,ART,Dimensions } from "react-native";
export default class extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '统计', 
        tabBarIcon: ({tintColor,focused}) => <Image source={focused ? require('../../assets/untonji.png') : require('../../assets/tonji.png')} style={{height: 22, width: 22}}/> 
    }; 
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Text>he</Text>
        );
    }
  }