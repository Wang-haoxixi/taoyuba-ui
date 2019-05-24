import { getTotal } from '@/api/fams/total'
const fams = {
  state: {
    rewardDialogShow: false,
    withdrawableCash: 0,
  },
  mutations: {
    SET_REWARD_DIALOG_SHOW: (state, rewardDialogShow) => {
      state.rewardDialogShow = rewardDialogShow
    },
    SET_WITHDRAWABLE_CASH: (state, withdrawableCash) => {
      state.withdrawableCash = withdrawableCash
    },
  },
  actions: {
    famsReward ({ commit }) {
      getTotal().then(({data}) => {
        if (data.data) {
          commit('SET_WITHDRAWABLE_CASH', data.data.withdrawableCash)
          commit('SET_REWARD_DIALOG_SHOW', true)
        }
      })
    },
  },
}

export default fams