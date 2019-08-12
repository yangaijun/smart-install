import React from 'react'
import {Text, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '资讯'
      }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageSize: 15,
            pageIndex: 1
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.get('api/newsInfo/admin/getNewsInfoList', this.params).then(res => {
            this.setState({list: res})
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    event={params => {
                        if (['$page', '$fresh'].includes(params.prop)) {
                            this.params.pageIndex = params.row.pageNo
                            this._loadData()
                        }
                    }}
                    data={this.state.list}
                    columns={columns.ZiXunItem}
                />
             </View>
        );
    }
  }