import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'  
import P_PickImage from '../APublic/P_PickImage'
import P_SoundRecord from '../APublic/P_SoundRecord';
import P_Sound from '../APublic/P_Sound';

const Search = columns.ZA_Search('请输入检查项名称')
var data = null 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '检查结果',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        zl_xinzen: oldData => {
                            console.log(oldData)
                            oldData.checkTypeList[data.$index] = data
                            return oldData
                        }
                    }) 
                    navigation.goBack()
                }}
                columns={[
                    {type: 'button-text', value: '保存', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = { 
            data: {
                pictures: [], luyins: [],
                ...props.navigation.state.params
            }
        }
        data = this.state.data
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    data={this.state.data}
                    event={params => {
                        if (params.prop == 'choose') {
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
                    columns={[
                        [
                            {type: 'text-form-label', value: '检查项名称', style: {flex: 1}},
                            {type: 'text', prop: 'name'},
                            {type: 'br-form-row'}
                        ],
                        [
                            {type: 'text-form-label', value: '是否合格', style: {flex: 1}},
                            {type: 'switch', prop: 'state'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '任务描述'},
                            {type: 'input-area-form', prop: 'describe', maxLength: 500},
                            {type: 'br-form-col'}
                        ], 
                        ...columns.PicAndImg
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
            </View>
            
        );
    }
  }