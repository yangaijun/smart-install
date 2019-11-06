import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View} from 'react-native' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '入库记录',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.push('WZ_RuKuChuKu', {label: '入库：选择物资', logType: 0})
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/tianjia.png')}
            ]}
        />
    }}
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.params = {
            logType: 0,
            pageVo: {
               pageNo: 1,
               pageSize: 15
            }
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        Freedomen.global.api.call('/MaterialLogList/select', this.params).then(res => { 
            this.setState({
                list: res.data
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    event={params => {
                        if (['$page', '$fresh'].includes(params.prop)) {
                                this.params.pageVo.pageNo = params.row.pageNo
                                this._loadData()
                            }
                        else if(params.prop == 'into')
                            this.props.navigation.push('WZ_XianQin', params.row)
                    }}
                    data={this.state.list}
                    columns={[
                        [
                            {type: 'text-h4', prop: 'createTime', filter: 'yyyy-MM-dd', style: {flex: 1}},
                            {type: 'text-primary', prop: 'listNum', filter: value => `${value}项材料`},
                            {type: 'br', style: {flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}
                        ],
                        {type: 'text', prop: 'materialFrom', filter: value => `来源：${value}`},
                        {type: 'click-list-item', prop: 'into'}
                    ]}
                />
            </View>
        );
    }
  }