import { serialize } from '@/util/util'
import { getStore } from '../util/store'
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress' // progress bar
import errorCode from '@/const/errorCode'
// import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import store from '@/store' // progress bar style
import router from '@/router/router'
import { Message } from 'element-ui'

axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api'

// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
})

// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    // console.log(config)
    //请求头增加参数，用于判断合同新增静默自动保存，不显示NProgress
    if(config.headers.process != false){
      NProgress.start() // start progress bar
    }
    const TENANT_ID = getStore({ name: 'tenantId' })
    const isToken = (config.headers || {}).isToken === false
    let token = store.getters.access_token
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + token // token
    }
    if (TENANT_ID) {
      config.headers['TENANT_ID'] = TENANT_ID // 租户ID
    }
    // headers中配置serialize为true开启序列化
    if (config.method === 'post' && config.headers.serialize) {
      config.data = serialize(config.data)
      delete config.data.serialize
    }
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const message = res.data.msg || errorCode[status] || errorCode['default']
  if (status === 401 || res.data.code === 401) {
    store.dispatch('FedLogOut').then(() => {
      router.push({ path: '/login' })
    })
    return
  } else if (status === 403 || res.data.code === 403) {
    router.push({ path: '/403' })
    return
    // } else if (status === 404 || res.data.code === 404) {
    //   router.push({ path: '/404' })
    //   return
    // } else if (status === 500 || res.data.code === 500) {
    //   router.push({ path: '/500' })
    //   return
  } else if (status !== 200 || res.data.code === 1) {
    Message({
      message: message,
      type: 'error',
    })
    // if (process.env.NODE_ENV === 'development') {
    //   Message({
    //     message: message,
    //     type: 'error',
    //   })
    // }
    // return res
    return Promise.reject(new Error(message))
  } else {
    return res
  }
},
  error => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export default axios
