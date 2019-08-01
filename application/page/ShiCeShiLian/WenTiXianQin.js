import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
import ImagePicker from 'react-native-image-picker' 
var _params = null
const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}; 

export default  class  extends React.Component {
static navigationOptions = ({navigation}) => {
    return {
        title: '爆点详情',
        headerRight: <Freedomen.Region 
            style={{flex: 1, align: 'center', paddingRight: 10}}
            event={params => {
                if (_params == null || !_params.zgr || !_params.createDate) {
                    alert('请正确输入') 
                    return
                }
                let formData = new FormData()
                formData.append('id', _params.id)

                if (_params.detail)
                    formData.append('detail', _params.detail)
                if (_params.images.length)
                    formData.append('pics', _params.images)

                formData.append('fDate', _params.createDate)
                formData.append('rectifyUser', _params.zgr.map(el => {
                    return el.id
                }).join(','))
                
                Freedomen.global.api.postForm('api/measuredProblem/updateMeasuredProblem', formData).then(res => {
                    console.info(res)
                    Freedomen.global.fn()
                    navigation.goBack()
                }) 
            }}
            columns={[
                {type: 'button-text', value: '保存'}
            ]}
        />
      }
    }
    constructor(props) {
        super(props)
        let data = props.navigation.state.params
        if (data.rectifyUser) {
            let rectifyUserNames = data.rectifyUserNames
            let zgr = data.rectifyUser.split(',').map((el, index) => {
                return {
                    id: el,
                    realName: rectifyUserNames[index]
                }
            })
            data.zgr = zgr
        }
        console.log(data)
        data.images = []
        this.state = {
            data: data
        }
    }
    _show() {
        ImagePicker.showImagePicker(photoOptions, (response) => {
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else { 
                let data = this.state.data
                let image = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }
                data.images.push(image)
                this.setState({
                    data: data
                })
            }
          });
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'wt_data'}
                        event={params => {
                            if (params.prop == 'xzzgr') {
                                this.props.navigation.push("ZhenGaiRen", params.row.zgr)
                            } else if (params.prop == 'tupian') {
                                this._show()
                            }

                            _params = params.row
                        }}
                        data={this.state.data}
                        columns={[
                            {type: 'text-h3', value: '待指派', style: {backgroundColor: 'white', padding: 10, marginBottom: 2, color: '#fc2f68'}},
                            [
                                {type: 'text-must', value:'*'},
                                {type: 'text-h4',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label',  filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.realName
                                        }).join(',')
                                    else return value
                                }, prop: 'zgr', value: '请选择'},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'click-form-row', prop: 'xzzgr'}
                            ], [
                                {type: 'text-must', value:'*'},
                                {type: 'text-h4', value: '整改日期',},
                                {type: 'pick-date', placeholder: '请选择日期', prop: 'createDate', style: {flex: 1, alignItems: 'flex-end', paddingRight: 5}},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-h4', prop:'content', value: 'Hunter管理员'},
                                {type: 'text-label', prop:'contentDetail', value: '同一室罗曼史，震荡东'},
                                [
                                    {type: 'text-h4', value: '任务描述'},
                                    {type: 'text-must', value:'*'},
                                    {type: 'br', style: {flexDirection: 'row', paddingTop: 10}}
                                ],
                                {type: 'input-area', prop: 'detail', others: {numberOfLines: 4}, placeholder: '添加描述', maxLength: 500, style: {backgroundColor: '#F5F5F5', padding: 10}},
                                {type: 'br-col', style: {marginBottom: 1}}
                            ] , 
                            [ 
                                {type: 'text-h4', value: '图片', style: {paddingBottom: 5}},
                                [
                                    (data) => {
                                        let arr = []
                                        for (let i = 0; i < data.images.length; i ++) {
                                            arr.push({type: 'image', value: data.images[i].uri, style: {width: 68, height: 80, resizeMode: 'stretch', marginRight: 5}})
                                        }
                                        arr.push({'type': 'br', style: {flexDirection: 'row'}})
                                        return arr
                                    },
                                    {type: 'button-image',  prop: 'tupian',  value: require('../../assets/uptupian.png'), style: {width: 68, height: 80, resizeMode: 'stretch'}}, 
                                    {type: 'br', style: {flexDirection: 'row'}}
                                ], 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ],
                            // [ 
                            //     {type: 'text-h4', value: '语音', style: {paddingBottom: 5}},
                            //     [
                            //         {type: 'button-image', prop: 'yuyin', value: require('../../assets/luyin.png'), style: {width: 68, height: 80, resizeMode: 'stretch'}}, 
                            //         {type: 'br', style: {flexDirection: 'row'}}
                            //     ], 
                            //     {type: 'br-col', style: {marginBottom: 1}}
                            // ],
                            [
                                {type: 'text-h4', value: '检查项'},
                                {type: 'text-label', prop: 'checkLists', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h4', value: '检查部位'},
                                {type: 'text-label', prop: 'checkSite', value: '同一室罗曼史，震荡东'}, 
                                {type: 'br-col', style: {marginBottom: 1}}
                            ], 
                            // [
                            //     {type: 'image-icon', value: require('../../assets/dw.png')},
                            //     {type: 'text-h4', value: '图纸位置', style: {flex: 1}},
                            //     {type: 'text-label', value: '已标记'},
                            //     {type: 'image-icon', value: require('../../assets/right.png')},
                            //     {type: 'click-row', style: {marginBottom: 1}}
                            // ],
                        ]}
                    /> 
                
             </ScrollView> 
        );
    }
  }