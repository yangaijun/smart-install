import React from 'react'
import Freedomen from 'react-native-freedomen' 
import {View, Text} from 'react-native'
import Modal from "react-native-modal";
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {return {
        title: '分类管理',
        headerRight: <Freedomen.Region 
            event={params => {
                navigation.state.params.show()
            }}
            columns={[
                {type: 'button-image-right', value: require('../../assets/tianjia.png')}
            ]}
        />
    }}
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
        setTimeout(() => {
            this.setState({
                list: [{}, {}, {}],
            })
        }, 400);
        
    }
    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5'}}>
                <Freedomen.FreshList 
                    event={params => {}}
                    data={this.state.list}
                    columns={[ 
                        {type: 'text-h3', value: '分类名称', style: {flex: 1}},
                        {type: 'button-image-icon', value: require('../../assets/bianji.png'), style: {marginRight: 12}},
                        {type: 'button-image-icon', value: require('../../assets/shanchu.png')},
                        {type: 'br-form-row', style: {flexDirection: 'row'}}
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
                                this.setState({
                                    visible: false
                                })
                            }
                        }}
                        columns={[
                            {type: 'text-dialog-title', value: '新建分类', style: {alignSelf: 'center', paddingBottom: 25}},
                            {type: 'input-text', prop: 'c', placeholder: '请输入分类名称', style: {backgroundColor: '#f5f5f5', paddingTB: 8, paddingLR: 15, borderRadius: 5}},
                            columns.CancelAnConfirm,
                            {type: 'br-dialog'}
                        ]}
                    />
                </Modal>
            </View>
        );
    }
  }