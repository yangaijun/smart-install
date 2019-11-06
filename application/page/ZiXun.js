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
            pageVo: {pageNo: 1, pageSize: 15}
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/NewsInfo/select', this.params).then(res => {
            console.log(res.data)
            this.setState({list: res.data})
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
                        } else if (params.prop == 'into') {
                            this.props.navigation.push('P_View',  {uri: params.row.content, ...params.row})
                        }
                    }}
                    data={this.state.list}
                    columns={columns.ZiXunItem}
                />
             </View>
        );
    }
  }