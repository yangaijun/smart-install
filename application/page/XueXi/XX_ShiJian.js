import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
const Search = columns.ZA_Search() 
export default  class  extends React.Component {
    static navigationOptions = {
        title: '安全事件'
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageVo: {
                "pageNo": 1,
                "pageSize": 15
            }
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/StudyEvent/select', this.params).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    event={params => {
                        if (['$page', '$fresh'].includes(params.prop))
                            this._loadData()
                        else {
                            console.log(params.row)
                            this.props.navigation.navigate('P_View', {uri: params.row.linkUrl})
                        }
                    }}
                    data={this.state.list}
                    columns={columns.ShiJian}
                />
            </View>
        );
    }
  }