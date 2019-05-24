import axios from 'axios'
import store from '../store'
import { getToken } from '@/util/auth'
import { Message } from 'element-ui'
// import qs form 'qs'
import errorCode from '@/config/errorCode'

// 超时时间
axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api'
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// let msg
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  // console.log('HTTPrequest拦截', config)
  if (store.getters.access_token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(response => {
  // const res = response.data
  // 401:Token 过期了;
  // console.log('HTTPresponse拦截', response)

  console.log('responseDataSuccess', response)

  if (response.status === 401) {
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  } else {
    return response
  }
}, error => {
  // console.log('错误信息', error)
  console.log('responseDataError', error)

  const errMsg = error.toString()
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: errorCode[code] || errorCode['default'],
    type: 'error',
  })
  if (code === '401') {
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  }
  return Promise.reject(new Error(error))
})

export default axios
