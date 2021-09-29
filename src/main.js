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
router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	console.log(next)
	next()
    // const role = localStorage.getItem('token');
    // if (!role && to.path !== '/login') {     //判断是否有权限进入该后台系统
    //     next('/login');              
    // }
    // //重点在这里
    // else if (to.matched.some(res => res.meta.requiresAuth)){
    //     // 根据路由中添加的meta.requiresAuth属性
    //     // 判断用户访问的to.path，与后台菜单中的path是否一致
    //     let menuList = JSON.parse(localStorage.getItem('menuList'));
    //         if (menuList && menuList.length != 0) {
    //             if(menuList.indexOf(to.path) > -1){// 若存在，继续访问
    //                 next();
    //             } else {
    //                 next('/login');   //如不存在，则跳转至登录页面
    //             }
    //         } else {
    //             next();
    //         }
    //     }
    // else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
