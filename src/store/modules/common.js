import {
  setStore,
  getStore,
} from '@/util/store'
import website from '@/config/website'
const common = {
  state: {
    isCollapse: false,
    isFullScren: false,
    theme: getStore({
      name: 'theme',
    }) || '#409EFF',
    themeName: getStore({
      name: 'themeName',
    }) || 'theme1',
    website: website,
  },
  actions: {
  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULLSCREN: (state) => {
      state.isFullScren = !state.isFullScren
    },
    SET_THEME: (state, color) => {
      state.theme = color
      setStore({
        name: 'theme',
        content: state.theme,
      })
    },
    SET_THEME_NAME: (state, themeName) => {
      state.themeName = themeName
      setStore({
        name: 'themeName',
        content: state.themeName,
      })
    },
  },
}
export default common
