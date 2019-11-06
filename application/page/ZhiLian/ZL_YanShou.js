import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View, Dimensions} from 'react-native'
var thisParams = null
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '验收',
            headerRight: <Freedomen.Region 
                event={params => {
                    
                }}
                columns={[
                    {type: 'button-text', value: '验收', style: {marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props) 
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5', flex: 1}} 
                event={params => {
                    if (params.prop == 'sw')
                        return {label: params.value?'通过':'不通过'}

                    thisParams = params.row
                }} 
                columns={[
                    [
                        {type: 'text-h4', value: '工作结果', style: {flex: 1}},
                        {type: 'text', value: '不通过', prop: 'label', style: (value, data) => {
                            if (data.state)
                                return {color: '#2EBBC4'}
                        }},
                        {type: 'switch', prop: 'state', value: false},
                        {type: 'br-form-row', style: {marginTB: 1}}
                    ],
                    [
                        {type: 'text-h4', value: '评分', style: {flex: 1}},
                        {type: 'rate', value: 1, prop: 'score'},
                        {type: 'br-form-row', style: {marginBottom: 1}}
                    ],
                ]}
            />
               
        );
    }
  }