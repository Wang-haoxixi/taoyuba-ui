import Vue from 'vue'
import VueRouter from 'vue-router'
import './permission' // 权限
import './error' // 日志
import router from './router/router'
import App from './App'
import store from './store'

import './plugins/element'
import './plugins/ant-design'

import './core/use'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
