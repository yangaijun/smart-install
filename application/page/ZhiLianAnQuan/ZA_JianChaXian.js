import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View} from 'react-native'
import columns from '../../region/columns'
import Modal from 'react-native-modal'
const Search = columns.ZA_Search('请输入检查项名称')

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '检查项',
            headerRight: <Freedomen.Region 
                event={params => { 
                    navigation.state.params.show()
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
            list: [],
            visible: false
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({show: () => {
            this.setState({
                visible: true
            })
        }})
        this.setState({
            list: [{},{},{}]
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    style={{backgroundColor: 'white', padding: 10, paddingBottom:1}}
                    event={params => { 
                        if (params.prop == '_clear') {
                            params.row.content = ''
                            return params.row
                        }
                    }}
                    columns={Search}
                />
                <Freedomen.FreshList 
                    data={this.state.list}
                    columns={[
                        {type: 'text-h4', value: '检查1号', style: {flex: 1}},
                        {type: 'button-image-icon', value: require('../../assets/shanchu.png')},
                        {type: 'br-form-row'}
                    ]}
                />

                <Modal 
                    isVisible={this.state.visible}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}>
                    <Freedomen.Region 
                        event={params => {
                            if (params.prop == 'cancel' || params.prop == 'confirm') {
                                this.setState({ visible: false })
                            }
                        }}
                        columns={[
                            {type: 'text-dialog-title', value: '新建检查项', style: {alignSelf: 'center', paddingBottom: 25}},
                            {type: 'input-text', prop: 'c', placeholder: '请输入检查项名称', style: {backgroundColor: '#f5f5f5', paddingTB: 8, paddingLR: 15, borderRadius: 5}},
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </Modal>
            </View>
        );
    }
  }