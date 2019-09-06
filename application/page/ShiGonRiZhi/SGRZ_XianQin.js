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
        this.state = {
            data: props.navigation.state.params
        }
    } 
    componentDidMount() { } 
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        event={params => {}}
                        data={this.state.data}
                        columns={[
                            [
                                [
                                    {type: 'image-header', value: require('../../assets/image_header.png')},
                                    {type: 'text-h4', value: '王大头', style: {flex: 1, paddingLeft: 5}},
                                    [
                                        {type: 'text', prop: 'constructDate'},
                                        {type: 'text', prop: 'week'}
                                    ],
                                    {type: 'br-form-row', style: {paddingTB: 15}}
                                ],  
                                columns.SGRZ_Table,
                                {type: 'text-h4', prop: 'tendersName',  filter: value => `标段：${value}`, style: {padding: 12}},
                                {type: 'br', style: {backgroundColor: 'white', marginBottom: 5}}
                            ], [
                                {type: 'text-label', value: '生产情况'},
                                {type: 'views', prop: 'shenchanqinkuans', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                                    {type: 'text-list', prop: '$index', filter: value => value + 1 },
                                    [
                                        [
                                            {type: 'text-h5', value: '时间: '},
                                            {type: 'text-h5', prop: 'productionStartTime', filter: 'MM-dd hh:mm'},
                                            {type: 'text-h5', value: ' - '},
                                            {type: 'text-h5', prop: 'productionEndTime', filter: 'MM-dd hh:mm'},
                                            {type: 'br-normal-row'},
                                        ],
                                        {type: 'text-h5', prop: 'productionConstructPart', filter: value => `施工部位：${value}`},
                                        {type: 'text-h5', prop: 'productionConstructContent', filter: value => `施工内容：${value}`},
                                        {type: 'text-h5', prop: 'productionWorkLoad', filter: value => `完成工作量：${value}`},
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'br-normal-row', style: {paddingTB: 5}}
                                ]},
                                {type: 'br', style: {backgroundColor: 'white', padding: 10}, load: (value, data) => data.shenchanqinkuans.length}
                            ], [
                                {type: 'text-label', value: '工作内容'},
                                {type: 'views', prop: 'gonzuoneirons', style:{marginBottom: 2}, columns: [
                                    {type: 'text-list', prop: '$index', filter: value => value + 1 },
                                    [
                                        {type: 'text-h5', prop: 'jobContentContentType', filter: value => `内容分类：${value}`},
                                        {type: 'text-h5', prop: 'jobConentContentDescribe', filter: value => `描述：${value || ''}`},
                                        {type: 'text-h5', prop: 'jobContentRemark', filter: value => `备注：${value || ''}`},
                                        {type: 'br', style: {flex: 1}}
                                    ], 
                                    {type: 'br-normal-row', style: {paddingTB: 5}}
                                ]},
                                {type: 'br', style: {backgroundColor: 'white', padding: 10}, load: (value, data) => data.gonzuoneirons.length}
                            ], [
                                {type: 'text-label', value: '施工进度'},
                                {type: 'views', prop: 'shigonjindus', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                                    {type: 'text-list', prop: '$index', filter: value => value + 1},
                                    [
                                        [
                                            {type: 'text-h5', value: '时间: '},
                                            {type: 'text-h5', prop: 'constructProgressStartTime', filter: 'MM-dd hh:mm'},
                                            {type: 'text-h5', value: ' - '},
                                            {type: 'text-h5', prop: 'constructProgressEndTime', filter: 'MM-dd hh:mm'},
                                            {type: 'br-normal-row'},
                                        ],
                                        {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                                        {type: 'text-h5', prop: 'constructProgressConstructContent', filter: value => `施工内容：${value}`},
                                        {type: 'text-h5', prop: 'constructProgressTeams', filter: value => `班组：${value}`},
                                        {type: 'text-h5', prop: 'constructProgressNums', filter: value => `施工进度：${value + '%'}`},
                                        {type: 'br', style: {flex: 1}}
                                    ], 
                                    {type: 'br-normal-row', style: {paddingTB: 5}}
                                ]},
                                {type: 'br', style: {backgroundColor: 'white', padding: 10}, load: (value, data) => data.shigonjindus.length}
                            ], [
                                [
                                    {type: 'text-label', value: '存在问题: ', style: {width: 110}},
                                    {type: 'text-h5',  prop: 'existingProblems' },
                                    {type: 'br-normal-row', prop: 'cunzaiwenti'}
                                ], [
                                    {type: 'text-label', value: '次日主材申请: ', style: {width: 110}},
                                    {type: 'text-h5', prop: 'subjectMaterialApplication'},
                                    {type: 'br-normal-row', prop: 'zhucaishenqin'}
                                ], [
                                    {type: 'text-label', value: '次日机械申请: ', style: {width: 110}},
                                    {type: 'text-h5',  prop: 'machineryApplication'},
                                    {type: 'br-normal-row', prop: 'jixieshenqin'}
                                ], [
                                    {type: 'text-label', value: '自检报告: ', style: {width: 110}},
                                    {type: 'text-h5',  prop: 'selfCheckReport', filter: {1: '合格', 2: '不合格', 3: '施工中'}},
                                    {type: 'br-normal-row', style: {marginBottom: 5}}
                                ], 
                                {type: 'br', style: {backgroundColor: 'white', padding: 10}, load: (value, data) => data.selfCheckReport}
                            ], 
                        ]}
                    />
                </ScrollView>
            </View>
        );
    }
  }