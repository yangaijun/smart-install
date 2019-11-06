import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Modal, ScrollView} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.type == 1 ? '奖励详情' : '处罚详情'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            data: props.navigation.state.params,
            visible: false,
            images: []
        }  
        this.type = props.navigation.state.params.type
    }
    componentDidMount() {
        if (Freedomen.global.ZHILIAN)
            Freedomen.global.api.call('/QualityFine/selectById', this.props.navigation.state.params).then(res => {
                console.log(res)
                this.setState({
                    data: {
                        ...res,
                        ...res.qualityFine
                    }
                })
            })
        else 
            Freedomen.global.api.call('/SecurityFine/selectById', this.props.navigation.state.params).then(res => {
                console.log(res)
                this.setState({
                    data: {
                        ...res,
                        ...res.securityFine
                    }
                })
            })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 5}}
                    data={this.state.data}
                    event={params => { 
                        if (params.prop == 'picture') { 
                            let images = [{url:  params.value}]
                            this.setState({
                                visible: true,
                                images: images
                            }) 
                        }
                    }}
                    columns={[
                        [
                            {type: 'text-label', value: '项目名称:', style: {width: 80}},
                            {type: 'text-h5', prop: 'projectName'},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', value: this.type == 1 ? '奖励事由:' : '处罚事由:', style: {width: 80}},
                            {type: 'text-h5', prop: 'cause'},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label',  value: this.type == 1 ? '奖励方:' : '责任方:', style: {width: 80}},
                            {type: 'text-h5', filter: (value, data) => (data.aboutDepartmentNameList && data.aboutDepartmentNameList.join()) || (data.aboutUserRealNameList &&  data.aboutUserRealNameList.join())},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', value: '日期:', style: {width: 80}},
                            {type: 'text-h5', prop: 'createTime', filter: 'yyyy-MM-dd'},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', value: this.type == 1 ? '奖励金额:' : '处罚金额:', style: {width: 80}},
                            {type: 'text-h5', prop: 'money', filter: value => `￥${value}`, style: {color: 'red'}},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', value: '描述:', style: {width: 80}},
                            {type: 'text-h5', prop: 'remark'},
                            {type: 'br-normal-row'}
                        ], [
                            {type: 'text-label', value: '图片'},
                            (data) => { 
                                let imageFiles = (data.imageFiles || '').split(',')
                                let arr = []
                                if (data.imageFiles)
                                    for (let i = 0; i < imageFiles.length; i ++) {
                                        arr.push({type: 'button-image-picture', prop: 'picture', value: `http://www.jasobim.com:8085/${imageFiles[i]}`})
                                    }
                                arr.push({type: 'br-normal-row', load: () =>  imageFiles.length})
                                return arr
                            },
                            {type: 'br-normal-col'}
                        ] 
                    ]}
                /> 
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer imageUrls={this.state.images} enableSwipeDown={true} onSwipeDown={() => {
                        this.setState({
                            visible: false
                        })
                    }}/>
                </Modal>
            </ScrollView>
        );
    }
  }