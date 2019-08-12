import React from 'react'
import Freedomen from 'react-native-freedomen' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '机械台账',
        }
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
                list: [{},{},{}]
            })
        }, 400);
    }
    render() {
        return ( 
            <Freedomen.FreshList 
                data={this.state.list}
                columns={[
                    [
                        {type: 'text-h4', value: '第三方合作公司', style: {flex: 1}},
                        {type: 'text', value: '150', filter: value => `￥${value}`, style: {color: '#FAB722', fontSize: 14}},
                        {type: 'br-normal-row', style: {marginBottom: 5}}
                    ], [
                        {type: 'text', value: '0.00', filter: value => `已报销：￥${value}`, style: {flex: 1}},
                        {type: 'text-label', value: '150', filter: value => `未报销：￥${value}`, style: {paddingRight: 0}},
                        {type: 'br-normal-row', style: {borderBottomColor: '#f5f5f5', borderBottomWidth: 1, paddingBottom: 5}}
                    ],
                    {type: 'br-list-item'}
                ]}
            /> 
        );
    }
  }