import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, ScrollView} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '在线题库'
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            kinds: {kinds: []},
            activityId: 0
        }
    }
    componentDidMount() {
        Freedomen.global.api.call('/StudyWorkerType/selectList').then(res => { 
            if (res[0])
                this._loadPaper(res[0].studyWorkerTypeId)

            this.setState({
                activityId: res[0] && res[0].studyWorkerTypeId,
                kinds: {
                    kinds: res
                }
            })
        })
    }
    _loadPaper(studyWorkerTypeId) {
        Freedomen.global.api.call('/StudyPaper/select', {studyWorkerTypeId: studyWorkerTypeId, pageVo: {pageSize: 50, pageNo: 1}}).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5'}}>
                <View style={{width: 88, marginRight: 2}}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Freedomen.Region 
                            event={params => {
                                this.setState({
                                    activityId: params.value.row.studyWorkerTypeId
                                }) 
                                this._loadPaper(params.value.row.studyWorkerTypeId)
                            }}
                            data={this.state.kinds}
                            columns={[
                                {type: 'views-y', prop:'kinds', value: [], style: {width: 88}, columns: [
                                    {type: 'button-text', prop: 'name', value: '全部分类', style: (value, data) => {
                                            let color = this.state.activityId === data.studyWorkerTypeId ? '#2EBBC4': '#191919'
                                            return {padding: 15, align: 'center', backgroundColor: 'white', marginBottom: 1, color: color}
                                        }  
                                    }
                                ]}
                            ]}
                        /> 
                    </ScrollView>
                </View>
                <ScrollView>
                    {
                        this.state.list.map((el, index) => {
                            return <Freedomen.Region 
                                key={index}
                                data={el}
                                event={params => {
                                    this.props.navigation.push('XX_TiKuHome', params.row)
                                }}
                                columns={[
                                    {type: 'text-h4', prop: 'name', value: 'XXXX什么题目', style: {flex: 1}},
                                    {type: 'image-form', value: require('../../assets/right.png')},
                                    {type: 'click-form-row'}
                                ]}
                            />
                        })
                    }
                </ScrollView>
            </View>
            
        );
    }
  }