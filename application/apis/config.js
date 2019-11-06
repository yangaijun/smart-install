import axios from 'axios'      

export default function postForm(file) {  
    let formData = new FormData()
    formData.append(file, file) 
    console.log('test', formData)
    return axios({
        url: 'http://www.jasobim.com:8085/api/files/uploadFiles',
        method:'post',
        data: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'}
    })
} 
 