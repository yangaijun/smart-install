import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '工作内容',
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
                        if(params.value && params.value.prop == 'bianji')
                            this.props.navigation.push('SGRZ_GonZuoNeiRonXiuGai', params.value.row)
                    }}
                    columns={[
                        {type: 'views', value: [{$index: 1}, {$index: 2}], style:{marginBottom: 2}, columns: [
                            [
                                {type: 'text-h5', value: '何老三、 王大头', filter: value => `内容分类：${value}`},
                                {type: 'text-h5', value: '别墅', filter: value => `描述：${value}`},
                                {type: 'text', value: '排水', filter: value => `备注：${value}`},
                                {type: 'br', style: {flex: 1}}
                            ], [
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'button-image-icon', value: require('../../assets/shanchu.png')},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-form-row'}
                        ]},
                        columns.SGRZ_GonZuoNeiRon,
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'button-text-primary', value: '添加工作内容', style: {marginLeft: 5}},
                            {type: 'br-form-row', prop: 'SGRZ_GonZuoNeiRonTianJia', style: {align: 'center'}}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }