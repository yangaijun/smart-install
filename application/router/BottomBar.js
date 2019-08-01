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
        title: '添加',
        activeIcon: require('../assets/tj.png'),
        inactiveIcon: require('../assets/tj.png')
    },
    {
        title: '项目',
        activeIcon: require('../assets/unwj.png'),
        inactiveIcon: require('../assets/wj.png')
    },
    {
        title: '学习',
        activeIcon: require('../assets/ungrzx.png'),
        inactiveIcon: require('../assets/grzx.png')
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
                <View style={[styles.container]}>
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
        let iconWidth =  index == 2 ? 52 : 22
        
        return (
            <TouchableWithoutFeedback style={styles.iconView} onPress={() => jumpToIndex(index)}>
                <View style={styles.iconView}> 
                {
                    index == 3 
                        ? <Freedomen.Region 
                        columns={[
                            {type: 'image', prop: 'image', style: {height: 22, width: 22, resizeMode: 'stretch'}},
                            {type: 'text', prop: 'count', load: (value) => value > 0, style: {marginLeft: -5, marginTop: -8, color: 'white', backgroundColor: 'red', width: 17, height: 17, borderRadius: 16, align: 'center'}},
                            {type: 'br', style: {flexDirection: "row"}}
                        ]}
                        data={{'image': image}}
                        redux={'bar_gouwuche'}
                    /> 
                        : <Image source={image} style={{
                            width: iconWidth,
                            height: iconWidth,
                            resizeMode: 'stretch',  
                            marginTop: index == 2 ? -25 : 0
                        }}/> 
                }
                {
                    index == 2 ? null : <Text style={{color: color}}>{item.title}</Text>
                }
                </View>
            </TouchableWithoutFeedback>
        )
    }
  
}


const styles = StyleSheet.create({
    container: {
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
