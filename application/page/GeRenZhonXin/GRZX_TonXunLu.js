import React from 'react';
import {View, Dimensions, Linking} from 'react-native'  
import Freedomen from 'react-native-freedomen'
export default class extends React.Component { 
    static navigationOptions = {  
        title: '通讯录', 
    }; 
    constructor (props) {
        super (props) 
        this.state = { 
            list: []
        }
        this.params = {
            pageVo: {
                pageNo: 1,
                pageSize: 15
            }
        }
    } 
    componentWillMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/JasoUser/getPhoneBook', this.params).then(res => { 
            this.setState({list: res.records})
        }) 
    }
    render() {
        return ( 
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Freedomen.FreshList    
                    event={params => { 
                        if (params.prop == 'call')
                            Linking.openURL(`tel:${params.row.tel}`) 
                        else if (['$page', '$fresh'].includes(params.prop)) {
                            this.params.pageVo.pageNo = params.row.pageNo
                            this._loadData()
                        }
                    }}
                    columns={[
                        {type: 'image-header', prop: 'userIcon', filter: (value) => `http://www.jasobim.com:8085/${value}`},
                        [
                            {type: 'text-h4', prop: 'realName', value: '小张同'},
                            {type: 'text', prop: 'tel', value: '联系电话：18852985544', style: {paddingTop:　3}},
                            {type: 'br', style: {flex: 1, paddingLeft: 5}}
                        ],
                        {type: 'button-image', prop: 'call', value: require('../../assets/old/dianhua.png'), style: {height: 25, width: 25, resizeMode: 'stretch'}},
                        {type: 'br-list-item', style: {flexDirection: 'row', alignItems: 'center'}}
                    ]}
                    data={this.state.list}
                />
            </View>
        )
    }
} 