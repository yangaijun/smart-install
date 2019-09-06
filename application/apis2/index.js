import axios from './config'  
import Freedomen from 'react-native-freedomen'
class Api { 
    upload(formdata) {
        return axios({
            url:'/User/upload',
            method:'post',
            data: formdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }
    call(url, param) { 
        return callApi(url, param) 
    } 
}
 

function callApi(url, param) {
    if (param === void 0) {
        param = {}
    } 
    //******************************************************************************** */
    param.companyId = 0
    if (Freedomen.global.project && !param.projectId) {
        param.projectId = Freedomen.global.project.projectId
    }
    return axios.post(url, param) 
}
  
const api = new Api() 
export default api