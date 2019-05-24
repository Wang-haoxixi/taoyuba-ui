import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import cache from './modules/cache'
import common from './modules/common'
import app from './modules/app'
import tags from './modules/tags'
import fams from './modules/fams'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu,
    cache,
    common,
    tags,
    fams,
  },
  getters,
})

export default store
