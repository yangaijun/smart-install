import axios from './config'  
import axiosUpload from 'axios' 
import Freedomen from 'react-native-freedomen'
class Api {  
    upload(file) {
        let formData = new FormData()
        formData.append('file', file) 
        return axiosUpload({
            url: 'http://www.jasobim.com:8085/api/files/uploadFiles',
            method:'post',
            data: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'}
        })
    }
    getWeather(params) {
        return axiosUpload.get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: params
        })
    }
    getPosition(params) {
        params.output = 'JSON'
        params.key = '8fd4655c8ad5b554912b1aa8c6ab1e89'
        params.radius = 0
        params.extensions = 'base'

        return axiosUpload.get('http://restapi.amap.com/v3/geocode/regeo', {
            params: params
        })
    }
    getJaso(url, params) {
        return axiosUpload.get('http://bim.jaso.com.cn/api/' + url, {
            params: params
        })
    }
    postJaso(url, params) {
        return axiosUpload.post('http://bim.jaso.com.cn/api/' + url, params)
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
    if (!Array.isArray(param)) {
        param.companyId = 0
        if (Freedomen.global.project && !param.projectId) {
            param.projectId = Freedomen.global.project.projectId
        }
    }
    return axios.post(url, param) 
}
  
const api = new Api() 
export default api