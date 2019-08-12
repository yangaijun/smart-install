import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '我' + navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => {  
                    if (params.prop == 'shaixuan')
                        navigation.push('GZ_ShaiXuan')
                }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list:[{status: 2, cd: 1, progress: .2}, {status: 1, cd: 2, progress: .5}, {status: 3, cd: 1, progress: .9}, {status: 4, cd: 3, progress: .8}]
            })
        }, 400);
    }
    _view = () => {
        return <Freedomen.FreshList 
            event={params => { 
                if (params.row.status == 1) {
                    this.props.navigation.push('ZhiLianJianCha')
                } else if (params.row.status == 2) {
                    this.props.navigation.push('ZhiLianZhenGai')
                }
            }}
            columns={columns.GonZuoItem}
            data={this.state.list}
        />
    }
    render() {
        return (
            <Freedomen.Tab 
                columns={[
                    {prop: 'qb', label: '全部', view: this._view()},
                    {prop: 'rwd', label: '任务单', view: this._view()},
                    {prop: 'zlzg', label: '质量整改', view: this._view()},
                    {prop: 'aqzg', label: '安全整改', view: this._view()},
                    {prop: 'scsl', label: '实测实量', view: this._view()},
                ]}
            /> 
        );
    }
  }