import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, ScrollView} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '选择分类',
    }}
    constructor(props) {
        super(props) 
        this.state = {
            list: [],
            choose: this.props.navigation.state && (this.props.navigation.state.params || {})
        }
    }
    componentDidMount() {
        Freedomen.global.api.call('/MaterialType/select').then(res => {
            this.setState({
                list: res
            })
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                {
                    this.state.list.map((el, index) => {
                        return <Freedomen.Region 
                            data={el}
                            key={index}
                            event={params => {
                                Freedomen.redux({
                                    wz_xinjian: (oldData) => {
                                        return {
                                            ...oldData, 
                                            ...params.row
                                        }
                                    }
                                })
                                this.props.navigation.goBack()
                            }}
                            columns={[
                                {type: 'text-h4', prop: 'materialTypeName', style: value => {
                                    return (value == this.state.choose.materialTypeName) && {
                                        color: '#2EBBC4'
                                    }
                                }},
                                {type: 'click-form-row'}
                            ]}
                        />
                    })
                }
            </ScrollView>
        );
    }
  }