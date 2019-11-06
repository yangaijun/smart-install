import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Alert} from 'react-native'
import columns from '../../region/columns'  
const Search = columns.ZA_Search('请输入检查项名称')
var name, checkTypeList 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '添加检查项',
            headerRight: <Freedomen.Region 
                event={params => {  
                    if (name != null) {
                        checkTypeList.push({
                            name: name
                        })
                        navigation.push('ZA_JianChaXianLeiBiao', {checkTypeList: checkTypeList})
                    }
                }}
                columns={[
                    {type: 'button-text', value: '新增', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
        name = null
        checkTypeList = props.navigation.state.params.checkTypeList
    }
    componentDidMount() { 
       
    } 
    render() {
        return ( 
                <Freedomen.Region  
                    style={{backgroundColor: '#f5f5f5', flex: 1}}
                    event={params => { 
                        name = params.value
                    }}
                    columns={[
                        {type: 'input-text', others: {autoFocus: true}, prop: 'checkName', placeholder: '请输入检查项名称'},
                        {type: 'br', style: {padding: 10, height: 52, backgroundColor: 'white'}}
                    ]}
                />
                
        );
    }
  }