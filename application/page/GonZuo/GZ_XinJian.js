import React from 'react'
import Freedomen from 'react-native-freedomen'  
import columns from '../../region/columns'
import {ScrollView, Alert} from 'react-native'
import P_SoundRecord from '../APublic/P_SoundRecord';
import P_PickImage from '../APublic/P_PickImage'
import valid from '../../region/validations';
import P_Sound from '../APublic/P_Sound';

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建任务',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        gz_xinjian: (data) => {
                            if (valid(data, 'GZ_XinJian')) {
                                let params = {...data, voiceFiles: data.luyins.map(el => el.luyin).join(','), imageFiles: data.pictures.map(el =>  el.picture).join(',')}
                                console.log(params)
                                Freedomen.global.api.call('/WorkTask/add', params).then(res => {
                                    Freedomen.global.toast('创建成功')
                                    navigation.goBack()
                                })
                            }
                            return data
                        }
                    })
                 }}
                columns={[
                    {type: 'button-right', value: '保存'}
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            data: {workTaskUserList: [], pictures: [], luyins: []}
        }
    }
    componentDidMount() { }
    render() {
        return (
            <ScrollView>
                <Freedomen.Region 
                    style={{flex: 1, backgroundColor: '#f5f5f5'}}
                    redux={'gz_xinjian'}
                    event={params => {
                        if (params.prop == 'xianmu') {
                            this.props.navigation.push('CP_XianMu', {label: '项目选择',  formName: 'gz_xinjian', ...params.row})
                        } else if (params.prop == 'zhixinren') {
                            if (!params.row.projectId) {
                                Alert.alert('提示', '请先选择项目!', [{text: '确定'}])
                                return
                            }
                            this.props.navigation.push('CP_Users', {varName: 'workTaskUserList', formName: 'gz_xinjian', label: '选择执行人', ...params.row})
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
                            {type: 'text-form-label', value: '项目'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text-h5', prop: 'projectName', placeholder: '请选择项目'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'xianmu'}
                        ], 
                        {type: 'text-valid-message', prop: 'projectName-valid', load: value => value},
                        [
                            {type: 'text-form-label', value: '任务标题'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'input-text-form', prop: 'taskTopic', placeholder: '请输入任务标题'}, 
                            {type: 'br-form-row', }
                        ], 
                        {type: 'text-valid-message', prop: 'taskTopic-valid', load: value => value},
                        [
                            {type: 'text-form-label', value: '任务描述'},
                            {type: 'input-area-form', prop: 'taskDetail', placeholder: '请输入任务描述', maxLength: 500},
                            {type: 'br-form-col'}
                        ],
                        ...columns.PicAndImg,
                        [
                            {type: 'text-form-label', value: '日期'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'pick-date', prop: 'taskTime', placeholder: '请选择日期'},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'br-form-row'}
                        ], 
                        {type: 'text-valid-message', prop: 'taskTime-valid', load: value => value},
                        [
                            {type: 'text-form-label', value: '执行人'},
                            {type: 'text-must', value: '*', style: {flex: 1}},
                            {type: 'text-h5', placeholder: '请选择执行人', prop: 'workTaskUserList', filter: value =>  value.map(el => el.userRealName).join(',')},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'zhixinren'}
                        ],
                        {type: 'text-valid-message', prop: 'workTaskUserList-valid', load: value => value}, 
                        [
                            {type: 'text-form-label', value: '重要程度', style: {flex: 1}},
                            {type: 'select', prop: 'state', options: {1: '一般', 2: '重要', 3: '紧急'}, style: {width: 120, height: 42}},
                            {type: 'br-form-row'}
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