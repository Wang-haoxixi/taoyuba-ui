import Vue from 'vue'
import VueRouter from 'vue-router'
import './permission' // 权限
import './error' // 日志
import router from './router/router'
import App from './App'
import store from './store'
import  htmlToPdf from './util/htmlToPdf'
																										
import './plugins/element'
import './plugins/ant-design'

import './core/use'
import echarts from 'echarts'
import 'echarts/map/js/china'
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)
// import VueSocketio from 'vue-socket.io'
// Vue.use(new VueSocketio({
//     debug: true,
//     connection: 'http://localhost:5000', //地址+端口，由后端提供
// }))

import VueAMap from 'vue-amap'
Vue.prototype.$echarts = echarts
VueAMap.initAMapApiLoader({
  key: 'f317c5ad96bcde419b16dfc4b022d69f',
  plugin: [
	'AMap.Autocomplete',
	'AMap.PlaceSearch',
	'AMap.Scale',
	'AMap.OverView', 
	'AMap.ToolBar', 
	'AMap.MapType', 
	'AMap.PolyEditor', 
	'AMap.CircleEditor',
	'AMap.Geolocation',
	],
  v: '1.4.4',
})

Vue.use(VueAMap)
Vue.use(htmlToPdf)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location)
}
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
