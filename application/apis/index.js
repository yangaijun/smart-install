import config from './config'   
class Api {
    get(url, params) {  
        return config.axios.get(url, { params: params })  
    }
    post(url, params) { 
        return config.axios.post(url, params) 
    }
    postForm(url, formData) { 
        return config.postForm(url, formData)
    } 
}
 
const api = new Api() 

export default api