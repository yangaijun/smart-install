import React from 'react' 
import Modal from "react-native-modal";

export default  class  extends React.Component {
   
    constructor(props) {
        super(props) 
        this.state = {
            visible: false
        }
    }
    _show = () =>  {
        this.setState({
            visible: true
        })
    }
    _hide = () =>  {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <Modal 
                isVisible={this.state.visible}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={600}>
                    {this.props.children}
            </Modal>
        );
    }
  }
