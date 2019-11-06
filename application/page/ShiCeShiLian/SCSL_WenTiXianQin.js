import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns';
import P_PickImage from '../APublic/P_PickImage'
import P_SoundRecord from '../APublic/P_SoundRecord';
import P_Sound from '../APublic/P_Sound';


export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '指派',
            headerRight: <Freedomen.Region  
                event={params => {
                    Freedomen.redux({
                        scsl_zhipai: data => {
                            Freedomen.global.api.call('/MeasureProblem/add', [{
                                ...data,
                                rectifyUserIds: data.rectifyUser.map(el => {
                                    return el.jasoUserId
                                }),
                                rectifyUser: undefined,
                                voiceFiles: data.luyins.map(el => el.luyin).join(','),
                                imageFiles: data.pictures.map(el => el.picture).join(',')
                            }]).then(res => {
                                Freedomen.global.toast('指派成功')
                                Freedomen.global.fn()
                                navigation.goBack()
                            })
                        }
                    })
                }
            }
            columns={[
                {type: 'button-right', value: '保存'}
            ]}
        />
      }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: {...props.navigation.state.params, pictures: [], luyins: [], rectifyUser: []}
        } 
        console.log(props.navigation.state.params)
    }
    componentWillMount() {
        Freedomen.global.api.call('/MeasureProblem/selectById', this.props.navigation.state.params).then(res => {
            this.setState({
                data: {
                    ...this.state.data,
                    ...res.measureProblem
                }
            })
           this.point = res
        })
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'scsl_zhipai'}
                        event={params => {
                            if (params.prop == 'xzzgr') {
                                Freedomen.global.project = {projectId: this.state.data.projectId}
                                this.props.navigation.push("CP_Users", {formName: 'scsl_zhipai', varName: 'rectifyUser', label: '选择整改人', ...this.state.data})
                            } else if (params.prop == 'weizhi' && this.point) {
                                this.props.navigation.push('P_ShowPoint', this.point)
                            } else if (params.prop == 'choose') {
                                return new Promise((resolve, reject) => {
                                    P_PickImage().then(res => {
                                        params.row.pictures && params.row.pictures.push(...res.map(el => {
                                            return {picture: el}
                                        })) 
                                        resolve(params.row)
                                    }) 
                                })
                            } else if (params.prop == 'luyin') {
                                this.soundRecord._show()
                            } else if (params.value && params.value.prop == 'picture') {
                                this.props.navigation.push('P_ZoomImage', {pictures: params.row, index: params.$index})
                            } else if (params.value && params.value.prop == 'luyins') {
                                P_Sound.play(params.value.row.luyin)
                            }
                        }}
                        data={this.state.data}
                        columns={[ 
                            [
                                {type: 'text-h5',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label', filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.userRealName
                                        }).join(',')
                                    else return value
                                }, prop: 'rectifyUser', value: '请选择', placeholder: '请选择'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'xzzgr', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h5', value: '整改日期'},
                                {type: 'text-must', value:'*', style: {flex: 1}},
                                {type: 'pick-date', placeholder: '请选择日期', prop: 'finishedDate'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'br-form-row'}
                            ], [
                                [
                                    {type: 'text-h5', prop: 'userRealName', style: {marginRight: 10}},
                                    {type: 'text-h5', prop: 'createTime', filter: 'yyyy-MM-dd hh:mm'},
                                    {type: 'br-normal-row'}
                                ], [
                                    {type: 'text', prop: 'checkName', filter: value => value + ": "},
                                    {type: 'text', prop: 'inputDatas'},
                                    {type: 'br-normal-row', style: {paddingTop: 5}}
                                ],
                                [
                                    {type: 'text-h5', value: '任务描述'},
                                    {type: 'text-must', value:'*'},
                                    {type: 'br-normal-row', style: {paddingTop: 10}}
                                ],
                                {type: 'input-area', prop: 'detail', others: {numberOfLines: 4}, placeholder: '添加描述', maxLength: 500, style: {backgroundColor: '#F5F5F5', padding: 10}},
                                {type: 'br-form-col', style: {marginBottom: 1}}
                            ] , 
                            ...columns.PicAndImg,
                            [
                                {type: 'text-h5', value: '检查项'},
                                {type: 'text-label', prop: 'checkName', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h5', value: '检查部位'},
                                {type: 'text-label', prop: 'checkSite', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], [
                                {type: 'image-form', value: require('../../assets/dw.png')},
                                {type: 'text-h5', value: '图纸位置', style: {flex: 1, marginLeft: 5}},
                                {type: 'text-label', value: '已标记'},
                                {type: 'image-form', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'weizhi', style: {marginBottom: 1}}
                            ]
                        ]}
                    /> 
                <P_SoundRecord over={params => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            luyins: this.state.data.luyins.concat({luyin: params})
                        }
                    })
                }} ref={ref=> this.soundRecord = ref}/>
             </ScrollView> 
        );
    }
  }