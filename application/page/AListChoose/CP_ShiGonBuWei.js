import React from 'react'
import {ScrollView, Text, View} from "react-native";
import Freedomen from 'react-native-freedomen'  
var choose
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label,
            headerRight: <Freedomen.Region 
                event={params => { 
                    let obj = {}
                    obj[navigation.state.params.formName] = (data) => {
                        return {
                            ...data,
                            constructProgressConstructPart: choose.join(',')
                        }
                    }
                    Freedomen.redux(obj)
                    navigation.goBack()
                }} 
                columns={[
                    {type: 'button-right', prop: 'shaixuan', value: '保存'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        
        this.state = {
            list: [],
            choose: props.navigation.state.params,
            columns: [{type: 'text'}]
        }
        choose = []
        this.data = {}
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/ProjectBuilding/selectTree').then(res => {
            let arr = [
                {type: 'input-text', prop: 'content', placeholder: '详细地址，例：16#5层501室'},
                {type: 'br-form-row'}
            ]
            let children = this.children(res)
            this.setState({
                columns: [arr, children]
            })
        })
    } 
    children(list, level = 0, item, label = '') {
        let arr = []
        list.forEach(el => {
            arr.push([
                {type: 'image-form',  filter: (value, data) => data[el.label + '_check'] ? require('../../assets/check.png') : require('../../assets/uncheck.png')},
                {type: 'text-h4', value: el.label, style: {flex: 1, marginLeft: 8}},
                {type: 'button-image', prop: el.value, filter: (value, data) => {
                    return data[el.value] ? require('../../assets/bottom.png') : require('../../assets/right.png')
                }, load: value => el.children, style: {width: 18, height: 18, paddingRight: 15, paddingLeft: 45}},
                {type: 'click', style: {paddingTB: 12, paddingLeft: 15, backgroundColor:'white', marginBottom: 2, flexDirection: 'row', alignItems: 'center', marginLeft: level * 35}, prop: el.label + '_check'}
            ])  
            
            this.data[el.label + '_check'] = label + el.label
            
            if (el.children) {
                arr.push(this.children(el.children, level + 1, el, label + el.label))
            } 
        })

        arr.push({
            type: 'br', 
            load: (value, data) => {
                if (item === void 0)
                    return true
                else return data[item.value]
            }
        })
        return arr
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    columns={this.state.columns}
                    event={params => { 
                        if (params.prop == 'content') {

                        } else if (params.prop) {
                            let back = {
                                ...params.row 
                            }
                            back[params.prop] = !back[params.prop]

                            if (params.prop.indexOf('_check') != -1) { 
                                if (back[params.prop]) {
                                    choose.push(this.data[params.prop])
                                } else {
                                    let index = choose.indexOf(this.data[params.prop]) 
                                    if (index != -1) {
                                        choose.splice(index, 1)
                                    }
                                }
                            } 
                            return back
                        } 
                    }}
                />
            </ScrollView>
        );
    }
  }