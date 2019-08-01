import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '在线题库'
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}, {}]
            })
        }, 100);
    }
    render() {
        return (
            <Freedomen.FreshList 
                data={this.state.list}
                event={params => {
                    this.props.navigation.push('XX_TiKuHome', params.row)
                }}
                columns={[
                    {type: 'text-h3', value: 'XXXX什么题目'},
                    {type: 'click-row', style: {borderBottomColor: '#f5f5f5', borderBottomWidth: 1}}
                ]}
            />
        );
    }
  }