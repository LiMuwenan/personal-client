import axios from "axios"
import { getToken } from '~/util/auth.js'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use(function (config) {
    // 处理响应数据
    config.headers['Authorization'] = 'Bearer ' + getToken()
    console.log('Bearer ' + getToken())
    return config;
}, {
    function(error) {
        // 处理错误
        return Promise.reject(error);
    }
})


// 响应拦截器
service.interceptors.response.use(function (response) {
    // 处理响应数据
    return response;
}, {
    function(error) {
        // 处理错误
        return Promise.reject(error);
    }
})




export default service