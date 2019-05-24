import { loadAllDictMap } from '@/api/admin/dict'
import { getUserPyList } from '@/api/admin/contacts'
import { getOneConfig } from '@/api/fams/config'
import { getStore, setStore } from '@/util/store'
import { pickDeep } from '@/util/util'
import keyBy from 'lodash/keyBy'
const cache = {
  state: {
    dictGroup: getStore({ name: 'dictGroup' }) || {},
    contactsPyGroup: getStore({ name: 'contactsPyGroup' }) || {},
    famsConfig: getStore({ name: 'famsConfig' }) || {},
  },
  actions: {
    // 获取财务配置
    LoadFamsConfig ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        getOneConfig().then(res => {
          const { data } = res
          commit('SET_FAMS_CONFIG', data.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取通讯录
    LoadContactsPyGroup ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        getUserPyList().then(res => {
          const { data } = res
          commit('SET_CONTACTS_PY_GROUP', keyBy(data.data, 'id'))
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取全部字典
    LoadAllDictMap ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        loadAllDictMap().then(res => {
          const { data } = res
          commit('SET_DICT_ALL', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  mutations: {
    SET_DICT_ALL: (state, dictGroup) => {
      for (const key in dictGroup) {
        if (dictGroup.hasOwnProperty(key)) {
          const element = dictGroup[key]
          dictGroup[key] = pickDeep(element)
        }
      }
      state.dictGroup = dictGroup
      setStore({
        name: 'dictGroup',
        content: state.dictGroup,
        type: 'session',
      })
    },
    SET_CONTACTS_PY_GROUP: (state, contactsPyGroup) => {
      state.contactsPyGroup = contactsPyGroup
      setStore({
        name: 'contactsPyGroup',
        content: contactsPyGroup,
        type: 'session',
      })
    },
    SET_FAMS_CONFIG: (state, famsConfig) => {
      state.famsConfig = famsConfig
      setStore({
        name: 'famsConfig',
        content: famsConfig,
        type: 'session',
      })
    },
  },
  
}

export default cache