import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title:  navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => {  
                  
                }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
       
    }
    
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                columns={[
                    [
                        {type: 'text-form-label', value: '清单'},
                        {type: 'br-form-row'}
                    ],
                    {type: 'views', value: [{}, {}], columns: [
                        {type: 'image-icon', value: require('../../assets/check.png')},
                        {type: 'text-form-label', value: '王大头', style: {flex: 1}},
                        {type: 'counter', prop: 'hh', value: 10},
                        {type: 'text-h5', value: '小时'},
                        {type: 'button-image-icon', value: require('../../assets/clear.png')},
                        {type: 'br-form-row'}
                    ]}, [
                        {type: 'image-form', value: require('../../assets/tianjia.png'), style: {marginRight: 8}},
                        {type: 'button-text-primary', value: '新建项目工人'},
                        {type: 'br-form-row', style: {align: 'center'}}
                    ]
                    
                ]}
            /> 
        );
    }
  }