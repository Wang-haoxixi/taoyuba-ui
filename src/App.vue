<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { deviceEnquire, DEVICE_TYPE } from '@/util/device'
export default {
  name: 'App',
  data () {
    return {
      locale: zhCN,
    }
  },
  mounted () {
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          this.toggleDevice('desktop')
          this.setSidebar(true)
          break
        case DEVICE_TYPE.TABLET:
          this.toggleDevice('tablet')
          this.setSidebar(false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          this.toggleDevice('mobile')
          this.setSidebar(true)
          break
      }
    })
  },
  methods: {
    ...mapActions(['setSidebar']),
    ...mapMutations({ toggleDevice: 'TOGGLE_DEVICE' }),
  },
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
