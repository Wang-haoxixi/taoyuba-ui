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
    // 监听窗口是否发生变化
    window.addEventListener('resize', ()=>{
      const changeSize = setInterval(()=>{
        this.$root.$emit('resize', true)
        clearInterval(changeSize)
      },1000)
    })
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
<style>
.el-menu-item:hover{
  border-color: #0185d8!important;
}
.el-range-separator {
  width: 40px!important;
}
  .el-cascader-panel {
    min-height: 200px;
  }
</style>
