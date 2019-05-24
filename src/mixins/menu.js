import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'SET_MENU',
      'SET_ACTIVE_MAIN_MENU',
    ]),
    setCurrentMenu (menus, name) {
      menus.forEach((item) => {
        // if ('shujukeshi' === name){
        //   this.$router.push('/lookdata')
        //   return
        // }
        if (name === item.name) {
          if (!item.redirectUrl.indexOf('myiframe')) {
            this.$router.push({name: item.name})
          } else {
            this.$router.push({path: item.redirectUrl || item.path})
          }
          // this.$router.push({name: name})
          this.$store.commit('SET_MENU', item.children)
          return false
        }
      })
    },
  },
}
