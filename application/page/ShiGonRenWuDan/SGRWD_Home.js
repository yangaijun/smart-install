import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '施工任务单'
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
            list: []
        }
        this.params = {
            page: 1, size: 15
        }
    } 
    componentDidMount() {
        this._loadData()
     } 
    _loadData() {
        let formData = new FormData()
        formData.append('page', this.params.page)
        formData.append('size', this.params.size)
        formData.append('projectId', Freedomen.global.project.projectId)
        Freedomen.global.api.postJaso('taskSheets/taskList', formData).then(res => {
            
            this.setState({
                list: res.data.data.content
            }) 
        })
     }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
            <Freedomen.FreshList 
                data={this.state.list}
                event={params => {
                    if (params.prop == 'detail') {
                        this.props.navigation.push('SGRWD_XianQin', params.row)
                    } else if (['$page', '$fresh'].includes(params.prop)) {
                        this.params.page = params.row.pageNo
                        this._loadData()
                    } else if (params.prop == 'examineStatusMessage') {
                        this.props.navigation.push('SGRWD_ShenHe', params.row)
                    }
                }}
                columns={[
                    [
                        [
                            {type: 'text-primary', prop: 'taskName', style: {flex: 1, fontSize: 16}},
                            {type: 'text-status', prop: 'taskStatusMessage', style: (value) => {
                                return {
                                    backgroundColor: {'未完成': '#FAB722', '草稿': '#CDCDCD'}[value]
                                }
                            }},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', prop: 'taskNo', style: {flex: 1}},
                            {type: 'text-label', prop: 'createDate', value: '2019-09-16'},
                            {type: 'br-normal-row', style: {marginTop: 10}}
                        ], 
                        {type: 'click', prop: 'detail'}
                    ], [
                        {type: 'text-label',  prop: 'founderName', filter: (value) =>`签发人:${value}`},
                        {type: 'text', style: {flex: 1}},
                        {type: 'button-az', prop: 'examineStatusMessage'},
                        {type: 'br-bottoms'}
                    ],
                    {type: 'br-list-item'}
                ]}
            />
            </View>
        );
    }
  }