import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text} from 'react-native'
import columns from '../../region/columns'
const Search = columns.ZA_Search('请输入工人名字查询')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => {   
                }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
      
    }
    
    render() {
        return (
            <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                event={params => {
                    if (params.prop == '_clear') {
                        params.row.content = ''
                        return params.row
                    }
                }}
                columns={[
                    [
                        Search,
                        {type: 'br-form-row'}
                    ], [
                        [
                            {type: 'text-label', value: '已报销(元)'},
                            {type: 'text-primary', value: '41.0'},
                            {type: 'br', style: {align: 'center', flex: 1}}
                        ], [
                            {type: 'text-label', value: '未报销(元)'},
                            {type: 'text-h5', value: '41', style: {fontWeight: '500'}},
                            {type: 'br', style: {align: 'center', flex: 1, borderColor: '#f5f5f5', borderLeftWidth: 1, borderRightWidth: 1}}
                        ], [
                            {type: 'text-label', value: '总工资(元)'},
                            {type: 'text-primary', value: '770.00'},
                            {type: 'br', style: {align: 'center', flex: 1}}
                        ],
                        {type: 'br-form-row', style: {paddingLR:　1}}
                    ], {
                        type: 'views', value: [{}, {}], columns: [
                            [
                                {type: 'text-form-label', value: '王大头', style: {flex: 1}},
                                {type: 'text', value: '150', filter: value => `￥${value}`, style: {color: '#FAB722'}},
                                {type: 'br-normal-row', style: {paddingBottom: 5}}
                            ], [
                                {type: 'text', value: '0.00', filter: value => `已报销： ￥${value}`, style: {flex: 1}},
                                {type: 'text', value: '0.00', filter: value => `未报销： ￥${value}`},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-list-item'}
                        ]
                    }
                ]}
           />
        );
    }
  }