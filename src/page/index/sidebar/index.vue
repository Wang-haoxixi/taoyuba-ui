<template>
  <div class="avue-sidebar" :style="{width: keyCollapse ? '' : '240px'}">
    <el-scrollbar style="height:100vh" native>
      <!-- <main-item :mainMenu="mainMenu" :collapse="keyCollapse"></main-item>
      <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item> -->
      <div class="sub-menu-wrapper">
        <!-- <el-tooltip class="item" effect="dark" content="点击返回工作台" placement="bottom"> -->
        <div class="aside-logo" title="点击返回工作台" style="cursor: pointer;" @click="$openPage('/')">
          <el-image class="logo" src='/img/bg/loginLogo.png'></el-image>
          淘渔吧
        </div>
        <!-- </el-tooltip> -->
        <el-menu default-active="-1" :collapse="keyCollapse" :unique-opened="unique">
          <!-- <el-menu-item :index="omenu.path" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)">
            <i :class="omenu.icon"></i>
            <span slot="title">{{omenu.label}}</span>
          </el-menu-item> -->
          <el-submenu :index="omenu.path" v-for="omenu in allMenus" :key="omenu.path">
            <template slot="title">
              <i :class="omenu.icon"></i>
              <span slot="title">{{omenu.label}}</span>
            </template> 
            <div :index="child.path" v-for="child in omenu.children" :key="child.path">
              <div v-for="(item, index) in oneList" :key="index">
                <el-submenu :index="child.path"  v-if="child.id === item">
                  <span slot="title">{{child.label}}</span>
                  <el-menu-item-group>
                    <el-menu-item :index="childone.path" v-for="childone in child.children" :key="childone.path"  @click="goTo(childone)">{{childone.label}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
              <div v-for="(items, index) in secondList" :key="index + 10000">
                 <el-menu-item v-if="child.id === items.id" @click="goTo(items)">{{items.label}}</el-menu-item>
              </div>
            </div>
          </el-submenu>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import MainItem from './MainItem'
// import sidebarItem from './sidebarItem'
import displayMixins from '@/mixins/displayMixins'
export default {
  mixins: [displayMixins],
  name: 'Sidebar',
  // components: { sidebarItem, MainItem },
  data () {
    return {
      oneList: [],
      secondList: [],
      unique: true,
    }
  },
  computed: {
    ...mapGetters(['website', 'menu', 'mainMenu', 'otherMenus', 'menusMap', 'screen', 'allMenus']),
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
  },
  created () {
    this.isMenu()
    console.log('allMenus..', this.allMenus)
  },
  methods: {
    ...mapMutations({ setMainMenu: 'SET_MAINMENU', setOtherMenus: 'SET_OTHERMENUS', setAllMenus: 'SET_ALLMENUS', setmenusMap: 'SET_menusMap' }),
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
    isMenu () {
      this.allMenus.forEach(v => {
        v.children.forEach(m => {
          if (m.children.length > 0) {
            this.oneList.push(m.id)
          } else {
            let cont = {id: m.id, label: m.label, path: m.path}
            this.secondList.push(cont)
          }
        })
      })
    },
    goTo (val) {
      if (val.path !== this.$route.path) {
        sessionStorage.removeItem('query')
      }
      this.$router.push({
        path: val.path,
      })
      this.$emit('tabList', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.sub-menu-wrapper {
  // margin: 0 16px;
  border-top: 1px solid #eee;
  .aside-logo{
    height: 80px;
    font-size: 16px;
    color: #FFFFFF;
    font-family: MicrosoftYaHei;
    display: flex;
    align-items: center;
    .logo{
      width: 37px;
      margin: 0px 7px 0px 24px;
      border-radius: 17px;
    }
  }
  .el-menu-item {
    margin-left: 0 !important;
    height: 40px;
    color: #FFFFFF;
    font-size: 12px;
    border-radius: 40px;
    // line-height: 40px;
    // border-left: 3px solid #fafafa;
    &:hover,
    &:focus {
      // border-color: #0185d8;
      // color: #0185d8;
      background: rgba(255, 255, 255, .1);
      border-radius: 40px;
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
      color: #fb4147;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-menu {
  // background-color: #fafafa;
  background-color:transparent;
  padding: 0 16px;
}
</style>
<style lang="css" scoped>
.avue-sidebar >>> .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-sidebar >>> .el-submenu .el-submenu__title {
  /* border-left: 3px solid #fafafa; */
  color: #FFFFFF;
  font-size: 12px;
  border-radius: 40px;
}
.avue-sidebar >>> .el-submenu .el-submenu__title:focus,
.avue-sidebar >>> .el-menu--collapse .el-submenu.is-active .el-submenu__title,
.avue-sidebar >>> .el-submenu .el-submenu__title:hover {
  margin-left: 0 !important;
  /* border-color: #0185d8;
  color: #0185d8; */
  background: rgba(255, 255, 255, .1);
  border-radius: 40px;
}
.avue-sidebar >>> .el-submenu .el-submenu__title,
.avue-sidebar >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.avue-sidebar >>> .el-menu {
  border-right: none;
  background: transparent;
}
</style>
