import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '答题精华',
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            pageVo: {pageSize: 15, pageNo: 1}
        }
    }
    componentDidMount() {
        this._loadData()
        
    }
    _loadData() {
        Freedomen.global.api.call('/StudyData/select', this.params).then(res => {
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
                        if (['$fresh', '$page'].includes(params.prop)) {
                            this.params.pageVo.pageNo = params.row.pageNo
                            this._loadData()
                        } else if (params.prop == 'timuxianqin') {
                            this.props.navigation.push('XX_TiMuXianQin', params.row)
                        }
                    }}
                    columns={[
                        {type: 'text-h4', prop: 'dataName', value: '天外飞来了一头猪'},
                        {type: 'text', prop: 'name', value: '19-08-11'},
                        {type: 'click-col', prop: 'timuxianqin'}
                    ]}
            />
           </View>
        );
    }
  }