import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns'
const Search = columns.ZA_Search('请输入创建人查询')
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '日报详情',
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
        const tagStyle = (data, prop) => {
            let color = data.activity == prop ? '#191919' : '#999'
            let borderBottomColor = data.activity == prop ? '#2EBBC4' : '#ddd'
            return {
                color: color,
                borderBottomColor: borderBottomColor,
                borderBottomWidth: 2,
                padding: 15,
                paddingLR: 20
            }
        }
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{flex: 1}}>
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'yd' || params.prop == 'wd') {
                                params.row.activity = params.prop
                                return params.row
                            }
                        }}
                        data={{activity: 'yd'}}
                        columns={[
                            [
                                {type: 'image-header', value: require('../../assets/image_header.png')},
                                {type: 'text-h3', value: '王大头', style: {flex: 1, paddingLeft: 5}},
                                [
                                    {type: 'text', value: '2019-06-08'},
                                    {type: 'text', value: '星期六'}
                                ],
                                {type: 'br-form-row', style: {borderBottomColor: '#f5f5f5', borderBottomWidth: 2, paddingTB: 15}}
                            ], [
                                {type: 'text-label', value: '今日完成工作'},
                                {type: 'text-p', value: '完成工作内容完成工作内容完成工作内容完成工作内容 完成工作内容完成工作内内容完成工作内容 完成工作内容完成工作内容作内内容完成工作内容 完成工作内内容完成工作内容 完成工'},
                                {type: 'text-label', value: '未完成的工作'},
                                {type: 'text-p', value: '完成工作内容完成工作内容完成工作内容完成工作内容 完成工作完容完成工作内容'},
                                {type: 'text-label', value: '需要协调工作'},
                                {type: 'text-p', value: '完成工作内容完成工作内容完成工作内容完成工作内容 完成工作内容完成工作内容完成工作内容完成工作内容完成工作内容完成工作内容 完成工作内容完成工作内容'},
                                {type: 'text-label', value: '明日计划'},
                                {type: 'text-p', value: '工作内容 完成工作内容完成工作内容完成工作内容完成工作内容完成工作内容完成工作内容 完成工作内容完成工作内容'},
                                {type: 'text', value: '图片'},
                                [
                                    {type: 'image-form', value: require('../../assets/left.png')},
                                    {type: 'button-text', value: '李小龙的日报'},
                                    {type: 'text', style: {flex: 1}},
                                    {type: 'button-text', value: '王二头的日报'},
                                    {type: 'image-form', value: require('../../assets/right.png')},
                                    {type: 'br-normal-row', style: {paddingTop: 10}}
                                ],
                                {type: 'br-form-col'}
                            ], [
                                {type: 'image-icon', value: require('../../assets/zan.png')},
                                {type: 'image-header', value: require('../../assets/image_header.png')},
                                {type: 'image-header', value: require('../../assets/image_header.png')},
                                {type: 'text-h4', value: 2, filter: value => `${value} 人点赞`},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'button-text', value: 3, prop:'yd', filter: value=> `已读 ${value}`, style: (value, data) => {
                                   return tagStyle(data, 'yd')
                                }},
                                {type: 'button-text', value: 3, prop:'wd', filter: value=> `未读 ${value}`, style: (value, data) => {
                                    return tagStyle(data, 'wd')
                                }},
                                {type: 'text', style: {flex: 1}},
                                {type: 'button-text', value: '查看全部'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-normal-row', style: {backgroundColor: 'white', marginTop: 5, paddingRight: 10}}
                            ], {
                                type: 'views', value: [{}, {}], style:{flexDirection: 'row', backgroundColor: 'white'}, columns: [
                                    {type: 'image-header', value: require('../../assets/image_header.png')},
                                    {type: 'text-h5', value: '张三', style: {paddingTop: 5}},
                                    {type: 'br', style: {align: 'center', paddingTB: 10}}
                                ]
                            }, [
                                {type: 'text-h3', value: 1, filter: value => `评论 （${value}）`, style: {flex: 1, borderBottomColor: '#f5f5f5', borderBottomWidth: 1, paddingBottom: 8}},
                                {type: 'br', style: {padding: 15, backgroundColor: 'white', marginTop: 5, paddingBottom: 5}}
                            ], {
                                type: 'views', value: [{}, {}], style: {backgroundColor: 'white', padding: 5, paddingBottom: 0}, columns: [
                                    [ 
                                       {type: 'image-header', value: require('../../assets/image_header.png')},
                                        [
                                            {type: 'text', value: '张三'},
                                            {type: 'text', value: '2019-08-18'}
                                        ],
                                        {type: 'br', style: {flexDirection: 'row', paddingTop: 5}}
                                    ],
                                    {type: 'text-p', value: '工作是生活的最低保障', style: {marginLeft: 56, borderBottomColor: '#f5f5f5', borderBottomWidth: 1}}
                                ]
                            }
                        ]}
                    />
                </ScrollView>
                <Freedomen.Region 
                    style={{height: 52}}
                    columns={[
                        {type: 'input-text-b', prop: 'i', placeholder: '发表评论', style: {flex: 1}},
                        {type: 'button-image-icon', value: require('../../assets/zan2.png')},
                        {type: 'br-normal-row', style: {flex: 1, backgroundColor: 'white', borderTopColor: '#f5f5f5', borderTopWidth: 1, paddingLeft: 10}}
                    ]}
                />
            </View>
        );
    }
  }