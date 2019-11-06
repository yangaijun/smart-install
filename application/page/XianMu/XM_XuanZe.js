import React from 'react'
import { ScrollView, Alert } from 'react-native'
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = {
        title: '项目选择',
    }
    constructor(props) {
        super(props)
        this.state = {
            list: []
        } 
    }
    componentDidMount() {
        Freedomen.global.api.call('/Project/selectList').then(res => {
            this.setState({
                list: res
            })
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
            {
                this.state.list.map((el, key) => {
                    return <Freedomen.Region 
                        key={key}
                        data={el}
                        event={params => {
                            if (params.prop == 'row') {
                                //当前项目 
                                Freedomen.global.project = params.row

                                const navigation = this.props.navigation
                                if (navigation.state.params.router == 'XM_MoXinLiuLan') {
                                    Freedomen.global.api.call('/Bimface/getModelViewToken', Freedomen.global.project).then(res => {
                                        if (res) {
                                            navigation.push(navigation.state.params.router, {viewToken: res})
                                        } else {
                                            Alert.alert('提示','此项目未发现模型', [{text: '确定'}])
                                        }
                                    }).catch(e => {
                                        Alert.alert('提示','此项目未发现模型', [{text: '确定'}])
                                    })
                                } else {
                                    navigation.push(navigation.state.params.router, navigation.state.params)
                                }
                            }
                        }}
                        columns={[
                            {type: 'text-h5', prop: 'projectName',   style: {flex: 1}},
                            {type: 'image-form', value: require('../../assets/right.png')},
                            {type: 'click-form-row', prop: 'row'}
                        ]}
                    />
                })
            }
            </ScrollView>
        );
    }
  }