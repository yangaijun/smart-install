import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import {View} from 'react-native'

export default  class  extends React.Component {
    static navigationOptions = {
        title: '详情',
        headerRight: <Freedomen.Region 
            event={params => { 
            }}
            columns={[
                {type: 'button-text', value: '保存', style: {marginRight: 12}}
            ]}
        />
    }
    constructor(props) {
        super(props)
        this.state = { }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Freedomen.Region 
                    style={{flex: 1}}
                    event={params => { }}
                    columns={[
                        columns.GonZuoForm
                    ]}
                />
                <Freedomen.Region 
                    style={{height: 52, borderTopWidth: 1, borderTopColor: '#f5f5f5'}}
                    event={params => { }}
                    columns={[
                        [
                            {type: 'image-icon', value: require('../../assets/shanchu.png')},
                            {type: 'text-must', value: '删除'},
                            {type: 'click', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                        ], [
                            {type: 'image-icon', value: require('../../assets/bianji.png')},
                            {type: 'text-primary', value: '编辑'},
                            {type: 'click', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                        ], [
                            {type: 'image-icon', value: require('../../assets/za_zhipai.png')},
                            {type: 'text-primary', value: '指派'},
                            {type: 'click', style: {flex: 1, flexDirection: 'row', align: 'center'}}
                        ],
                        {type: 'br', style: {flexDirection: 'row', backgroundColor: 'white'}}
                    ]}
                />
            </View>
        );
    }
  }