import 'babel-polyfill'
// import '@babel/polyfill'
import 'classlist-polyfill'
import es6Promise from 'es6-promise'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Avue from '@smallwei/avue/lib/index.js'
import '@smallwei/avue/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/router/request'
import './permission' // 权限
// import './errorLog' // 错误日志性能监控

import '@/config/index'
// import * as urls from '@/config/env'
// import { loadStyle } from '@/util/util'
import * as filters from './filters' // 全局filter

import 'nprogress/nprogress.css' // progress bar style
import '@/styles/index.scss'
import '@/font/iconfont.css'

import * as base from '@/config/global'
// 公共
import bus from "vue-bus"
// 可视化
import viserVue from "viser-vue"
// 注册组件后即可使用
// const { iconfontVersion, iconfontUrl } = urls
// iconfontVersion.forEach(ele => {
//   loadStyle(iconfontUrl.replace('$key', ele))
// })
import AvueUeditor from 'avue-plugin-ueditor/packages'

//chrome中vue插件启用条件
Vue.config.devtools = true

Vue.use(AvueUeditor)

es6Promise.polyfill()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Avue, axios)
Vue.use(VueAxios, axios)
Vue.use(bus)
Vue.use(viserVue)

Object.keys(base).forEach(key => {
  Vue.prototype[key] = base[key]
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
