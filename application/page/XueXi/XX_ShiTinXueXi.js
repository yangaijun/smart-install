import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = {
        title: '视听学习',
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageVo: {pageSize: 15, pageNo: 1}, 
            type: 1 
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/StudyFile/select', this.params).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.FreshList
                    data={this.state.list} 
                    event={params => {
                        if (['$page', '$fresh'].includes(params.prop)) {
                            this.params.pageVo.pageNo = params.row.pageNo
                            this._loadData()
                        }
                    }}
                    columns={[
                        [
                            {type: 'text-h4', prop: 'title', value: '天外飞来了一头猪'},
                            {type: 'text', prop: 'name', value: '19-08-11'},
                            {type: 'br', style: {flex: 1}}
                        ], [
                            {type: 'image', value: require('../../assets/play.png'), style: {width: 26, height: 26}},
                            {type: 'backimage', prop: 'pic', filter: value =>`http://www.jasobim.com:8085/${value}`, style: {width: 120, height: 80, align: 'center'}},
                        ],
                        {type: 'click-col', prop: 'shitixianqin', style: {flexDirection:'row'}}
                    ]}
                />
           </View>
        );
    }
  }