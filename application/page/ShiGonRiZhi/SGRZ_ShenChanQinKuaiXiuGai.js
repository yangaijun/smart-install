import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '生产情况修改',
            headerRight: <Freedomen.Region 
                event={params => { }}
                columns={[
                    {type: 'button-right', value: '保存'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
            data: props.navigation.state.params
        }
    } 
    componentDidMount() { } 
    render() {
        
        return ( 
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        event={params => {
                           
                        }}
                        data={this.state.data}
                        columns={columns.SGRZ_ShenChanQinKuan}
                    />
                </ScrollView>
                
        );
    }
  }