import axios from 'axios'    
import store  from 'react-native-freedomen/store' 
var qs = require('qs')
const axiosInstance = axios.create({
    baseURL: 'http://www.jasobim.com:8080',
    timeout: 30000
})  

let token = null
store.get('token').then(res => {
    token = res
})
axiosInstance.interceptors.request.use((config) => {   
    if (config.method && config.method =='get') {
        if (token != null) { 
            config.params.token = token
        }
    } else {
        if (token != null) 
            config.data.token = token  
            
        config.data = qs.stringify(config.data) 
    }
    return config 
}, function(error) {   
    return Promise.reject(error);
})
 
axiosInstance.interceptors.response.use((response) => {
    try { 
        if (response.data.token) {
            token = response.data.token
            
            store.set('token', token)
        } 
        if (response.data.callStatus === 'SUCCEED') {
            return response.data.data
        } else {
            return Promise.reject({error: response.data.errorInfo})
        } 
        
    } catch (e) {}

    return response
}, function(error) {  
    return Promise.reject(error);
})

function postForm(url, formData) { 
    formData.append('token', token)
   
    return axios({
        url: 'http://www.jasobim.com:8080/' + url,
        method:'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'}
    })
} 

export default {axios: axiosInstance , postForm: postForm}