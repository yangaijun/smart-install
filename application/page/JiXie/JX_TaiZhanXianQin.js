import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text} from 'react-native'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label ,
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() { }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => { 
                    if (params.prop == 'JG_TonJi') {
                        this.props.navigation.push('JG_TonJi', {label: '项目记工统计'})
                    } else if (params.prop == 'JG_JieSuan') {
                        this.props.navigation.push('JG_JieSuan', {label: '项目记工结算'})
                    } else if (params.prop == 'd') {
                        this.props.navigation.push('JG_XinJian', {label: '新建人工消耗'})
                    }
                }}
                columns={[
                    [ 
                        {type: 'tags-tab', value: '我的记录', prop:'mm', options: '我的记录,项目记录'},
                        {type: 'br-row', style: {backgroundColor: 'white', paddingTB: 8, marginBottom: 2}}
                    ], [
                        {type: 'text-form-label', value: '项目记工统计', style: {flex: 1}},
                        {type: 'text-primary', value: 1.1, filter: value => `${value}工日`},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'JG_TonJi'}
                    ], [
                        {type: 'text-form-label', value: '记工结算', style: {flex: 1}},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'JG_JieSuan'}
                    ], [
                        {type: 'text-form-label', value: '公司工人名册', style: {flex: 1}},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'd'}
                    ], [
                        {type: 'text-form-label', value: '标准工时', style: {flex: 1}},
                        {type: 'text', value: 10, filter: value => `${value} 小时/天`},
                        {type: 'image-form', value:　require('../../assets/right.png')},
                        {type: 'click-form-row'}
                    ]
                ]}
            />
        );
    }
  }