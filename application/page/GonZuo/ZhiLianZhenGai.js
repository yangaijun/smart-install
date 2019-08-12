import React from 'react'
import Freedomen from 'react-native-freedomen'
import {ScrollView, View, Dimensions} from 'react-native'
import columns from '../../region/columns'
var slidePop = null
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '质量整改工作',
            headerRight: <Freedomen.Region 
                event={params => { slidePop.show() }}
                columns={[
                    {type: 'button-image', value: require('../../assets/more.png'), style: {width: 28, height: 28, marginRight: 12}}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = { }
    }
    componentDidMount() { } 
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                    <Freedomen.Region 
                        style={{flex: 1, backgroundColor: '#f5f5f5'}}
                        data={{msg: [{isSelf: 1}, {isSelf: 1}, {isSelf: 0}, {isSelf: 1}, {isSelf: 0}, {isSelf: 0}, {isSelf: 1}, {isSelf: 0}]}}
                        columns={[
                            columns.GonZuoForm,
                            [
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'text', value: '任务动态', style: {paddingLR: 10}},
                                {type: 'text', value: '', style: {width: 120, height: 2, backgroundColor: '#ccc'}},
                                {type: 'br', style: {flexDirection: 'row', align: 'center', padding: 10}}
                            ], 
                            {type: 'views', prop: 'msg', value: [{}], columns: [
                                [
                                    [
                                        {type: 'image-header', value: require('../../assets/image_header.png')},
                                        {type: 'text-h4', value: '木工王大头'},
                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center',padding: 15}}
                                    ],
                                    {type: 'text', value: '珠海格力电器股份有限公司（以下简称：格力电器公 司）实名举报奥克斯空调股份有限公司（以下简称： 奥克斯空调公司）产销不合格空调', style: {marginLeft: 42, width: '65', backgroundColor: 'white', padding: 5, borderRadius: 5}},
                                    {type: 'br', load: (value, data) => !data.isSelf, style: {padding: 10}}
                                ], [
                                    [
                                        {type: 'image-header', value: require('../../assets/image_header.png')},
                                        {type: 'text-h4', value: '木工王大头'},
                                        {type: 'br', style: {flexDirection: 'row', alignItems: 'center', padding: 15}}
                                    ],
                                    {type: 'text', value: '珠海格力电器股份有限公司（以下简称：格力电器公 司）实名举报奥克斯空调股份有限公司（以下简称： 奥克斯空调公司）产销不合格空调', style: {marginRight: 42, width: '65', backgroundColor: 'white', padding: 5, borderRadius: 5}},
                                    {type: 'br', load: (value, data) => data.isSelf, style: {alignItems: 'flex-end', padding: 10}}
                                ]
                            ]} 
                        ]}
                    />
                </ScrollView>
                <Freedomen.Region 
                    style={{height: 52, backgroundColor: 'white'}}
                    columns={[
                        {type: 'button-image-icon', value: require('../../assets/yuyinr.png')},
                        {type: 'input-text', prop: 'message', placeholder: '发送工作消息', style: {padding: 5 ,flex: 1, borderColor: '#ccc', borderWidth: .4, borderRadius: 5, marginLR: 5}},
                        {type: 'button-image-icon', value: require('../../assets/wenjian.png')},
                        {type: 'button-image-icon', value: require('../../assets/tupian.png')},
                        {type: 'br', style: {flex: 1, alignItems: 'center', paddingTB: 5, paddingLR: 10, flexDirection: 'row'}}
                    ]}
                />
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 162, backgroundColor: '#f5f5f5'}} ref={ref => {slidePop = ref}}> 
                    <Freedomen.Region 
                        columns={[
                            {type: 'button-text', value: '优先级', style: {color: '#2EBBC4',fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100', marginBottom: 1}},
                            {type: 'button-text', value: '整改反馈', style: {color: '#2EBBC4', fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100', marginBottom: 5}},
                            {type: 'button-text', value: '取消', style: {fontSize: 18, align: 'center', backgroundColor: 'white', height: 52, width: '100'}}
                        ]}
                    />
                </Freedomen.SlidePop>
            </View>
        );
    }
  }