import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
const Search = columns.ZA_Search('请输入创建人查询')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '工作内容修改',
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
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        
        return ( 
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        event={params => {
                        }} 
                        columns={columns.SGRZ_GonZuoNeiRon}
                    />
                </ScrollView> 
        );
    }
  }