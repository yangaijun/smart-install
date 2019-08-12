import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '施工日志详情',
        }
    }
    constructor(props) {
        super(props) 
        this.state = {}
    } 
    componentDidMount() { } 
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        event={params => {}}
                        columns={[
                            [
                                [
                                    {type: 'image-header', value: require('../../assets/image_header.png')},
                                    {type: 'text-h3', value: '王大头', style: {flex: 1, paddingLeft: 5}},
                                    [
                                        {type: 'text', value: '2019-06-08'},
                                        {type: 'text', value: '星期六'}
                                    ],
                                    {type: 'br-form-row', style: {paddingTB: 15}}
                                ],  
                                columns.SGRZ_Table,
                                {type: 'text-h4', value: '歌林小镇3段', filter: value => `标段：${value}`, style: {padding: 12}},
                                {type: 'br', style: {backgroundColor: 'white', marginBottom: 5}}
                            ], [
                                {type: 'text-label', value: '生产情况'},
                                {type: 'views', value: [{$index: 1}, {$index: 2}], columns: [
                                    {type: 'text', prop: '$index', style: {fontWeight: '800', fontSize: 22, color: 'white', backgroundColor: '#2EBBC4', align: 'center', width: 50, height: 50, marginLR: 15, borderRadius: 50}},
                                    [
                                        {type: 'text-h5', value: '何老三、 王大头', filter: value => `作业人员：${value}`},
                                        {type: 'text-h5', value: '别墅', filter: value => `施工部位：${value}`},
                                        {type: 'text-h5', value: '排水', filter: value => `施工内容：${value}`},
                                    ],
                                    {type: 'br-normal-row', style: {paddingTB: 10}}
                                ]},
                                {type: 'text-label', value: '技术安全工作纪律'},
                                {type: 'text-p', value: '技术质量安全内容技术质量安全内容技术，质量安全内容 术质量安全内容技术质量安全内容'},
                                {type: 'text-label', value: '材料、配件进场记录'},
                                {type: 'text-p', value: '材料、配件进场内容材料、配件进场内容材料、配件进场 内容材料、配件进场内容'},
                                {type: 'text-label', value: '图片'},
                                {type: 'br-form-col'}
                            ]
                        ]}
                    />
                </ScrollView>
            </View>
        );
    }
  }