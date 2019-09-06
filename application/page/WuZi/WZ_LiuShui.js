import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '物资流水',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('WZ_BianJi', navigation.state.params)
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/bianji.png')}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            data: {
                ...this.props.navigation.state.params,
                list: []
            },
            bottomData: { },
        }
        this.params = {
            ...this.state.data,
            pageVo: {}
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/MaterialLog/select', this.params).then(res => { 
            console.log(res)
            let ruku = 0, chuku = 0
            res.map(el => {
                if (el.logType === 0)
                    ruku += el.logNum
                else 
                    chuku += el.logNum
            })

            this.setState({
                data: {
                    ...this.state.data,
                    list: res
                },
                bottomData: {
                    ruku: ruku,
                    chuku: chuku,
                    kucun: this.props.navigation.state.params.leaveNum
                }
            })
        })
    }
    render() {
        const row = {
            type: 'br',
            style: {
                flexDirection: 'row',
                paddingLeft: 10,
                paddingTB: 5,
            }
        }
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        data={this.state.data}
                        columns={[
                            [
                                {type: 'text-h5', prop: 'materialCode', filter: value => `编码： ${value || ''}`},
                                row
                            ], [
                                {type: 'text-h5', prop: 'materialName', filter: value => `名称： ${value}`},
                                row
                            ], [
                                {type: 'text-h5', prop: 'materialTypeName', value: '综合布线系统', filter: value => `分类： ${value}`},
                                row
                            ], [
                                {type: 'text-h5', prop: 'materialSize', filter: value => `规格： ${value}`},
                                row
                            ], [
                                {type: 'text-h5', prop: 'materialUnit', filter: value => `单位： ${value}`},
                                row
                            ], [
                                {type: 'text-h5', prop: 'remark', filter: value => `备注： ${value}`},
                                row
                            ], [
                                {type: 'text-label', value: '日期', style: {flex: 1, align: 'center'}},
                                {type: 'text-label', value: '记录人', style: {flex: 1, align: 'center'}},
                                {type: 'text-label', value: '单价', style: {flex: 1, align: 'center'}},
                                {type: 'text-label', value: '出入库', style: {flex: 1, align: 'center'}},
                                {type: 'br-normal-row', style: {backgroundColor: '#f5f5f5', paddingTB: 10, marginTop: 12}}
                            ], {type: 'views', prop: 'list', value: [{ru: 0, price: 12},{ru: 1, price: 10}], columns:[
                                {type: 'text-h5', prop: 'createTime', style: {flex: 1, align: 'center'}},
                                {type: 'text-h5', prop: 'userRealName', style: {flex: 1, align: 'center'}},
                                {type: 'text-h5', prop: 'price', style: {flex: 1, align: 'center'}},
                                {type: 'text-h5', prop: 'logNum',
                                    filter: (value, data) => (data.logType === 0 ? '+ ' : '- ') + value,
                                    style: (value, data) => {
                                        return {flex: 1, align: 'center', color: data.logType === 0 ? '#2EBBC4' : '#FF6D73'}
                                    }
                                },
                                {type: 'br-normal-row', style: {paddingTB: 10, borderBottomColor: '#f5f5f5', borderBottomWidth: 1}}
                            ]},
                            {type: 'br', style: {backgroundColor: 'white', paddingTop: 10}}
                        ]}
                    />
                </ScrollView>
                <Freedomen.Region 
                    style={{height: 52, backgroundColor: 'white', align: 'center'}}
                    data={this.state.bottomData}
                    columns={[
                        {type: 'text-primary', prop: 'ruku', value: '--', filter: value => `入库：${value}`, style: {flex: 1, align: 'center'}},
                        {type: 'text-must', prop: 'chuku', value: '--', filter: value => `出库：${value}`, style: {flex: 1, align: 'center'}},
                        {type: 'text-h5', prop: 'kucun', value: '--', filter: value => `库存：${value}`, style: {flex: 1, align: 'center'}},
                        {type: 'br-normal-row'}
                    ]}
                />
            </View>
        );
    }
  }