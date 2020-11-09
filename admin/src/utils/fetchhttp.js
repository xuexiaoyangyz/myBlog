import axios from 'axios';
import apiUrl from '../config/apiUrl'

// axios.interceptors.response.use((resp)=>{
//     return resp
// },async (err)=>{
//     console.log(err.response.status===401)
//     if(err&&err.response.status===401){
//         // window.history.push('/login')
//     }
// })


const httpFetch = {
    get(url,params,header = {}){
        const option = {
            method:'get',
            url:`${apiUrl}${url}`,
            header:{
              'Access-Control-Allow-Origin':'*',
              ...header,
            },
            params,
            withCredentials:true,
        }
        return axios(option)
    },
    post(url,data,header = {}){
        const option = {
            method:'post',
            url:`${apiUrl}${url}`,
            header:{
              'Access-Control-Allow-Origin':'*',
              ...header,
            },
            data,
            withCredentials:true,
        }
        return axios(option)
    }
}

export default httpFetch