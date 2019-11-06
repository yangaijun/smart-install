import React from 'react'
import {StatusBar, View} from "react-native";
import store from 'react-native-freedomen/store'
import Freedomen from 'react-native-freedomen' 
import columns from '../region/columns'
import datas from '../region/datas'
import utils from '../region/utils';

export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.mkData(props.navigation)
        }
    }
    componentWillReceiveProps(nextProps) { 
        this.setState({
            data: this.mkData(nextProps.navigation)
        })
    }
    componentDidMount() {
        StatusBar.setBarStyle('default')
        StatusBar.setTranslucent(false)   
    }
    mkData(navigation) { 
        const ds = {
            0: '工作',
            1: '应用',
            2: '我的项目',
            3: '消息中心',
            4: '学习'
        }
        let data = {
            label: ds[navigation.state.index],
            st: navigation.state.index == 1,
            sd: navigation.state.index == 4,
            userIcon: Freedomen.global.user && Freedomen.global.user.userIcon
        }
        return data
    } 
    render() {
        return (
            <View style={[{borderBottomColor: '#f5f5f5', borderBottomWidth: 1}, utils.PhoneType == 'iosx' && {paddingTop: 44}, utils.PhoneType == 'ios' && {paddingTop: 20}]}>
                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'userIcon') {
                            this.slideLeftPop.show()
                        } else if (params.prop == 'setting')
                            this.props.navigation.push('YinYongSheZhi')
                        else if (params.prop == 'jifen')
                            this.props.navigation.push('XX_JiFen')
                       
                    }}
                    data={this.state.data}
                    redux={'header_bar'}
                    columns={[
                        {type: 'button-image', prop: 'userIcon', filter: value => `http://www.jasobim.com:8085/${value}`, style: {width: 42, height: 42, borderRadius: 21}},
                        {type: 'text-h1', prop: 'label', value:'', style: {flex: 1, paddingLeft: 15, fontWeight: 'bold'}},
                        {type: 'button-image', value: require('../assets/saoma.png'), load: (value, data) => !data.sd, style: {height: 28, width: 28, marginLeft: 10}},
                        {type: 'button-image', prop: 'jifen', value: require('../assets/xx_jifen.png'), load: (value, data) => data.sd,  style: {height: 28, width: 28, marginLeft: 10}},
                        {type: 'button-image', prop: 'setting', value: require('../assets/setting.png'), load: (value, data) => data.st,  style: {height: 28, width: 28, marginLeft: 10}},
                        {type: 'br-row', style: {paddingTB: 5}}
                    ]}
                />
                <Freedomen.SlidePop ref={ref => {this.slideLeftPop = ref}} style={{right: '15'}}>
                    <Freedomen.Region  
                        event={params => {
                            this.slideLeftPop.hide()
                            if (params.prop == 'exit') {
                                store.remove('userInfo')
                                store.remove('menuList')
                                this.props.navigation.navigate('DenLu')
                            } else if (params.prop == 'yijianfankui') {
                                this.props.navigation.navigate('GRZX_YiJianFanKui')
                            } else if (params.prop == 'guanyuwomen') {
                                this.props.navigation.push('GRZX_GuanYuWoMen')
                            } else if (params.prop == 'tonxunlu') {
                                this.props.navigation.push('GRZX_TonXunLu')
                            } else if (params.prop == 'xiugaimima') {
                                this.props.navigation.navigate('GRZX_XuiGaiMiMa') 
                            } else if (params.prop == 'clear') {
                                Freedomen.global.toast('操作成功')
                            }
                        }}
                        data={Freedomen.global.user}
                        style={{backgroundColor: '#f5f5f5', flex: 1}}
                        columns={columns.GeRenZhonXin}
                    />
                </Freedomen.SlidePop>
                
            </View>
        );
    }
  }