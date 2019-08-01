import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '物资管理',
    }
    constructor(props) {
        super(props)
        this.state = {
            data: datas.XianMu
        }
    }
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {
                    if (params.prop == 'ruku')
                        this.props.navigation.push('WZ_RuKuChuKu', {label: '入库：选择物资', type: 1})
                    else if (params.prop == 'chuku')
                        this.props.navigation.push('WZ_RuKuChuKu', {label: '出库：选择物资', type: 2})
                    else if (params.prop == 'kucun')
                        this.props.navigation.push('WZ_KuCun')
                    else if (params.prop == 'rukujilu')
                        this.props.navigation.push('WZ_RuKuJiLu')
                    else if (params.prop == 'chukujilu')
                        this.props.navigation.push('WZ_ChuKuJiLu')
                    else if (params.prop == 'fenleiguanli') 
                        this.props.navigation.push('WZ_FenLieGuanLi')
                }}
                columns={[
                    [
                        [
                            {type: 'image', value: require('../../assets/ruku.png'), style: {width: 38, height: 38, marginBottom: 8}},
                            {type: 'text-h3', value: '入库'},
                            {type: 'click', prop: 'ruku', style: {flex: 1, align: 'center'}}
                        ], 
                        {type: 'text', value: '', style: {height: 88, width: 1, backgroundColor: '#f5f5f5'}},
                        [
                            {type: 'image', value: require('../../assets/chuku.png'), style: {width: 38, height: 38, marginBottom: 8}},
                            {type: 'text-h3', value: '出库'},
                            {type: 'click', prop: 'chuku', style: {flex: 1, align: 'center'}}
                        ],
                        {type: 'br-row', style: {marginBottom: 1}}
                    ], [
                        {type: 'text-h4', value: '库存', style: {flex: 1}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'kucun'}
                    ], [
                        {type: 'text-h4', value: '入库记录', style: {flex: 1}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'rukujilu'}
                    ], [
                        {type: 'text-h4', value: '出库记录', style: {flex: 1}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'chukujilu'}
                    ], [
                        {type: 'text-h4', value: '分类管理', style: {flex: 1}},
                        {type: 'image-form', value: require('../../assets/right.png')},
                        {type: 'click-form-row', prop: 'fenleiguanli'}
                    ],
                ]}
            />
        );
    }
  }