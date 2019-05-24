import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  setTitle,
} from '@/util/util'
import { Message } from 'element-ui'

// NProgress Configuration
NProgress.configure({
  showSpinner: false,
})

const whiteList = ['/login']
const lockPage = '/lock'

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  // console.log('to', to)
  const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : to.name
  if (whiteList.indexOf(value) === -1) {
    store.commit('ADD_TAG', {
      label: label,
      value: value,
      query: to.query,
    })
  }
  if (store.getters.access_token) { // determine if there has token
    if (store.getters.isLock && to.path !== lockPage) {
      next({
        path: lockPage,
      })
      NProgress.done()
    } else if (to.path === '/login') {
      console.log('to login', to.path)
      next({
        path: '/',
        // path: '/login',
      })
      NProgress.done()
    } else {
      if (store.getters.roles === undefined) {
        // 修复新增用户重复请求 info 接口 测试
        store.dispatch('GetUserInfo').then(() => {
          // const roles = res.roles
          next({
            ...to,
            replace: true,
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login',
            })
            NProgress.done()
          })
        })
      } else if (store.getters.roles.length === 0) {
        Message({
          message: '用户权限丢失, 请重新登录',
          type: 'error',
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 寻找子菜单的父类
function findMenuParent (tag) {
  const tagCurrent = []
  tagCurrent.push(tag)
  return tagCurrent
}

router.afterEach(() => {
  NProgress.done()
  setTimeout(() => {
    const tag = store.getters.tag
    setTitle(tag.label)
    store.commit('SET_TAG_CURRENT', findMenuParent(tag))
  }, 0)
})
