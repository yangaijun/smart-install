import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            choose: props.navigation.state.params
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/ExistingProblem/select', {pageVo: {pageNo: 1, pageSize: 10000}}).then(res => {
            this.setState({
                list: res.data
            })
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                {
                    this.state.list.map((el, index) => {
                        return <Freedomen.Region 
                            key={index}
                            data={el}
                            event={params => {
                                let obj = {}
                                obj[this.props.navigation.state.params.formName] = (data) => {
                                    return {
                                        ...data,
                                        ...params.row
                                    }
                                }
                                Freedomen.redux(obj)
                                this.props.navigation.goBack()
                            }}
                            columns={[
                                {type: 'text-h4', prop: 'existingProblemName', style: value => {
                                    return (value == this.state.choose.existingProblemName) && {
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