import axios from 'axios'     
const axiosInstance = axios.create({
    baseURL: 'http://www.jasobim.com:8089/jaso/',
    timeout: 30000
})  

let token = null 

axiosInstance.interceptors.request.use((config) => {  
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + token
    } 
    return config 
}, function(error) {  
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response) => {
    try {
        if (response.data.token) {
            token = response.data.token 
        }
    } catch (e) {} 
    
    return response.data.data || response.data
   
}, function(error) {   
    return Promise.reject(error);
})

 
export default axiosInstance 