import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    Image, 
    Animated,
} from 'react-native';
import Freedomen from 'react-native-freedomen'
import utils from '../region/utils';

const tabItems = [
    {
        title: '工作',
        activeIcon: require('../assets/ungzt.png'),
        inactiveIcon: require('../assets/gzt.png')
    },
    {
        title: '应用',
        activeIcon: require('../assets/unyy.png'),
        inactiveIcon: require('../assets/yy.png')
    }, 
    {
        title: '项目',
        activeIcon: require('../assets/unwj.png'),
        inactiveIcon: require('../assets/wj.png')
    },
    {
        title: '消息',
        activeIcon: require('../assets/message.png'),
        inactiveIcon: require('../assets/unmessage.png')
    },
    {
        title: '学习',
        activeIcon: require('../assets/xuexi.png'),
        inactiveIcon: require('../assets/unxuexi.png')
    }
]
export default class TabBar extends PureComponent {
    constructor(props) {
        super(props) 
    }
    render() {
        const {
            navigation, 
        } = this.props;
        const {
            routes
        } = navigation.state; 

        let jumpToIndex = (index) => {   
            navigation.navigate(routes[index].routeName)
        }
        return (   
            <View style={[styles.container, utils.PhoneType == 'iosx' && {height: 65, paddingBottom: 22}]}>
                {
                    routes && routes.map((route, index) => {
                        const focused = index === navigation.state.index;
                        return (
                            <TabBarItem
                                key={index}
                                route={route}
                                index={index}
                                focused={focused}
                                jumpToIndex={jumpToIndex}
                            />
                        );
                    })
                } 
            </View> 
        );
    }
};

class TabBarItem extends PureComponent{
    constructor(props) {
        super(props)
        this.scaleValue = new Animated.Value(0)
    }
    render() { 
        let { index, focused, jumpToIndex} = this.props; 
        
        let item = tabItems[index];
        let image = focused ? item.activeIcon : item.inactiveIcon;
        let color = focused ? '#2EBBC4' : '#979797';  
        let iconWidth =  26

        return (
            <TouchableWithoutFeedback style={styles.iconView} onPress={() => jumpToIndex(index)}>
            {
                index === 3 ? 
                <View style={styles.iconView}> 
                    <Freedomen.Region 
                        columns={[
                            {type: 'image', value: image, style: {height: iconWidth, width: iconWidth}},
                            {type: 'text-badge', prop: 'badge', value: 0, filter: value => value > 99 ? '99+' : value,  load: (value) => value, style: {marginLeft: 35, marginTop: -30, marginBottom: 6, height: 22}},
                            {type: 'text', value: item.title, style: {color: color, fontSize: 10}},
                            {type: 'br', style: {flex: 1, align: 'center'}}
                        ]} 
                        redux={'bar_middle'}
                    />
                </View>
                :
                <View style={styles.iconView}> 
                    <Image source={image} style={{
                            width: iconWidth,
                            height: iconWidth,
                            resizeMode: 'stretch',  
                        }}/> 
                    <Text style={{color: color, fontSize: 10}}>{item.title}</Text>
                </View>
            }
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        borderTopColor: '#f5f5f5',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 52,
        backgroundColor: '#fff', 
    },
    iconView: {
        flex: 1,
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        marginTop: 5, 
    }
});
