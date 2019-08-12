import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '生产情况',
            headerRight: <Freedomen.Region 
                event={params => { }}
                columns={[
                    {type: 'button-right', value: '确认'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = { }
    } 
    componentDidMount() { } 
    render() { 
        return (
            <ScrollView style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        if (params.value && params.value.prop == 'bianji')
                            this.props.navigation.push('SGRZ_ShenChanQinKuaiXiuGai', params.value.row)
                    }}
                    columns={[
                        {type: 'views', value: [{$index: 1}, {$index: 2}], style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                            {type: 'text', prop: '$index', style: {fontWeight: '800', fontSize: 22, color: 'white', backgroundColor: '#2EBBC4', align: 'center', width: 50, height: 50, marginLR: 15, borderRadius: 50}},
                            [
                                {type: 'text-h5', value: '何老三、 王大头', filter: value => `时间： 上午05：30 - 上午08：40`},
                                {type: 'text-h5', value: '别墅', filter: value => `施工部位：${value}`},
                                {type: 'text-h5', value: '排水', filter: value => `施工内容：${value}`},
                                {type: 'br', style: {flex: 1}}
                            ], [
                                {type: 'button-image-icon', prop: 'bianji', value: require('../../assets/bianji.png')},
                                {type: 'button-image-icon', value: require('../../assets/shanchu.png')},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-normal-row', style: {paddingTB: 10}}
                        ]},
                        columns.SGRZ_ShenChanQinKuan,
                        [
                            {type: 'image-form', value: require('../../assets/tianjia.png')},
                            {type: 'button-text-primary', value: '添加生产情况', style: {marginLeft: 5}},
                            {type: 'br-form-row', style: {align: 'center', marginBottom: 2}}
                        ]
                    ]}
                />
            </ScrollView>
        );
    }
  }