import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '机械进场',
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
                list: [{t: false}, {t: false}, {t: true}]
            })
        }, 400);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    event={params => { }}
                    columns={[
                        {type: 'text-form-label', value: '只看未退场', style: {flex: 1}},
                        {type: 'switch', prop: 'd'},
                        {type: 'br-form-row'}
                    ]}
                />
                <Freedomen.FreshList 
                    data={this.state.list}
                    event={params => {
                        if (params.prop == 'item') {
                            this.props.navigation.push('JX_JinChanXianQin', params.row)
                        }
                    }}
                    columns={[
                        [
                            {type: 'text-form-label', value: '电气输送装备', style: {flex: 1}},
                            {type: 'text-h4', value: 2, filter: value => `${value} 台`},
                            {type: 'br-normal-row'}
                        ], 
                        {type: 'text-label', value: '第三方合作公司'},
                        [
                            {type: 'text-primary', value: '进场', style: {backgroundColor: '#EFFAFA', padding: 2, paddingLR: 8, marginRight: 10}},
                            {type: 'text-h5', value: '2019-07-01', style: {flex: 1}},
                            {type: 'text-h5', value: '2019-07-01', load: (value, data) => data.t},
                            {type: 'text-must', value: '退场', style: {backgroundColor: '#FFF3F4', padding: 2, paddingLR: 8, marginLeft: 10}, load: (value, data) => data.t},
                            {type: 'button', value: '退场', style: {color: '#FF6B73', borderColor: '#FF6B73', borderWidth: 1, padding: 3, paddingLR: 15, borderRadius: 2}, load: (value, data) => !data.t},
                            {type: 'br-bottoms'}
                        ],
                        {type: 'click-list-item', prop: 'item'}
                    ]}
                />
                <Freedomen.Region 
                    style={{
                        position: 'absolute',
                        bottom: 45,
                        right: 22
                    }}
                    event={params => {
                        if (params.prop == 'cancel') {
                            return {cancel: !params.row.cancel}
                        }
                    }}
                    columns={[
                        {type: 'button-image', value: require('../../assets/wz_shoudonxinjian.png'), load: (value, data) => data.cancel, style: {width: 110, resizeMode: 'stretch', height: 42, marginRight: 12}},
                        {type: 'button-image', value: require('../../assets/wz_saomadaoru.png'), load: (value, data) => data.cancel, style: {width: 110, resizeMode: 'stretch', height: 42, marginRight: 12}},
                        {type: 'button-image', prop: 'cancel', filter: value => { return value ? require('../../assets/wz_quxiao.png') : require('../../assets/za_jia.png')}, style: {height: 58, width: 58, marginBottom: 5, alignItems: 'flex-end'}},
                    ]}
                />
            </View>
        );
    }
  }