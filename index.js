/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './application/router/index';
import {name as appName} from './app.json';
import Freedomen from 'react-native-freedomen'
import api from './application/apis2'
import Toast from 'react-native-root-toast'
Freedomen.global.api = api  
Freedomen.global.toast = (message) => {
    Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    })
}

Freedomen.custom({
    primaryColor: '#2EBBC4'
}, {}, {
    //form 
    'text-form-label': {
        color: '#191919',
        fontSize: 16,
        fontWeight: '400'
    },
    'text-list': {
        fontWeight: '800', 
        fontSize: 22, 
        color: 'white', 
        backgroundColor: '#2EBBC4', 
        width: 40, 
        height: 40, 
        paddingLeft: 14,
        paddingTop: 5,
        marginLR: 15, 
        borderRadius: 20
    },
    'text-valid-message': {
        color: '#FF6D73',
        marginLeft: 10,
        padding: 5,
    },
    'br-form-row': {
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 52 
    },
    'click-form-row': {
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 52 
    },
    'br-form-col': {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 1, 
        backgroundColor: 'white'
    },
    'image-form': {
        height: 16, 
        width: 16
    },
    'input-area-form': {
        backgroundColor: '#f5f5f5', 
        padding: 10,
        marginTop: 8
    },
    'input-text-form': {
        alignItems: 'flex-end'
    },
    'input-text-item': {
        borderColor: '#ccc', 
        borderWidth: .5, 
        width: 55,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    'text-form-must': {
        color: '#FF6D73',
        padding: 5,
        flex: 1
    },
    'input-text-b': {
        borderColor: '#f5f5f5',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    //dialog
    'text-dialog-title': {
        alignSelf: 'center', 
        paddingBottom: 15,
        fontSize: 16,
        fontWeight: '500',
        color: '#121212' 
    },
    'br-dialog': {
        backgroundColor: 'white', 
        padding: 25, 
        paddingTop: 20,
        paddingBottom: 0, 
        borderRadius: 5, 
        marginHorizontal: '10%'
    },
    'click-col': {
        padding: 15, 
        backgroundColor: 'white',
        marginBottom: 1,
    },
    'click-row': {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15, 
        backgroundColor: 'white'
    },
    'br-normal-row': {
        flexDirection: 'row',
        alignItems: 'center',
    },
    'br-row': {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white'
    }, 
    'text-label': {
        padding: 5,
        paddingLeft: 1,
        color: '#787878'
    },
    'text-circle': {
        height: 8,
        width: 8,
        borderRadius: 8,
        marginRight: 2
    },
    'tags-tab': {
        borderWidth: 0, 
        color: '#191919', 
        flex: 1,
        height: 32
    },
    'text-tag': {
        borderColor: '#FF2B2B',
        borderWidth: .8, 
        color: '#FF2B2B', 
        borderRadius: 2,
        padding: 2,
        fontSize: 12,
        paddingLeft: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    'text-status': {
        color: 'white', 
        fontSize: 12,
        borderRadius: 9,
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
    //段落
    'text-p': {
        lineHeight: 20,
        color: '#191919',
        fontSize: 14,
        paddingTop: 4,
        paddingBottom: 4,
    },
    'text-primary': {
        color: '#2EBBC4', 
        paddingRight: 5
    },
    'button-text-primary': {
        color: '#2EBBC4', 
        fontSize: 16
    },
    'button-image-right': {
        width: 28, 
        height: 28, 
        marginRight: 12
    },
    'button-right': {
        marginRight: 15,
        color: '#999999'
    },
    'button-image-icon': {
        width: 22,
        height: 22,
        marginRight: 5
    },
    'button-image-picture': {
        height: 65,
        width: 65,
        marginTop: 5,
    },
    'text-title': {
        fontSize: 16,
        color: '#191919',
        flex: 1
    },
    'text-h4': {
        fontSize: 14,
        color: '#191919',
    },
    'button-pop-item': {
        color: '#2EBBC4',
        fontSize: 18, 
        textAlign: 'center',
        paddingVertical: 15,
        backgroundColor: 'white', 
        height: 52, 
        width: '100%'
    },
    'button-az': {
        borderRadius: 12, 
        paddingVertical: 3, 
        paddingHorizontal: 8, 
        borderWidth: 1,
        borderColor: '#2EBBC4',
        color: '#2EBBC4',
        marginLeft: 5
    },
    'text-must': {
        color: '#FF6D73',
        padding: 5
    },
    'text-h5': {
        color: '#191919'
    },
    'text-badge': {
        color: 'white',
        backgroundColor: 'red',  
        minHeight: 10,
        minWidth: 10,
        padding: 3, 
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 11,
        padding: 1, 
        textAlign: 'center',
        marginLeft: -3,
        marginTop: -8,
        borderColor: 'white',
        borderWidth: .8,
    }, 
    'br-col': {
        padding: 15,
        backgroundColor: 'white'
    }, 
    'click-card': {
        flexDirection: 'row', 
        backgroundColor: 'white', 
        padding: 15, 
        borderRadius: 5, 
        alignItems: 'center', 
        borderWidth: 2, 
        borderColor: '#f5f5f5'
    },
    'image-icon': {
        width: 22,
        height: 22,
        marginRight: 5
    }, 
    'br-list-item': {
        backgroundColor: 'white', 
        padding: 10, 
        paddingHorizontal: 15,
        borderRadius: 2, 
        marginBottom: 3, 
        marginTop: 1
    },
    'click-list-item': {
        backgroundColor: 'white', 
        padding: 10, 
        paddingHorizontal: 15,
        borderRadius: 2, 
        marginBottom: 3, 
        marginTop: 1
    },
    'br-bottoms': {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        paddingTop: 5, 
        marginTop: 5,
        borderTopWidth: 1, 
        borderTopColor: '#fafafa',
        alignItems: 'center'
    },
    'image-item': {
        height: 46,
        width: 46,
        margin: 5,
    },
    'image-header': {
        height: 42,
        width: 42,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 21,
    }
})


AppRegistry.registerComponent(appName, () => App);
