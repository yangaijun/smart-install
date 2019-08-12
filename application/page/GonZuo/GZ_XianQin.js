import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '质量检查工作'
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
            <View style={{flex: 1}}>
                <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    columns={columns.GonZuoForm}
                />
                <Freedomen.Region 
                    style={{height: 52, alignItems: 'center', backgroundColor: 'white'}}
                    columns={[
                        [
                            {type: 'image-icon', value: require('../../assets/jujuegonzuo.png')},
                            {type: 'text-must', value: '拒绝工作'},
                            {type: 'click', style: {flex: 1, align: 'center', flexDirection: 'row'}}
                        ], [
                            {type: 'image-icon', value: require('../../assets/jieshougonzuo.png')},
                            {type: 'text-primary', value: '接受工作'},
                            {type: 'click', style: {flex: 1, align: 'center', flexDirection: 'row'}}
                        ],
                        {type: 'br', style: {flex: 1, flexDirection: 'row'}}
                    ]}
                />
            </View>
        );
    }
  }