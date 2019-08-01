import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import BDQD from './BaoDianQinDan'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '实测实量'
    }
    constructor(props) {
        super(props) 
        this.state = {  
            layer: 0,
            list: [[]],
            activity: 'dbsx',
            guolv: {}, 
            plzp: true
        }
    }
    componentDidMount() {  
        console.log(this.props.navigation.state.params.child)
        this.setState({
            list:[this.props.navigation.state.params.child || []],
        })

        // Promise.all([
        //     Freedomen.global.api.get('api/checkListTypes/admin/getCheckListTypesList', {
        //         checkType: 0
        //     }),
        //     Freedomen.global.api.get('api/paperPointInfo/getPaperPointInfoNumsByBuilding', {
        //         projectId: Freedomen.global.project.projectId,
        //         buildingNames: this.props.navigation.state.params.buildingNames,
        //         checkTypes: this.props.navigation.state.params.checkTypes
        //     })
        // ]).then(res => {  
        //     let guolv = this.state.guolv
        //     guolv.jianchaxian = res[0]
        //     guolv.cequleixin = res[1]
        //     console.log('cequleixin', res[1])
        //     console.log('cequleixin', this.props.navigation.state.params)
        //     this.setState({
        //         list:[res[1]],
        //         guolv: guolv
        //     })
        // }) 
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
                        {type: 'image-icon', value:  require('../../assets/back.png')},
                        {type: 'text-h4', prop: 'name',  value: '返回'},
                        {type: 'click-row', style: { marginTB: 2}}
                    ]}
                />: null
            }
            <ScrollView>
                {
                    (this.state.list[this.state.layer] || []).map((el, key) => {
                        return <Freedomen.Region key={key}
                            event={params => { 
                                if (params.prop == 'miaodian') {  
                                    params.row._bfmId = this.current.bfmId
                                    this.props.navigation.push('MiaoDian', params.row)
                                } else if (params.prop == 'loucen') {
                                    this.current = params.row
                                    let list = this.state.list
                                    list[1] = el.child  
                                    this.setState({
                                        layer: 1,
                                        list: list
                                    })
                                }
                            }}
                            data={Object.assign({}, el)}
                            columns={[
                                [
                                    {type: 'text-h3', prop: 'bName'},
                                    [
                                        {type: 'text-label', prop: 'doneNums', value: '0', filter: value => `测量点位:${value}`},
                                        {type: 'text-label', prop: 'pointNums', value: '0', filter: value => `/ ${value}`},
                                        {type: 'text-label', prop: 'problemNums', value: '8', filter: value => `  爆点数量:${value}`},
                                        {type: 'br', style: {flexDirection: 'row'}}
                                    ],
                                    // {type: 'text-label', value: '8', filter: value => `爆点数量:${value}`},
                                    {type: 'click', prop: 'loucen', style: {marginTB: 1, backgroundColor: 'white', padding: 10}, load: value => this.state.layer === 0}
                                ], [ 
                                    {type: 'text-h3', prop: 'siteName'},
                                    [
                                        {type: 'text-label', prop: 'doneNums', value: '0', filter: value => `测量点位:${value}F`},
                                        {type: 'text-label', prop: 'pointNums', value: '0', filter: value => `/ ${value}`},
                                        {type: 'text-label', prop: 'problemNums', value: '8', filter: value => `  爆点数量:${value}`},
                                        {type: 'br', style: {flexDirection: 'row'}}
                                    ],
                                    // {type: 'text-label', value: '8', filter: value => `爆点数量:${value}`},
                                    {type: 'click', prop: 'miaodian', style: {marginTB: 1, backgroundColor: 'white', padding: 10}, load: value => this.state.layer !== 0}
                                ]
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
                    {prop: 't2', value: '爆点清单', view: <BDQD navigation={this.props.navigation} />}
                ]}
            />
        );
    }
  }