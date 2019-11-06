import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'  
import P_PickImage from '../APublic/P_PickImage'
import P_SoundRecord from '../APublic/P_SoundRecord';
const Search = columns.ZA_Search('请输入检查项名称')
var data = null 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '检查结果',
            headerRight: <Freedomen.Region 
                event={params => { 
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
            data: props.navigation.state.params
        }
        data = props.navigation.state.params
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Freedomen.Region 
                    style={{backgroundColor: '#f5f5f5'}}
                    data={this.state.data}
                    event={params => {
                        if (params.prop == 'choose')
                            P_PickImage()
                        else if (params.prop == 'luyin')
                            this.soundRecord._show()
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
                        ], [
                            {type: 'text-form-label', value: '图片'},
                            {type: 'button-image-picture', prop: 'choose', value: require('../../assets/uptupian.png')},
                            {type: 'br-form-col'}
                        ], [
                            {type: 'text-form-label', value: '录音'},
                            {type: 'button-image-picture', prop: 'luyin', value: require('../../assets/luyin.png')},
                            {type: 'br-form-col'}
                        ]
                    ]}
                />
                <P_SoundRecord ref={ref=> this.soundRecord = ref}/>
            </View>
        );
    }
  }