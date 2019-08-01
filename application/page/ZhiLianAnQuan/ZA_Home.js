import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: navigation.state.params.label,
    }}
    constructor(props) {
        super(props)
        this.state = {
         
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
            <View style={{flex: 1}}>
            <Freedomen.Region 
                style={{alignItems: 'center', paddingTop: 10, flex: 1, backgroundColor: 'white'}}
                event={params => {
                    if (params.prop == 'jiancha')
                        this.props.navigation.navigate('ZA_LieBiao', {label: '质量检查'})
                    else if (params.prop == 'zhengai')
                        this.props.navigation.navigate('ZA_LieBiao', {label: '质量整改'})
                    else if (params.prop == 'daiwozhengai')
                        this.props.navigation.navigate('ZA_LieBiao', {label: '待我整改'})
                    else if (params.prop == 'daiwoyanshou')
                        this.props.navigation.navigate('ZA_LieBiao', {label: '待我验收'})
                    else if (params.prop == 'jianchen')
                        this.props.navigation.navigate('ZA_JianChen')
                    else if (params.prop == 'jianchaxian') 
                        this.props.navigation.navigate('ZA_JianChaXian')
                }}
                columns={[
                    [
                        [
                            {type: 'image-item', value: require('../../assets/za_jiancha.png')},
                            {type: 'text-h4', value: '检查'},
                            {type: 'click', prop: 'jiancha', style: {align: 'center', flex: 1}}
                        ], [
                            {type: 'image-item',  value: require('../../assets/za_zhengai.png')},
                            {type: 'text-h4', value: '整改'},
                            {type: 'click', prop: 'zhengai', style: {align: 'center', flex: 1}}
                        ], [
                            {type: 'image-item', value: require('../../assets/za_jianchen.png')},
                            {type: 'text-h4', value: '奖惩'},
                            {type: 'click', prop: 'jianchen', style: {align: 'center', flex: 1}}
                        ], [
                            {type: 'image-item',  value: require('../../assets/za_jianchaxian.png')},
                            {type: 'text-h4', value: '检查项'},
                            {type: 'click', prop: 'jianchaxian', style: {align: 'center', flex: 1}}
                        ],
                        {type: 'br-row', style: {width: '98', borderRadius: 5, marginBottom: 15}}
                    ], [
                        {type: 'image-item', value: require('../../assets/za_daiwozhengai.png'), style: {height: 32, width: 32}},
                        {type: 'text-h4', value: '待我整改  ', style: {backgroundColor: 'white'}},
                        {type: 'text-primary', value: '1', filter: value => {return `(${value})`}},
                        {type: 'click-card', prop: 'daiwozhengai', style: {width: '95',marginTB: 10}}
                    ], [
                        {type: 'image-item', value: require('../../assets/za_daiwoyanshou.png'), style: {height: 32, width: 32}},
                        {type: 'text-h4', value: '待我验收  ', style: {backgroundColor: 'white'}},
                        {type: 'text-primary', value: '0', filter: value => {return `(${value})`}},
                        {type: 'click-card', prop: 'daiwoyanshou', style: {width: '95'}}
                    ],
                ]}
            />
            <Freedomen.Region 
                style={{
                    position: 'absolute',
                    bottom: 20,
                    alignItems: 'center',
                    width: '100%'
                }}
                event={params => {
                    this.props.navigation.navigate('ZA_XinZen')
                }}
                columns={[
                    {type: 'button-image', value: require('../../assets/za_jia.png'), style: {height: 58, width: 58, marginBottom: 5}},
                    {type: 'text-h4', value: '新增检查'}
                ]}
            />
        </View>
        );
    }
  }