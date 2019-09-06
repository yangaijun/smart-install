import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '筛选',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        sgrz_shaixuan: {kssj: '', jssj: ''}
                    })
                }}
                columns={[
                    {type: 'button-right', value: '重置'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'biaoduan')
                        this.props.navigation.push('CP_BiaoDuan', {...params.row, label: '标段', formName: 'sgrz_shaixuan'})
                    else if (params.prop == 'chuanjianren')
                        this.props.navigation.push('CP_User', {...params.row, label: '创建人', formName: 'sgrz_shaixuan'})
                    else if (params.value == '确定') {
                        Freedomen.global.callBack(params.row)
                        this.props.navigation.goBack()
                    }
                }}
                redux={'sgrz_shaixuan'}
                columns={[
                    [
                       {type: 'text-form-label', value: '标段', style: {flex: 1}},
                       {type: 'text-h5', prop: 'tendersName', placeholder: '请选择标段'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'click-form-row', prop: 'biaoduan'}
                   ], [
                       {type: 'text-form-label', value: '开始时间', style: {flex: 1}},
                       {type: 'pick-date', prop: 'startTime', placeholder: '请选择开始时间'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'br-form-row'}
                   ], [
                       {type: 'text-form-label', value: '结束时间', style: {flex: 1}},
                       {type: 'pick-date', placeholder: '请选择结束时间', prop: 'endTime'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'br-form-row'}
                   ], [
                       {type: 'text-form-label', value: '创建人', style: {flex: 1}},
                       {type: 'text-h5', prop: 'userRealName', placeholder: '请选择'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'click-form-row', prop: 'chuanjianren'}
                   ],[
                        {type: 'button-primary', value: '确定', style: {width: '58', borderRadius: 28}},
                        {type: 'br', style: {paddingTop: 35, backgroundColor: 'white', align: 'center'}}
                   ]
                   
                ]}
            />
        );
    }
  }