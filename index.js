/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './application/router/index';
import {name as appName} from './app.json';
import Freedomen from 'react-native-freedomen'
import api from './application/apis'
Freedomen.global.api = api  

Freedomen.custom({
    primaryColor: '#2EBBC4'
}, {},{
    //form 
    'text-form-label': {
        color: '#121212',
        fontSize: 16,
        fontWeight: '300'
    },
    'br-form-row': {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 58,
    },
    'br-form-col': {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 1, 
        backgroundColor: 'white'
    },
    'click-form-row': {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        minHeight: 58,
    },
    'image-form': {
        height: 22, 
        width: 22
    },
    'input-area-form': {
        backgroundColor: '#f5f5f5', 
        padding: 10
    },
    //dialog
    'text-dialog-title': {
        alignSelf: 'center', 
        paddingBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121212' 
    },
    'br-dialog': {
        backgroundColor: 'white', 
        padding: 25, 
        paddingBottom: 0, 
        borderRadius: 5, 
        marginHorizontal: 25
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
    'text-tag': {
        borderColor: '#FF2B2B',
        borderWidth: .8, 
        color: '#FF2B2B', 
        borderRadius: 2,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    //段落
    'text-p': {
        lineHeight: 22,
        color: '#191919',
        fontSize: 14,
        paddingTop: 8,
        paddingBottom: 8,
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
    'button-image-icon': {
        height: 26, 
        width: 26, 
        margin: 5
    },
    'text-title': {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#191919',
        flex: 1
    },
    'button-az': {
        borderRadius: 18, 
        paddingVertical: 3, 
        paddingHorizontal: 15, 
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
        borderRadius: 16,
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
        width: 26,
        height: 26,
        margin: 5,
    }, 
    'br-list-item': {
        backgroundColor: 'white', 
        padding: 10, 
        paddingHorizontal: 15,
        borderRadius: 2, 
        marginBottom: 2, 
        marginTop: 1
    },
    'br-bottoms': {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        paddingTop: 5, 
        borderTopWidth: 1, 
        borderTopColor: '#f5f5f5',
        alignItems: 'center'
    },
    'image-item': {
        height: 46,
        width: 46,
        margin: 5,
    },
    'image-header': {
        height: 39,
        width: 39,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 39,
    }
})
AppRegistry.registerComponent(appName, () => App);
