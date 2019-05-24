import { getStore, setStore } from '@/util/store'
import { getUserInfo, loginByMobile, loginBySocial, loginByUsername, logout, refreshToken } from '@/api/login'
import { encryption } from '@/util/util'

const user = {
  state: {
    userInfo: {},
    permissions: {},
    roles: [],
    orgs: [],
    keep_login_token: getStore({ name: 'keep_login_token' }) || {
      is_keep_login: false,
      access_token: '',
      refresh_token: '',
      expires_in: '',
    },
    expires_in: getStore({ name: 'expires_in' }) || '',
    access_token: getStore({ name: 'access_token' }) || '',
    refresh_token: getStore({ name: 'refresh_token'  }) || '',
  },
  actions: {
    // 根据之前保持登陆记录
    LoginByLocalStorage ({commit, state}) {
      const { keep_login_token } = state
      if (keep_login_token.is_keep_login) {
        commit('SET_ACCESS_TOKEN', keep_login_token.access_token)
        commit('SET_REFRESH_TOKEN', keep_login_token.refresh_token)
        commit('SET_EXPIRES_IN', keep_login_token.expires_in)
        commit('SET_MENU', [])
        commit('SET_MAINMENU', {})
        commit('SET_OTHERMENUS', [])
        commit('SET_MENUSMAP', {})
        commit('SET_MENUPATHLIST', [])
        commit('CLEAR_LOCK')
        return true
      } else {
        return false
      }
    },
    // 根据用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'gdscloudprisbest',
        param: ['password'],
      })
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await loginByUsername(user.username, user.password, user.code, user.randomStr)
          if (user.isKeepLogin) {
            commit('SET_KEEP_LOGIN_TOKEN', {
              is_keep_login: true,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              expires_in: data.expires_in,
            })
          }
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('SET_MENU', [])
          commit('SET_MAINMENU', {})
          commit('SET_OTHERMENUS', [])
          commit('SET_MENUSMAP', {})
          commit('SET_MENUPATHLIST', [])
          commit('CLEAR_LOCK')
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
    // 根据手机号登录
    LoginByPhone ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo.mobile, userInfo.code)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 根据OpenId登录
    LoginBySocial ({ commit }, param) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            const realData = data.data || {}
            commit('SET_USERIFNO', realData.sysUser)
            commit('SET_ROLES', realData.roles || [])
            commit('SET_PERMISSIONS', realData.permissions || [])
            commit('SET_ORGS', realData.orgs || [])
            resolve(realData)
          })
          .catch(() => {
            reject()
          })
      })
    },
    // 刷新token
    RefreshToken ({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refresh_token)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_MENU', [])
            commit('SET_MAINMENU', {})
            commit('SET_OTHERMENUS', [])
            commit('SET_MENUSMAP', {})
            commit('SET_MENUPATHLIST', [])
            commit('SET_PERMISSIONS', [])
            commit('SET_ORGS', [])
            commit('SET_USER_INFO', {})
            commit('SET_ACCESS_TOKEN', '')
            commit('SET_KEEP_LOGIN_TOKEN', {})
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_EXPIRES_IN', '')
            commit('SET_ROLES', [])
            commit('DEL_ALL_TAG')
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_PERMISSIONS', [])
        commit('SET_ORGS', [])
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        commit('SET_MENU', [])
        commit('SET_MAINMENU', {})
        commit('SET_OTHERMENUS', [])
        commit('SET_MENUSMAP', {})
        commit('SET_MENUPATHLIST', [])
        resolve()
      })
    },
  },
  mutations: {
    SET_KEEP_LOGIN_TOKEN: (state, keep_login_token) => {
      state.keep_login_token = keep_login_token
      setStore({
        name: 'keep_login_token',
        content: state.keep_login_token,
      })
    },
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session',
      })
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in
      setStore({
        name: 'expires_in',
        content: state.expires_in,
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
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
    },
    SET_ORGS: (state, orgs) => {
      state.orgs = orgs
    },
  },
}
export default user
