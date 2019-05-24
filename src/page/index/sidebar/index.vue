<template>
  <div class="avue-sidebar" :style="{width: keyCollapse ? '' : '200px'}">
    <el-scrollbar style="height:calc(100vh - 60px);" native>
      <main-item :mainMenu="mainMenu" :collapse="keyCollapse"></main-item>
      <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
      <div class="sub-menu-wrapper" v-if="mainMenu.path === '/wel'">
        <el-menu default-active="-1" :collapse="keyCollapse">
          <el-menu-item :index="omenu.path" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)">
            <i :class="omenu.icon"></i>
            <span slot="title">{{omenu.label}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainItem from './MainItem'
import sidebarItem from './sidebarItem'
import displayMixins from '@/mixins/displayMixins'
export default {
  mixins: [displayMixins],
  name: 'Sidebar',
  components: { sidebarItem, MainItem },
  computed: {
    ...mapGetters(['website', 'menu', 'mainMenu', 'otherMenus', 'menusMap', 'screen']),
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    ...mapMutations({ setMainMenu: 'SET_MAINMENU', setOtherMenus: 'SET_OTHERMENUS', setmenusMap: 'SET_menusMap' }),
    openModuleMenus (menu) {
      function findMenuChidrenPath (cMenu) {
        if (cMenu.children.length) {
          return findMenuChidrenPath(cMenu.children[0])
        } else {
          return cMenu.path
        }
      }
      this.$router.push({
        path: findMenuChidrenPath(menu),
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.sub-menu-wrapper {
  border-top: 1px solid #eee;
  .el-menu-item {
    margin-left: 0 !important;
    height: 40px;
    line-height: 40px;
    border-left: 3px solid #fafafa;
    &:hover,
    &:focus {
      border-color: #cb3737;
      background: #f9eae7;
      color: #cb3737;
    }
  }
  .sub-menu {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    white-space: nowrap;
    list-style: none;
    background-color: #fafafa;
    color: #666;
    padding: 0 20px;
    cursor: pointer;
    & * {
      vertical-align: middle;
    }
    &:hover {
      background-color: #f9eae7;
      color: #fb4147;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-menu {
  background-color: #fafafa;
}
</style>
<style lang="css" scoped>
.avue-sidebar >>> .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-sidebar >>> .el-submenu .el-submenu__title {
  border-left: 3px solid #fafafa;
}
.avue-sidebar >>> .el-submenu .el-submenu__title:focus,
.avue-sidebar >>> .el-menu--collapse .el-submenu.is-active .el-submenu__title,
.avue-sidebar >>> .el-submenu .el-submenu__title:hover {
  margin-left: 0 !important;
  border-color: #cb3737;
  background-color: #f9eae7;
  color: #cb3737;
}
.avue-sidebar >>> .el-submenu .el-submenu__title,
.avue-sidebar >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.avue-sidebar >>> .el-menu {
  border-right: none;
}
</style>
