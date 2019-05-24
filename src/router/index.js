import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import baseRouter from './_router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import AvueRouter from './avue-router'
import {
  formatRoutes,
} from '@/util/util'

Vue.use(VueRouter)

let Router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
  routes: [].concat(
    ...formatRoutes(store.state.user.menuAll),
    // {
    //   path: '/lookdata',
    //   component: () => import('@/views/lookdata'),
    //   name: 'shujukeshi',
    // },//临时路由
    PageRouter,
    ViewsRouter,
  ),
})

AvueRouter.install(Router, store)

export default Router
