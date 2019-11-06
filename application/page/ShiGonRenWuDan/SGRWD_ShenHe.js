import React from 'react'
import {View, ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '审核跟踪'
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
            data: {list: []},
            data2: {list: []}
        }
        // console.log(this.props.navigation.state.params)
    } 
    componentDidMount() {
        let id = this.props.navigation.state.params.id
        Freedomen.global.api.getJaso(`/taskSheets/message/${id}`).then(res => {
            console.log(res)
            let list = []
            for (let i = 0; i < res.data.data.approveList.length; i ++) {
                list.push(res.data.data.approveList[i])
                if (res.data.data.approveList[i].agreeFlag === 0)
                    break;
            }
            console.log(list)
            this.setState({
                data: {
                    list: res.data.data.approveList,
                },
                data2: {
                    list: list.reverse()
                }
            })
        })
     } 
    render() { 
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.Region 
                    data={this.state.data}
                    style={{backgroundColor: '#4E5962', padding: 5, paddingTB: 8}}
                    columns={[
                        {
                            type: 'views-x',
                            prop: 'list',
                            style: {justifyContent: 'space-between'},
                            columns: [
                                {type: 'text-list',prop: '$index', filter: value => value + 1, style: (value, data) => {
                                    let bgcolor = data.agreeFlag === 0 ? '#A9A9A9' : '#2EBBC4'
                                    let color = data.agreeFlag === 0 ? '#E2E2E2' : 'white'
                                    return {
                                        backgroundColor: bgcolor,
                                        color: color
                                    }
                                }},
                                {type: 'text', prop: 'approveUserNames', style: (value, data) => {
                                    let color = data.agreeFlag === 0 ? '#E2E2E2' : '#2EBBC4'
                                    return {
                                        color: color
                                    }
                                }},
                                {type: 'text', prop: 'agreeFlag', filter: {0: '待审核', 1: '通过', 2: '未通过'}, style: (value, data) => {
                                    let color = data.agreeFlag === 0 ? '#E2E2E2' : '#2EBBC4'
                                    return {
                                        color: color
                                    }
                                }},
                                {type: 'br', style: {align: 'center'}}
                            ]
                        }
                    ]}
                />
                <Freedomen.Region 
                    data={this.state.data2}
                    columns={[
                        {
                            type: 'views',
                            prop: 'list',
                            style: {padding: 10},
                            columns: [
                                [
                                    {type: 'text', style: (value, data) => {return {backgroundColor: data.$index === 0 ? '#2EBBC4' : '#E2E2E2', width: 20, height: 20, borderRadius: 10}}},
                                    {type: 'text', style: {
                                        width: 4,
                                        height: 65,
                                        backgroundColor: '#E2E2E2'
                                    }},
                                    {type: 'br', style: {width: 45, alignItems: 'center'}}
                                ], [
                                    {type: 'text', filter: (value, data) => `${data.approveUserNames} (${data.approvePositionNames} ${{0: '待审核', 1: '通过', 2: '未通过'}[data.agreeFlag]})`, style: (value, data) =>{return {color: data.$index === 0 && '#2EBBC4'}} },
                                    {type: 'text', prop: 'createDatetime', style: (value, data) =>{return {color: data.$index === 0 && '#2EBBC4'}} }
                                ],
                                {type: 'br', style: {flexDirection: 'row'}}
                            ]
                        }
                    ]}
                />
            </ScrollView>
        );
    }
  }