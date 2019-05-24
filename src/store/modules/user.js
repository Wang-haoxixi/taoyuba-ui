import {
  setToken,
  removeToken,
} from '@/util/auth'
import {
  setStore,
  getStore,
} from '@/util/store'
import {
  loginByUsername,
  getUserInfo,
  logout,
} from '@/api/admin/login'
import {
  getDeptId,
  } from '@/api/element/element'
import {GetMenu} from '@/api/admin/menu'
import {getDicList} from '@/api/admin/login'
import { encryption } from '@/util/util'
import cloneDeep from 'lodash/cloneDeep'
import isArray from 'lodash/isArray'
import {setDicList} from '@/util/dic'
const user = {
  state: {
    userInfo: getStore({
      name: 'userInfo',
    }) || {},
    permissions: getStore({
      name: 'permissions',
    }) || {},
    roles: getStore({
      name: 'roles',
    }) || undefined,
    menuAll: getStore({
      name: 'menuAll',
    }) || [],
    menu: getStore({
      name: 'menu',
    }) || [],
    dicList: getStore({
      name: 'dicList',
    }) || [],
    departmentList: getStore({
      name: 'departmentList',
    }) || [],
    activeMainMenu: getStore({
      name: 'activeMainMenu',
    }) || '',
    activeMenu: getStore({
      name: 'activeMenu',
    }) || '',
    isInitMenu: getStore({
      name: 'isInitMenu',
    }) || false,
    access_token: getStore({
      name: 'access_token',
    }) || '',
    refresh_token: getStore({
      name: 'refresh_token',
    }) || '',
    dictionary: getStore({
      name: 'dictionary',
    }) || '',
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({
      commit,
    }, userInfo) {
      return new Promise((resolve, reject) => {
        const user = encryption({
          data: userInfo,
          key: 'dipscloudisbest1',
          param: ['password'],
        })
        loginByUsername(user.username, user.password, user.code, user.randomStr).then((response) => {
          let res = response.data
          setToken(res.access_token)
          commit('SET_ACCESS_TOKEN', res.access_token)
          commit('SET_REFRESH_TOKEN', res.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTableData () {
      return new Promise(() => {
        // 未定义
        // getTableData(page).then(res => {
        //   const data = res.data
        //   resolve(data)
        // })
      })
    },
    GetUserInfo ({
      commit,
      state,
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then((response) => {
          let res = response.data
          if (res.code === 0) {
            const data = res.data
            commit('SET_ROLES', data.roles)
            commit('SET_USER_INFO', data.sysUserVO ? data.sysUserVO : data.sysUser)
            commit('SET_PERMISSIONS', data.permissions)
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({
      commit,
    }) {
     return new Promise((resolve, reject)  => {
        logout().then(() => {
          commit('SET_ACTIVE_MAIN_MENU', '')
          // 清除菜单
          commit('SET_MENU', [])
          commit('SET_MENU_ALL', [])
          // 清除权限
          commit('SET_PERMISSIONS', [])
          // 部门
          commit('SET_DEPARTMENT_LIST', [])
          // 清除用户信息
          commit('SET_USER_INFO', {})
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_ROLES', undefined)
          commit('DEL_ALL_TAG')
          commit('SET_DIC_LIST', {})
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销session
    FedLogOut ({
      commit,
    }) {
      return new Promise(resolve => {
        commit('SET_ACTIVE_MAIN_MENU', '')
        // 清除菜单
        commit('SET_MENU', [])
        commit('SET_MENU_ALL', [])
        // 清除权限
        commit('SET_PERMISSIONS', [])
        // 部门
        commit('SET_DEPARTMENT_LIST', [])
        // 清除用户信息
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('SET_DIC_LIST', {})
        commit('SET_DIC_LIST', {})
        removeToken()
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu ({
      commit,
    }) {
      return new Promise(resolve => {
        GetMenu().then((response) => {
          let res = response.data
          // , '/admin/user''/info_system/system_search'
          // const arr = ['/info_system/system_search', '/element/information', '/admin/user', '/myiframe/urlPath?src=http://127.0.0.1:5001&name=服务监控', '/tag/bqgl']
          // arr[3] = res
          // res.forEach((item) => {
          //   // console.log(item.children[0], item.children[0].path)
          //   if (item.children && item.children.length > 0) {
          //     if (~item.children[0].path.indexOf('http')) {
          //       item.redirect = `/myiframe/urlPath?src=${item.children[0].path}&name=${item.children[0].label}`
          //     } else {
          //       item.redirect = `${item.path}/${item.children[0].path}`
          //     }
          //   } else {
          //     item.redirect = `${item.path}`
          //   }
          // })
          // console.log(JSON.stringify(res))
          const mergeData = cloneDeep(res)
          // mergeData.forEach(ele => {
          //   ele.children.forEach(child => {
          //     if (!validatenull(child.component)) child.path = `${ele.path}/${child.path}`
          //   })
          // })
          // console.log('mergeData', mergeData)
          commit('SET_MENU_ALL', mergeData)
          // commit('SET_MENU', mergeData[0].children)
          // commit('SET_ACTIVE_MAIN_MENU', mergeData[0].name)
          resolve({mergeData, res})
        })
      })
    },
    // 获取字典
    GetDicList ({commit}) {
      return new Promise(resolve => {
        getDicList().then((response) => {
          let res = response.data
          var obj = {}
          if (!isArray(res)) {
            return
          }
          res.forEach((item) => {
            obj[item.number] = item.dictValueVoList
          })
          // console.log('SET_DIC_LIST', setDicList(obj))
          commit('SET_DIC_LIST', setDicList(obj))
          // commit('SET_DIC_LIST', res)
          resolve()
        })
      })
    },
    GetDepartmentList ({commit}) {
      return new Promise(() => {
        getDeptId().then(({data}) => {
          let res = data
          let arr = []
          if (!isArray(res)) {
            return
          }
          res.forEach((item) => {
            arr.push({value: item.id, label: item.name, type: item.type})
          })
          commit('SET_DEPARTMENT_LIST', arr)
        })
      })
    },
  },
  mutations: {
    // 字典
    SET_DICTIONARY: (state, dictionary) => {
      state.dictionary = dictionary
      setStore({
        name: 'dictionary',
        content: state.dictionary,
        type: 'session',
      })
    },
    SET_ACTIVE_MAIN_MENU: (state, menuName) => {
      state.activeMainMenu = menuName
      setStore({
        name: 'activeMainMenu',
        content: state.activeMainMenu,
        type: 'session',
      })
    },
    SET_ACTIVE_MENU: (state, menuName) => {
      state.activeMenu = menuName
      setStore({
        name: 'activeMenu',
        content: state.activeMenu,
        type: 'session',
      })
    },
    SET_DIC_LIST: (state, dicList) => {
      state.dicList = dicList
      setStore({
        name: 'dicList',
        content: state.dicList,
        type: 'session',
      })
    },
    SET_DEPARTMENT_LIST: (state, departmentList) => {
      state.departmentList = departmentList
      setStore({
        name: 'departmentList',
        content: state.departmentList,
        type: 'session',
      })
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.access_token = accessToken
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session',
      })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: state.menu,
        type: 'session',
      })
    },
    SET_MENU_ALL: (state, menu) => {
      state.menuAll = menu
      setStore({
        name: 'menuAll',
        content: state.menuAll,
        type: 'session',
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStore({
        name: 'userInfo',
        content: state.userInfo,
        type: 'session',
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session',
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      setStore({
        name: 'roles',
        content: state.roles,
        type: 'session',
      })
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
      setStore({
        name: 'permissions',
        content: state.permissions,
        type: 'session',
      })
    },
  },
}
export default user
