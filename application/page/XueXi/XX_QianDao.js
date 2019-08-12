import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
const Search = columns.ZA_Search()
export default  class  extends React.Component {
    static navigationOptions = {
        title: '检查项',
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text', value: '新增', style: {marginRight: 12}}
            ]}
        />
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <View>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 10, paddingBottom:1}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        }
                    }}
                    columns={[
                        Search,
                        [ 
                            {type: 'tags', value: '处罚单', options: '处罚单,奖励单', style: {borderWidth: 0, color: '#191919', flex: 1, borderRadius: 22}},
                            {type: 'br-row', style: {marginBottom: 1, align: 'center', marginTop: 10, borderTopColor:　'#f5f5f5', borderTopWidth: 1}}
                        ]
                    ]}
                />
            </View>
        );
    }
  }