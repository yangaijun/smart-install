import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import {View, Dimensions, ScrollView} from 'react-native';
import P_PickImage from '../APublic/P_PickImage'
import P_SoundRecord from '../APublic/P_SoundRecord';
var type 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.type == 1 ? '新建奖励' : '新建处罚',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Freedomen.redux({
                        za_jianchenxinzen: (data) => {
                            Freedomen.global.api.call(Freedomen.global.ZHILIAN ? '/QualityFine/add' : '/SecurityFine/add', {
                                ...data,
                                aboutIds: [...data.danwei.map(el => {
                                    el.aboutId = el.departmentId, 
                                    el.state = 1
                                    return el
                                }), ...data.geren.map(el => {
                                    el.aboutId = el.jasoUserId
                                    el.state = 2
                                    return el
                                })],
                                type: type,
                                imageFiles: data.pictures.map(el => el.picture).join(','),
                                voiceFiles: data.luyins.map(el => el.luyin).join(',')
                            }).then(res => {
                                Freedomen.global.fn()
                                navigation.goBack()
                            })
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
    }}
    constructor(props) {
        super(props)
        this.state = { 
            data: {danwei: [], geren: [], pictures: [], luyins: []}
        }
        type = this.type = props.navigation.state.params.type 
    }
    render() {
        return (
            <ScrollView>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        this.data = params.row 
                        if (params.prop == 'shiyou')
                            this.props.navigation.push('ZL_ShiYou', {...params.row, formName: 'za_jianchenxinzen', label: '事由'})
                        else if (params.prop == 'fan')
                            this.slidePop.show()
                        else if (params.prop == 'choose') {
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
                        } 
                    }}
                    redux={'za_jianchenxinzen'}
                    data={this.state.data}
                    columns={[
                        [
                            {type: 'text-form-label', filter: value => this.type == 1 ? '奖励事由' : '处罚事由'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text-h5', placeholder: '请选择', prop: 'qualityCheckName', load: (value) => Freedomen.global.ZHILIAN},
                            {type: 'text-h5', placeholder: '请选择', prop: 'securityCheckName', load: (value) => !Freedomen.global.ZHILIAN},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'shiyou'}
                        ], [
                            {type: 'text-form-label', value: '日期'},
                            {type: 'text-must', value: '*'},
                            {type: 'pick-date', prop: 'createTime', placeholder: '请选择日期', style: {flex: 1, alignItems: 'flex-end'}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label',  filter: value => this.type == 1 ? '受奖方' : '责任方'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text-h5', placeholder: '请选择', filter: (value, data) => {
                                return data.danwei.map(el => {
                                    el.state = 1
                                    el.type = 1
                                    return el.departmentName
                                }).join(',') + data.geren.map(el => {
                                    el.state = 2
                                    el.type = 1
                                    return el.userRealName
                                }).join(',')
                            }},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'fan'}
                        ], [
                            {type: 'text-form-label', filter: value => this.type == 1 ? '奖励金额' : '处罚金额'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'input-text', prop:'money', placeholder: '请输入金额', style: {alignItems: 'flex-end'}},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '备注'}, 
                            {type: 'input-area-form', prop:　'remark', maxLength: 200},
                            {type: 'br-form-col'}
                        ],
                        columns.Pic
                    ]}
                />
                <Freedomen.SlidePop style={{top: Dimensions.get('window').height - 163, backgroundColor: '#f5f5f5'}} ref={ref => {this.slidePop = ref}}> 
                    <Freedomen.Region 
                        event={params => {
                            this.slidePop.hide()
                            if (params.value == '单位') 
                                this.props.navigation.push('CP_ZuZhi', {...this.data, formName: 'za_jianchenxinzen', varName: 'danwei', label: '选择单位'})
                            else if (params.value == '个人')
                                this.props.navigation.push('CP_Users', {...this.data, formName: 'za_jianchenxinzen', varName: 'geren', label: '选择个人'})
                        }}
                        columns={[
                            {type: 'button-pop-item', value: '单位', style: {color: '#2EBBC4', marginBottom: 1}},
                            {type: 'button-pop-item', value: '个人', style: {color: '#2EBBC4', marginBottom: 5}},
                            {type: 'button-pop-item', value: '取消', style: {color: '#898989'}}
                        ]}
                    />
                </Freedomen.SlidePop>
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