import { getStore, removeStore, setStore } from '@/util/store'
import website from '@/const/website'

const common = {
  state: {
    isCollapse: false,
    screen: -1,
    isWelcome: getStore({ name: 'isWelcome' }) || false,
    isLock: getStore({ name: 'isLock' }) || false,
    showCollapse: getStore({ name: 'showCollapse' }) || false,
    showSearch: getStore({ name: 'showSearch' }) || false,
    showLock: getStore({ name: 'showLock' }) || false,
    showMenu: getStore({ name: 'showMenu' }) || false,
    lockPasswd: getStore({ name: 'lockPasswd' }) || '',
    website: website,
  },
  actions: {},
  mutations: {
    SET_WELCOME: state => {
      state.isWelcome = !state.isWelcome
      setStore({
        name: 'isWelcome',
        content: state.isWelcome,
      })
    },
    SET_COLLAPSE: state => {
      state.isCollapse = !state.isCollapse
    },
    SET_SHOWCOLLAPSE: (state, active) => {
      state.showCollapse = active
      setStore({
        name: 'showCollapse',
        content: state.showCollapse,
      })
    },
    SET_SHOWMENU: (state, active) => {
      state.showMenu = active
      setStore({
        name: 'showMenu',
        content: state.showMenu,
      })
    },
    SET_SHOWLOCK: (state, active) => {
      state.showLock = active
      setStore({
        name: 'showLock',
        content: state.showLock,
      })
    },
    SET_SHOWSEARCH: (state, active) => {
      state.showSearch = active
      setStore({
        name: 'showSearch',
        content: state.showSearch,
      })
    },
    SET_LOCK: state => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session',
      })
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session',
      })
    },
    CLEAR_LOCK: state => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd',
      })
      removeStore({
        name: 'isLock',
      })
    },
  },
}
export default common
