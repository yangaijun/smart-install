import React from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import {View} from 'react-native'  

export default  class  extends React.Component {
    static navigationOptions = {
        title: '预览'
    }
    constructor(props) {
        super(props)
        this.state = {
            images: this.props.navigation.state.params.pictures.map(el => {
                return {
                    url: `http://www.jasobim.com:8085/${el.picture}`
                }
            }),
            index: this.props.navigation.state.params.index
        }
    }  
    render() { 
        return (
            <View style={{flex: 1}}>
                <ImageViewer imageUrls={this.state.images} index={this.state.index} enableSwipeDown={true} onSwipeDown={() => {
                        this.props.navigation.goBack()
                }}/>
            </View>
        );
    }
  }