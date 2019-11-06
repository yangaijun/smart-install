import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, ScrollView} from 'react-native'
import columns from '../../region/columns'  
const Search = columns.ZA_Search('请输入检查项名称') 
var checkTypeList
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '添加检查项',
            headerRight: <Freedomen.Region 
                event={params => {  
                    Freedomen.redux({
                        zl_xinzen: data => {
                            data.checkTypeList = checkTypeList
                            return data 
                        }
                    })
                    navigation.navigate('ZL_XinZen')
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: props.navigation.state.params.checkTypeList
        } 
        checkTypeList = this.state.list
    }
    render() {
        return ( 
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
            {
                this.state.list.map((el, index) => {
                    return <Freedomen.Region  
                        key={index}
                        data={el}
                        event={params => {  
                            this.state.list.splice(index, 1)
                            this.setState({
                                list: this.state.list
                            })
                            checkTypeList = this.state.list
                        }}
                        columns={[
                            {type: 'text-label', value: index + 1},
                            {type: 'text-label', prop: 'name', style: {marginLeft: 15, flex: 1}},
                            {type: 'button-image-icon', prop: 'shanchu', value: require('../../assets/shanchu.png')},
                            {type: 'br-form-row'}
                        ]}
                    />
                })
            }

            <Freedomen.Region  
                event={params => { 
                    name = params.value
                    if (params.prop == 'jianchaxiantianjia') {
                        this.props.navigation.replace('ZL_JianChaXianTianJia', {checkTypeList: checkTypeList})
                    }
                }}
                columns={[
                    {type: 'image-form', value: require('../../assets/tianjia.png')},
                    {type: 'text-primary', value: '添加检查项', style: {marginLeft: 5}},
                    {type: 'click-form-row', prop: 'jianchaxiantianjia', style: {align: 'center'}}
                ]}
            />
            </ScrollView> 
        );
    }
  }