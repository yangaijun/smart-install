import React from 'react'
import {Text, StatusBar, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../region/columns'
import datas from '../region/datas'
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
            0: '首页',
            1: '应用',
            2: '...',
            3: '我的项目',
            4: '学习'
        }
        let data = {
            label: ds[navigation.state.index],
            st: navigation.state.index == 1,
            sd: navigation.state.index == 4
        }
        return data
    }
    render() {
        return (
            <View style={{borderBottomColor: '#f5f5f5', borderBottomWidth: 1}}>
                <Freedomen.Region 
                    event={params => {
                        if (params.prop == 'header') 
                            this.slideLeftPop.show()
                        else if (params.prop == 'setting')
                            this.slideRightPop.show()
                        else if (params.prop == 'jifen')
                            this.props.navigation.push('XX_JiFen')
                    }}
                    data={this.state.data}
                    columns={[
                        {type: 'button-image', prop: 'header', value: require('../assets/image_header.png'), style: {width: 42, height: 42, borderRadius: 42}},
                        {type: 'text-h1', prop: 'label', value:'', style: {flex: 1, paddingLeft: 15, fontWeight: 'bold'}},
                        {type: 'button-image', value: require('../assets/saoma.png'), load: (value, data) => !data.sd, style: {height: 28, width: 28, marginLR: 12}},
                        {type: 'button-image', prop: 'jifen', value: require('../assets/xx_jifen.png'), load: (value, data) => data.sd,  style: {height: 28, width: 28, marginLR: 12}},
                        {type: 'button-image', value: require('../assets/xiaoxi.png'), style: {height: 28, width: 28}},
                        {type: 'text-badge', value: 8, load: value => value, style: {marginLeft: -10, marginTop: -20}},
                        {type: 'button-image', prop: 'setting', value: require('../assets/setting.png'), load: (value, data) => data.st,  style: {height: 28, width: 28}},
                        {type: 'br-row', style: {paddingTB: 5}}
                    ]}
                />
                <Freedomen.SlidePop ref={ref => {this.slideLeftPop = ref}} style={{right: '15'}}>
                    <Freedomen.Region  
                        style={{backgroundColor: '#f5f5f5', flex: 1}}
                        columns={columns.GeRenZhonXin}
                    />
                </Freedomen.SlidePop>
                <Freedomen.SlidePop ref={ref => {this.slideRightPop = ref}} style={{left: '15'}}>
                    <Freedomen.Region 
                        style={{flex: 1}} 
                        event={params => {
                            console.log(params)
                        }}
                        data={{list: datas.YinYon}}
                        columns={columns.SheZhi}
                    />
                </Freedomen.SlidePop>
            </View>
        );
    }
  }