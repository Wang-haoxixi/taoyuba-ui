import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'prodection'
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
  },
  getters,
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})

export default store
