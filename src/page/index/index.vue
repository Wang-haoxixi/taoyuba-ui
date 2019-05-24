<template>
  <el-container class="avue-contail">
    <el-header height="auto" class="avue-tabs">
      <!-- 顶部导航栏 -->
      <top />
    </el-header>
    <el-container class="body-container">
      <el-aside :style="{ width: isCollapse ? asideWidthCollapse : asideWidth }" class="aside-container">
        <!-- 左侧导航栏 -->
        <sidebar class="avue-sidebar"></sidebar>
      </el-aside>
      <div class="main-container">
        <el-main class="avue-main">
          <!-- 顶部标签卡 -->
          <tags class="tag-wrapper"/>
          <!-- 主体视图层 -->
          <router-view class="avue-view"/>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import tags from './tags'
// import myAnimationPanel from './animation'
import top from './top/'
import sidebar from './sidebar/'
import { setTheme } from '@/util/util'
export default {
  components: { top, tags, sidebar },
  name: 'index',
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '256px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      // 刷新token锁
      refreshLock: false,
    }
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      vm.mainMenu = to.matched[0].name
    })
  },
  beforeRouteUpdate (to, from, next) {
    next(vm => {
      vm.mainMenu = to.matched[0].name
    })
  },
  created () {
    this.getCurrentMenu()
  },
  mounted () {
    setTheme(this.themeName)
    this.$store.dispatch('GetDepartmentList')
  },
  computed: {
    ...mapGetters(['isCollapse', 'website', 'menuAll', 'themeName']),
    mainMenu: {
      get () { return this.activeMainMenu },
      set (val) { this.$store.commit('SET_ACTIVE_MAIN_MENU', val) },
    },
  },
  props: [],
  methods: {
    ...mapMutations([
      'SET_MENU',
    ]),
    getCurrentMenu () {
      const name = this.$route.matched[0].name
      this.menuAll.forEach((menu) => {
        if (menu.name === name) {
          this.$store.commit('SET_MENU', menu.children)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.body-container {
  height: calc(100vh - 65px);
  background-color: #eee;
}
.avue-sidebar {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  width: 256px;
}
.avue-tabs {
  padding: 0;
  z-index: 1;
}
.avue-main {
  height: calc(100vh - 46px);
  background-color: #eee;
  position: relative;
  padding: 0;
  overflow-x: hidden;
}
.aside-container {
  overflow-x: hidden;
}
.avue-contail /deep/ .el-aside {
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  padding: 0;
}
.avue-contail /deep/ .el-aside::-webkit-scrollbar {
  display: none;
}
.avue-view {
  margin-top: 46px;
}
// .avue-view {
//   position: absolute;
//   top: 60px;
//   height: 100vh;
//   width: 100%;
//   box-sizing: border-box;
//   z-index: 1000;
// }
// .basic-container>.avue-view {
//   height: 100%;
//   .el-card__body {
//     height: 100%;
//   }
// }
.main-container {
  width: 100%;
}
.tag-wrapper {
  position: fixed;
  top: 64px;
  left: 256px;
  right: 0;
}
</style>
