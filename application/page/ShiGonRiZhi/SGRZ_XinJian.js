import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
import columns from '../../region/columns' 
import valid from '../../region/validations'
import utils from '../../region/utils' 
import P_PickImage from '../APublic/P_PickImage' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建施工日志',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        sgrz_xinjian: (data) => { 
                            if (valid(data, 'SGRZ_XinJian')) {
                                utils.varChange({
                                    existingProblemName: 'existingProblems',
                                    subjectMaterialName: 'subjectMaterialApplication',
                                    machineryName: 'machineryApplication'
                                }, data)
                                Freedomen.global.api.call('/ConstructLog/add', {
                                    constructLog: {
                                        ...data, 
                                        shenchanqinkuans: undefined,    
                                        gonzuoneirons: undefined,
                                        shigonjindus: undefined,
                                        pics: data.pictures.map(el =>  el.picture).join(','),

                                    },
                                    //解决变量定义不规范
                                    contentList: [
                                        ...utils.varChange({
                                            constructProgressConstructPart: 'productionConstructPart',
                                            constructContentName: 'productionConstructContent',
                                            productionWorkLoad: (value, data) => {
                                                return value + data.constructContentUnit
                                            },
                                            'productionStartTime': (value) => {  
                                                let date = utils.formatDate.format(new Date(), "yyyy-MM-dd") 
                                                return  utils.formatDate.parse(date + " " + value, "yyyy-MM-dd hh:mm")
                                            },
                                            'productionEndTime': (value) => { 
                                                let date = utils.formatDate.format(new Date(), "yyyy-MM-dd") 
                                                return  utils.formatDate.parse(date + " " + value, "yyyy-MM-dd hh:mm")
                                            }
                                        }, data.shenchanqinkuans),
                                        ...utils.varChange({
                                            constructContentTypeName: 'jobContentContentType' 
                                        }, data.gonzuoneirons),
                                        ...utils.varChange({
                                            constructContentName: 'constructProgressConstructContent',
                                            teamsName: 'constructProgressTeams',
                                            constructProgressStartTime: (value) => {
                                                let date = utils.formatDate.format(new Date(), "yyyy-MM-dd") 
                                                return  utils.formatDate.parse(date + " " + value, "yyyy-MM-dd hh:mm")
                                            },
                                            constructProgressEndTime: (value) => {
                                                let date = utils.formatDate.format(new Date(), "yyyy-MM-dd") 
                                                return  utils.formatDate.parse(date + " " + value, "yyyy-MM-dd hh:mm")
                                            } 
                                        }, data.shigonjindus)
                                    ]
                                }).then(res => {
                                    Freedomen.global.toast('创建成功')
                                    Freedomen.global.fn && Freedomen.global.fn()
                                    navigation.goBack()
                                })
                                return
                            }
                            return data
                        }
                    })
                }}
                columns={[
                    {type: 'button-right', value: '发布'},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = { 
            data: {shenchanqinkuans: [], gonzuoneirons: [], shigonjindus: [], selfCheckReport: 1, pictures: [], constructDate:  new Date()}
        }
    } 
    componentDidMount() { } 
    render() {
        return (
            <View>
                <ScrollView>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        event={params => { 
                            if (params.prop == 'SGRZ_GonZuoNeiRonTianJia')
                                this.props.navigation.push('SGRZ_GonZuoNeiRonTianJia', {list: params.row.gonzuoneirons})
                            else if (params.prop == 'tianjiashigonjindu')
                                this.props.navigation.push('SGRZ_ShiGonJinDuTianJia', {list: params.row.shigonjindus})
                            else if (params.prop == 'tianjiashenchanqinkuan')
                                this.props.navigation.push('SGRZ_ShenChanQinKuaiTianJia', {list: params.row.shenchanqinkuans})
                            else if (params.prop == 'cunzaiwenti')
                                this.props.navigation.push('CP_WenTi', {...params.row, label: '存在问题', formName: 'sgrz_xinjian'})
                            else if (params.prop == 'zhucaishenqin')
                                this.props.navigation.push('CP_ZhuCai', {...params.row, label: '主材申请', formName: 'sgrz_xinjian'})
                            else if (params.prop == 'jixieshenqin')
                                this.props.navigation.push('CP_JiXie', {...params.row, label: '机械申请', formName: 'sgrz_xinjian'})
                            else if (params.prop == 'biaoduan')
                                this.props.navigation.push('CP_BiaoDuan', {...params.row, label: '标段', formName: 'sgrz_xinjian'})
                            else if (params.prop == 'choose') {
                                return new Promise((resolve, reject) => {
                                    P_PickImage().then(res => {
                                        params.row.pictures && params.row.pictures.push(...res.map(el => {
                                            return {picture: el}
                                        })) 
                                        resolve(params.row)
                                    }) 
                                })
                            }  else if (params.value && params.value.prop == 'picture') {
                                this.props.navigation.push('P_ZoomImage', {pictures: params.row, index: params.$index})
                            }
                        }}
                        redux={'sgrz_xinjian'}
                        data={this.state.data}
                        columns={[
                            {type: 'image', value: require('../../assets/tip.png'), style: {width: '100', height: 40, resizeMode: 'stretch'}},
                            [
                                {type: 'text-form-label', value: '日期', style: {flex: 1}},
                                {type: 'pick-date', prop: 'constructDate', placeholder: '请选择日期'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-form-row', style: {marginBottom: 0}}
                            ], 
                            {type: 'text-valid-message', prop: 'constructDate-valid', load: value => value},
                            [
                                columns.SGRZ_Table,
                                {type: 'br-normal-row', style: {backgroundColor: 'white'}}
                            ], [
                                {type: 'text-form-label', value: '标段'},
                                {type: 'text-must', value: '*', style: {flex: 1}},
                                {type: 'text-h5', prop: 'tendersName', placeholder: '请选择标段'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'biaoduan'}
                            ], 
                            {type: 'text-valid-message', prop: 'tendersName-valid', load: value => value},
                            [
                                [
                                    {type: 'text-label', value: '生产情况'},
                                    {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                                ], 
                                {type: 'views', prop: 'shenchanqinkuans', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                                    {type: 'text-list', prop: '$index', filter: value => value + 1 },
                                    [
                                        {type: 'text-h5', filter: (value, data) => `时间：${data.productionStartTime} -  ${data.productionEndTime}`},
                                        {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                                        {type: 'text-h5', prop: 'constructContentName', filter: value => `施工内容：${value}`},
                                        {type: 'text-h5', prop: 'productionWorkLoad', filter: (value, data) => `完成工作量：${value + data.constructContentUnit}`},
                                        {type: 'br', style: {flex: 1}}
                                    ],
                                    {type: 'br-normal-row', style: {paddingTB: 10}}
                                ]}, [
                                    {type: 'image-form', value: require('../../assets/tianjia.png')},
                                    {type: 'text-primary', value: '添加生产情况', style: {marginLeft: 5}},
                                    {type: 'click-form-row', prop: 'tianjiashenchanqinkuan', style: {align: 'center', marginBottom: 5}}
                                ], 
                                {type: 'br', load: value => Freedomen.global.roleTypes.includes(1) || Freedomen.global.roleTypes.includes(3)}
                            ],
                            [
                                [
                                    {type: 'text-label', value: '工作内容'},
                                    {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                                ], 
                                {type: 'views', prop: 'gonzuoneirons', style:{marginBottom: 2}, columns: [
                                    {type: 'text', prop: '$index', filter: value => value + 1 + '、  ' },
                                    [
                                        {type: 'text-h5', prop: 'constructContentTypeName', filter: value => `内容分类：${value}`},
                                        {type: 'text-h5', prop: 'jobConentContentDescribe', filter: value => `描述：${value || ''}`},
                                        {type: 'text', prop: 'jobContentRemark', filter: value => `备注：${value || ''}`},
                                        {type: 'br', style: {flex: 1}}
                                    ], 
                                    {type: 'br-form-row'}
                                ]},
                                [
                                    {type: 'image-form', value: require('../../assets/tianjia.png')},
                                    {type: 'text-primary', value: '添加工作内容', style: {marginLeft: 5}},
                                    {type: 'click-form-row', prop: 'SGRZ_GonZuoNeiRonTianJia', style: {align: 'center', marginBottom: 5}}
                                ], 
                                {type: 'br', load: value => Freedomen.global.roleTypes.includes(2)}
                            ], 
                            [ 
                               [
                                    {type: 'text-label', value: '施工进度'},
                                    {type: 'br-form-row', style: {backgroundColor: '#f5f5f5'}}
                                ], 
                                {type: 'views', prop: 'shigonjindus', style:{backgroundColor: 'white', marginBottom: 2}, columns: [
                                    {type: 'text-list', prop: '$index', filter: value => value + 1},
                                    [
                                        {type: 'text-h5', filter: (value, data) => `时间：${data.constructProgressStartTime} -  ${data.constructProgressEndTime}`},
                                        {type: 'text-h5', prop: 'constructProgressConstructPart', filter: value => `施工部位：${value}`},
                                        {type: 'text-h5', prop: 'constructContentName', filter: value => `施工内容：${value}`},
                                        {type: 'text-h5', prop: 'teamsName', filter: value => `班组：${value}`},
                                        {type: 'text-h5', prop: 'constructProgressNums', filter: value => `施工进度：${value + '%'}`},
                                        {type: 'br', style: {flex: 1}}
                                    ], 
                                    {type: 'br-normal-row', style: {paddingTB: 10}}
                                ]},[
                                    {type: 'image-form', value: require('../../assets/tianjia.png')},
                                    {type: 'text-primary', value: '添加施工进度', style: {marginLeft: 5}},
                                    {type: 'click-form-row', prop: 'tianjiashigonjindu', style: {align: 'center', marginBottom: 5}}
                                ],
                                {type: 'br', load: value => Freedomen.global.roleTypes.includes(2)}
                            ], [
                                [
                                    {type: 'text-form-label', value: '存在问题', style: {flex: 1}},
                                    {type: 'text-h5',  prop: 'existingProblemName', placeholder: '请选择'},
                                    {type: 'image-form', value: require('../../assets/right.png')},
                                    {type: 'click-form-row', prop: 'cunzaiwenti'}
                                ], [
                                    {type: 'text-form-label', value: '次日主材申请', style: {flex: 1}},
                                    {type: 'text-h5', prop: 'subjectMaterialName', placeholder: '请选择'},
                                    {type: 'image-form', value: require('../../assets/right.png')},
                                    {type: 'click-form-row', prop: 'zhucaishenqin'}
                                ], [
                                    {type: 'text-form-label', value: '次日机械申请', style: {flex: 1}},
                                    {type: 'text-h5',  prop: 'machineryName', placeholder: '请选择'},
                                    {type: 'image-form', value: require('../../assets/right.png')},
                                    {type: 'click-form-row', prop: 'jixieshenqin'}
                                ], [
                                    {type: 'text-form-label', value: '自检报告'},
                                    {type: 'text-must', value: '*', style: {flex: 1}},
                                    {type: 'select',  prop: 'selfCheckReport', options: {1: '合格', 2: '不合格', 3: '施工中'}, style: {width: 120}},
                                    {type: 'br-form-row', style: {marginBottom: 5}}
                                ], 
                                {type: 'br', load: value => Freedomen.global.roleTypes.includes(3)}
                            ],
                            columns.Pic
                        ]}
                    />
                </ScrollView> 
                 
           </View>
        );
    }
  }