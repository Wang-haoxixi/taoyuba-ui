import { getStore, setStore } from '@/util/store'
import { GetMenu } from '@/api/admin/menu'
import website from '@/const/website'
import { isURL } from '@/util/validate'
import keyBy from 'lodash/keyBy'
import { deepClone } from '@/util/util'

function addPath (ele, first) {
  const propsConfig = website.menu.props
  const propsDefault = {
    name: propsConfig.name || 'name',
    label: propsConfig.label || 'label',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children',
  }
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild && first) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    return
  }
  ele[propsDefault.children].forEach(child => {
    child[propsDefault.name] = `${child[propsDefault.name]}-${ele[propsDefault.name]}`
    if (!isURL(child[propsDefault.path])) {
      child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
    }
    addPath(child)
  })
}

function detachMenu (menu) {
  const menuPathList = menu.map(m => m.path)
  let mainMenu = {}
  const otherMenus = []
  for (const iterator of menu) {
    if (iterator.path === website.menu.firstMenu.modulePath) {
      mainMenu = deepClone(iterator)
    } else {
      otherMenus.push(iterator)
    }
  }
  const menusMap = keyBy(menu, 'path')
  return { mainMenu, otherMenus, menusMap, menuPathList }
}

const menu = {
  state: {
    menu: getStore({ name: 'menu' }) || [],
    mainMenu: getStore({ name: 'main_menu' }) || {},
    otherMenus: getStore({ name: 'other_menus' }) || [],
    menusMap: getStore({ name: 'menus_map' }) || {},
    menuPathList: getStore({ name: 'menu_path_list' }) || [],
  },
  actions: {
    // 获取系统菜单
    GetMenu ({ commit, state }) {
      commit('SET_MENUPATHLIST', [])
      return new Promise(resolve => {
        GetMenu().then(({ data }) => {
          let menu = deepClone(data.data)
          menu.forEach(ele => {
            addPath(ele)
          })
          commit('SET_MENU', menu)
          if (state.menuPathList.length === 0) {
            const { mainMenu, otherMenus, menusMap, menuPathList } = detachMenu(menu)
            commit('SET_MAINMENU', mainMenu)
            commit('SET_OTHERMENUS', otherMenus)
            commit('SET_MENUSMAP', menusMap)
            commit('SET_MENUPATHLIST', menuPathList)
          }
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: menu,
        type: 'session',
      })
    },
    SET_MENUSMAP: (state, menusMap) => {
      state.menusMap = menusMap
      setStore({
        name: 'menus_map',
        content: menusMap,
        type: 'session',
      })
    },
    SET_OTHERMENUS: (state, otherMenus) => {
      state.otherMenus = otherMenus
      setStore({
        name: 'other_menus',
        content: otherMenus,
        type: 'session',
      })
    },
    SET_MAINMENU: (state, mainMenu) => {
      state.mainMenu = mainMenu
      setStore({
        name: 'main_menu',
        content: mainMenu,
        type: 'session',
      })
    },
    SET_MENUPATHLIST: (state, menuPathList) => {
      state.menuPathList = menuPathList
      setStore({
        name: 'menu_path_list',
        content: menuPathList,
        type: 'session',
      })
    },
  },
}

export default menu