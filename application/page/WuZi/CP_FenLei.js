import React from 'react'
import Freedomen from 'react-native-freedomen'   
import {ScrollView, View} from 'react-native'; 
const Kinds = [{materialTypeName: '全部分类', materialTypeId: null}]
export default  class  extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            activityId: null,  
            kinds: {kinds:[]}
        } 
    }
    componentDidMount() {
        //分类
        Freedomen.global.api.call('/MaterialType/select').then(res => {
            if (res.length)
                this.setState({ 
                    kinds: {
                        kinds: Kinds.concat(res)
                    }
                })
        })
    }
    
    render() {
        return (
            <View style={{width: 88, marginRight: 2}}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Freedomen.Region 
                        event={params => {
                            this.setState({
                                activityId: params.value.row.materialTypeId
                            })
                            this.props.event && this.props.event(params.value.row) 
                        }}
                        data={this.state.kinds}
                        columns={[
                            {type: 'views-y', prop:'kinds', value: [], style: {width: 88}, columns: [
                                {type: 'button-text', prop: 'materialTypeName', value: '全部分类', style: (value, data) => {
                                        let color = this.state.activityId === data.materialTypeId ? '#2EBBC4': '#191919'
                                        return {padding: 15, align: 'center', backgroundColor: 'white', marginBottom: 1, color: color}
                                    }  
                                }
                            ]}
                        ]}
                    /> 
                    
                </ScrollView>
            </View>
        );
    }
  }