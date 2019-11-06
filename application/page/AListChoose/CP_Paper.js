import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '选择图纸'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [] 
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/ProjectPaper/selectList').then(res => {
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
                                this.props.navigation.push('P_ChoosePoint', {
                                    ...this.props.navigation.state.params,
                                    ...params.row
                                })
                            }
                        }}
                        columns={[
                            {type: 'text-h5', prop: 'paperName', style: {flex: 1}},
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