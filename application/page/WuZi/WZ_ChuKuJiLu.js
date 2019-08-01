import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '出库记录',
        // headerRight: <Freedomen.Region 
        //     event={params => {
        //         navigation.push('WZ_XinJian')
        //     }}
        //     columns={[
        //         {type: 'button-image', value: require('../../assets/tianjia.png'), style: {width: 28, height: 28, marginRight: 12}}
        //     ]}
        // />
    }}
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
         
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}]
            })
        }, 600);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    event={params => { }}
                    data={this.state.list}
                    columns={[
                    [
                        {type: 'text-h4', value: '2019-08-07', style: {flex: 1}},
                        {type: 'text-primary', value: '1项材料'},
                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}
                    ],
                    {type: 'text', value: '由于', filter: value => `领取人：${value}`},
                    {type: 'br-list-item'}
                    ]}
                />
            </View>
        );
    }
  }