import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '阅读资料',
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.setState({
            list: [{}, {}, {}]
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList
                    data={this.state.list} 
                    columns={[
                        [
                            {type: 'text-h4', prop: 'topic', value: '10月20日嘉实正式成为最新大佬， 2019年，让美好与我同在...'},
                            [
                                {type: 'text-tag', prop: 'readStatus', value: '置顶', filter: {1: '置顶', 0: '普通'}, load: value => value},
                                {type: 'text-label', prop: 'createDate', value: '2分钟前'},
                                {type: 'br', style: {flexDirection: 'row', paddingTB: 15, alignItems: 'center'}}
                            ],
                            {type: 'br', style: {flex: 1, marginRight: 5}}
                        ],
                        {type: 'image', value: require('../../assets/image_header.png'), prop: 'remark', style: {width: 120, height: 80}},
                        {type: 'click-row', prop: 'into', style: {marginTop: 1}}
                    ]}
            />
           </View>
        );
    }
  }