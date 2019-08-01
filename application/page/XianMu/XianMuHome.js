import React from 'react'
import {View, ScrollView} from 'react-native'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
import datas from '../../region/datas'
export default  class  extends React.Component {
    static navigationOptions = {
        title: '开封橄榄城·乐享茂',
    }
    constructor(props) {
        super(props)
        this.state = { }
    }
    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#f5f5f5'}}> 
                <Freedomen.Region 
                    style={{ height: 80}}
                    columns={[
                        {type: 'text-h4', value: '多云转晴 17-36℃'},
                        {type: 'text', value: '开封市第一大街以东，附一大街以西'},
                        {type: 'br', style: {marginBottom: 1, backgroundColor: 'white', padding: 15}}
                    ]}
                />  
                <ScrollView style={{flex: 1,  backgroundColor: 'white'}}>
                    {
                        datas.XianMu.map((el, key) => {
                            return <Freedomen.Region 
                                key={key}
                                data={el}
                                event={params => { 
                                    if (params.value.row.label == '物资')
                                        this.props.navigation.navigate('WuZiGuanLi')
                                    else if (params.value.row.label == '实测实量')
                                        this.props.navigation.navigate('WoDeRenWu')
                                }}
                                columns={ columns.YinYon }
                            />
                        })
                    }
                </ScrollView>
            </View>
        );
    }
  }