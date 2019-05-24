import axios from 'axios'
import store from '../store'
import { getToken } from '@/util/auth'
import { Message } from 'element-ui'
import errorCode from '@/config/errorCode'
import Qs from 'qs'
// import {transformGetRequest} from '@/util/util'
const timeout = 30 * 1000
const $http = axios.create({
  baseURL: '/api',
  timeout: timeout,
  withCredentials: true,
})
// let msg
// HTTPrequest拦截
$http.interceptors.request.use(config => {
  if (config.method === 'get' && config.params) {
    // config.params = transformGetRequest(config.params)
  }
  if (store.getters.access_token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
$http.interceptors.response.use(data => {
  if (data.status === 401) {
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  } else if (data.data.code && data.data.code !== 0) {
    setTimeout(()=>{
      Message.error(data.data.msg ? data.data.msg : '未知异常！')
    }, 15)
    return data
  } else {
    return data
  }
}, error => {
  const errMsg = error.toString()
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: error.response.data.msg ? error.response.data.msg : errorCode[code] || errorCode['default'],
    type: 'error',
  })
  if (code === '401') {
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  }
  return Promise.reject(new Error(error))
})

let request = ({
  url = '', 
  params = {}, 
  data = {}, 
  method = 'get', 
  timeout = 30000, 
  headers = {},
  responseType = 'json'}) => {
  let http = null
  let content = {
    url,
    params,
    data,
    method,
    timeout,
    responseType,
    headers,
  }
  if (method === 'get') {
    content.paramsSerializer = function (params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
  }
  http = $http(content)
  return http
}
request.post = $http.post
request.get = $http.get
export default request
