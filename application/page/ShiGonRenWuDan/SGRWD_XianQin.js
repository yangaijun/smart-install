import React from 'react'
import {View, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '施工任务单详情'
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
            data: {...this.props.navigation.state.params, detailList: []}
        }
        // console.log(this.props.navigation.state.params)
    } 
    componentDidMount() {
        let id = this.props.navigation.state.params.id
        Freedomen.global.api.getJaso(`/taskSheets/message/${id}`).then(res => {
            this.setState({
                data: {
                    ...this.state.data,
                    detailList: res.data.data.detailList
                }
            })
        })
     } 
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.Region 
                    data={this.state.data}
                    event={params => {
                        if (params.prop == 'into') {
                            this.props.navigation.push('SGRWD_ShenHe', this.props.navigation.state.params)
                        }
                    }}
                    columns={[
                        [
                            {type: 'image-item', value: require('../../assets/txl.png'), style: {height: 38, width: 38}},
                            [
                                {type: 'text-h4', prop: 'examineStatusMessage'},
                                {type: 'text-label', prop: 'createDate'},
                                {type: 'br', style: {flex: 1}}
                            ],
                            {type: 'text-label', value: '跟踪查看'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'into', style: {marginBottom: 5}}
                        ], [
                            {type: 'text-h4', prop: 'taskName', style: {marginBottom: 8}},
                            {type: 'text-h5', prop: 'taskNo', filter: value =>`询价单号：${value}`, style: {marginBottom: 8}},
                            {type: 'text-h5', prop: 'createDate', filter: value => `任务单日期：${value}`, style: {marginBottom: 8}},
                            {type: 'text-h5', prop: 'founderName', filter: (value) =>`签发人：${value}`, style: {marginBottom: 8}},
                            {type: 'text-h5', prop: 'bidName', filter: value => `标段：${value}`, style: {marginBottom: 8}},
                            {type: 'br-form-col'}
                        ],
                        {type: 'text-form-label', value: '工作条目：', style: {padding: 10}}, 
                        {
                            type: 'views',
                            prop: 'detailList',
                            columns: [
                                [
                                    {type: 'text', prop: '$index', filter: value => value + 1, style: {backgroundColor: '#2EBBC4', color: 'white', minWidth: 20, align: 'center', minHeight: 20, borderRadius: 10, textAlign: 'center', textAlignVertical: 'center', marginRight: 8}},
                                    {type: 'text-label', prop: 'detailTypeName', filter: value => `工作类型：${value}`},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', prop: 'deductionName', filter: value => `扣款人：${value || ''}`},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '施工内容：'},
                                    {type: 'text-p', prop: 'workContent', style: {
                                        flexWrap: 'wrap',
                                        width: '76'
                                    }},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '施工部位：', style: {
                                        alignItems: 'flex-start',
                                        flexWrap: 'wrap',
                                    }},
                                    {type: 'text-h5', prop: 'workPlace'},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '班组长：'},
                                    {type: 'text-h5', prop: 'leaderName'},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '劳务工人：'},
                                    {type: 'text-p', prop: 'workerNames', style: {
                                        flexWrap: 'wrap',
                                        width: '76'
                                    }},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '白/夜班工时(工日)：'},
                                    {type: 'text-h5', filter: (value, data) => data.dayShift || data.nightShift},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text-label', value: '总工资：'},
                                    {type: 'text-h5', prop: 'moneyAmount'},
                                    {type: 'br-normal-row'}
                                ],
                                {type: 'br-form-col'}
                            ]
                        }
                    ]}
                />
            </ScrollView>
        );
    }
  }