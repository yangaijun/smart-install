import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import BDQD from './SCSL_BaoDianQinDan' 
import P_Chat from '../APublic/P_Chat';

export default  class  extends React.Component {
    static navigationOptions = {
        title: '实测实量'
    }
    constructor(props) {
        super(props) 
        this.state = {  
            layer: 0,
            list: [[{}, {}]],
            activity: 'dbsx',
            guolv: {}, 
            plzp: true
        }
        this.list = this.props.navigation.state.params.buildingInfoList
    }
    componentDidMount() {   
        this.setState({
            list: [this.props.navigation.state.params.buildingInfoList]
        })
    } 
    _t1() {
        return <View>
            {
                this.state.layer > 0 ? 
                <Freedomen.Region 
                    event={params => {
                        this.setState({
                            layer: 0
                        })   
                    }}
                    columns={[
                        {type: 'image-form', value:  require('../../assets/left.png')},
                        {type: 'text-h5', prop: 'name',  value: '返回 楼幢'},
                        {type: 'click', style: {flexDirection: 'row', backgroundColor: 'white', padding: 10, marginBottom: 2, alignItems: 'center'}}
                    ]}
                />: null
            }
            <ScrollView>
                {
                    this.state.list[this.state.layer].map((el, key) => {
                        return <Freedomen.Region key={key}
                            event={params => { 
                                if (params.prop == 'loucen') {  
                                    return {
                                        ...params.row,
                                        loucen: !params.row.loucen
                                    }
                                } else if (params.prop == 'loudon') { 
                                    this.currentLonDon = params.row.measureSiteName 
                                    let list = this.state.list 
                                    list[1] = el.measureFloorInfo
                                    this.setState({
                                        layer: 1,
                                        list: list
                                    })
                                } else if (params.value && params.value.prop == 'fanjian') {
                                    
                                    this.props.navigation.push('SCSL_MiaoDian', {label: this.currentLonDon + '/' + params.value.row.measureSiteName, ...params.value.row})
                                }
                            }}

                            data={el}
                            columns={[
                                [
                                    {type: 'text-h5', prop: 'measureSiteName', value: '一个楼'},
                                    [
                                        {type: 'text-label', prop: 'doneNum', value: '0', filter: value => `测量点位:${value}`},
                                        {type: 'text-label', prop: 'allNum', value: '0', filter: value => `/ ${value}`},
                                        {type: 'text-label', prop: 'problemNum', value: '8', filter: value => `  爆点数量:${value}`},
                                        {type: 'br', style: {flexDirection: 'row'}}
                                    ],
                                    // {type: 'text-label', value: '8', filter: value => `爆点数量:${value}`},
                                    {type: 'click', prop: 'loudon', style: {marginTB: 1, backgroundColor: 'white', padding: 10}, load: value => this.state.layer === 0}
                                ], [ 
                                    {type: 'text-h5', prop: 'measureSiteName', value: '楼层', style: {flex: 1}},
                                    {type: 'image-form', filter: (value, data) => {
                                        return data.loucen ? require('../../assets/bottom.png') : require('../../assets/right.png')
                                    }}, 
                                    {type: 'click-form-row', prop: 'loucen', load: value => this.state.layer !== 0}
                                ], {
                                    type: 'views', prop:'measureRoomInfo', columns: [
                                        [
                                            {type: 'text-h5', prop: 'measureSiteName', value: '房间'},
                                            [
                                                {type: 'text-label', prop: 'doneNum', value: '0', filter: value => `测量点位:${value}`},
                                                {type: 'text-label', prop: 'allNum', value: '0', filter: value => `/ ${value}`},
                                                {type: 'text-label', prop: 'problemNum', value: '8', filter: value => `  爆点数量:${value}`},
                                                {type: 'br', style: {flexDirection: 'row'}}
                                            ],
                                            {type: 'br', style: {flex: 1}}
                                        ],
                                        {type: 'click', prop: 'fanjian', style: {marginTB: 1, backgroundColor: '#fAfAfA', padding: 5, paddingLeft: 42}, load: value => this.state.layer !== 0}
                                    ],
                                    load: (value, data) => data.loucen
                                }
                            ]}
                        />
                    })
                }
            </ScrollView>
        </View>
    }
    render() {
        return (
            <Freedomen.Tab   
                columns={[
                    {prop: 't1', value: '按区域排列', view: this._t1()},
                    {prop: 't2', value: '爆点清单', view:  <BDQD navigation={this.props.navigation} />}
                ]}
            />
        );
    }
  }