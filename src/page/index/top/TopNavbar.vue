<template>
  <div class="nav">
    <div class="navbar">
      <el-menu ref="navMenu" v-if="keyCollapse" class="menu-collapse" :default-active="activeIndex" mode="horizontal" menu-trigger="click" router>
        <el-submenu index="">
          <template slot="title">导航</template>
          <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id"><span class="sub-menu">{{item.name}}</span></el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu ref="navMenu" v-else :default-active="activeIndex" mode="horizontal" router>
        <!-- <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id" :class="item.show">
          <span class="sub-menu" @mouseenter="menuItemEnter(item)">{{item.name}}</span>
          <resource-con ref="resource" class="sub-nav-menu" v-if="item.show=='show'"></resource-con>
        </el-menu-item> -->
        <el-menu-item>
          <span class="sub-menu" @click="open(name='index')">首页</span>
        </el-menu-item>
        <!-- <el-menu-item v-if="roles.indexOf(111) !== -1 || roles.indexOf(112) !== -1 || roles.indexOf(1) !== -1">
          <span class="sub-menu" @click="open(name='ship')">渔船</span>
        </el-menu-item> -->
        <el-menu-item  v-if="roles.indexOf(111) !== -1 || roles.indexOf(112) !== -1 || roles.indexOf(1) !== -1">
          <span class="sub-menu" @click="open(name='crew')">船员</span>
        </el-menu-item>
        <el-menu-item  v-if="roles.indexOf(111) !== -1 || roles.indexOf(1) !== -1">
          <span class="sub-menu" @click="open(name='fish')">船东</span>
        </el-menu-item>
        <el-menu-item v-if="roles.indexOf(111) !== -1 || roles.indexOf(112) !== -1 || roles.indexOf(1) !== -1">
          <span class="sub-menu" @click="open(name='standing')">一船一档</span>
        </el-menu-item>
        <el-menu-item v-if="roles.indexOf(111) !== -1 || roles.indexOf(112) !== -1 || roles.indexOf(1) !== -1 || roles.indexOf(109) !== -1">
          <span class="sub-menu" @click="open(name='htgl')">合同</span>
        </el-menu-item>
        <el-menu-item v-if="roles.indexOf(111) !== -1 || roles.indexOf(108) !== -1 || roles.indexOf(1) !== -1">
          <span class="sub-menu" @click="open(name='recruit')">招聘</span>
        </el-menu-item>
        <el-menu-item v-if="roles.indexOf(1) > -1 || roles.indexOf(111) > -1" style="display:none">
          <!-- <router-link class="sub-menu" to="/dataStatistics" target="_blank">大数据墙</router-link> -->
          <span class="sub-menu" @click="open('dataStatistics')">大数据墙</span>
        </el-menu-item>
        <!-- <el-menu-item v-if="roles.indexOf(1) > -1 || roles.indexOf(111) > -1">
          <span class="sub-menu" @click="open('oneStatistics')">一地数据墙</span>
        </el-menu-item> -->
      </el-menu>
      <!-- <div class="search-con">
        <top-search class="search-con-input" :style="{top: isTop}" :class="{inactive:!isShow }">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          <el-button type="primary" size="small" @click="handleInput">确定</el-button>
        </top-search>
        <i class="el-icon-search btn-search" @click="handleInput"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
// import TopSearch from './TopSearch'
import displayMixins from '@/mixins/displayMixins'
import { mapGetters } from 'vuex'
// import ResourceCon from './ResourceCon'
import { navList, navPathList } from '@/router/app/navList.js'
export default {
  // components: { ResourceCon },
  mixins: [displayMixins],
  data () {
    return {
      isShow: false,
      navList,
    }
  },
  created (){
    console.log('123..', this.$route.matched)
  },
  // components: { TopSearch },
  methods: {
    handleInput () {
      this.isShow = !this.isShow
    },
    menuItemEnter (row) {
      if (row.id == '/app/resource') {
        this.$nextTick(() => {
          this.$refs['resource'][0].getCount()
        })
      }
    },
    open (name) {
      // console.log(name)
      if(name === 'index') {
        this.$router.push({ path: '/' })
        // window.open('https://www.taoyu58.com/')
      }
      if(name === 'ship') {
        this.$router.push({ path:'/ships/manage' })
        // window.open('https://www.taoyu58.com/ship/index.html')
      }
      if(name === 'crew') {
        this.$router.push({ path: '/crew/smdj/boatMan'})
        // window.open('https://www.taoyu58.com/crew/index.html')
      }
      if(name === 'fish') {
        this.$router.push({ path: '/admin/list' })
        // window.open('https://www.taoyu58.com/fish/index.html')
      }
      if(name === 'standing') {
        this.$router.push({ path: '/account/standing' })
        // window.open('https://www.taoyu58.com/mall/index.html')
      }
      if(name === 'htgl') {
        this.$router.push({ path: '/tmlms_spa/contract_list' })
        // window.open('https://www.taoyu58.com/article/index.html')
      }
      if(name === 'recruit') {
        this.$router.push({ path: '/hrms_spa/recruit_list' })
        // window.open('https://www.taoyu58.com/article/index.html')
      }
      if (name === 'dataStatistics') {
        const { href } = this.$router.resolve({
          name: 'dataStatistics',
        })
        // console.log('href', href)
        window.open(href, '_blank')
      }
      if (name === 'oneStatistics') {
        const { href } = this.$router.resolve({
          name: 'oneStatistics',
        })
        // console.log('href', href)
        window.open(href, '_blank')
      }
    },
  },
  computed: {
    ...mapGetters(['roles']),
    activeIndex () {
      const matchedPath = this.$route.matched[1].path
      if (navPathList.includes(matchedPath)) {
        return matchedPath
      }
      return ''
    },
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
  },
  watch: {
    'activeIndex': function (n) {
      this.$refs['navMenu'].activeIndex = n
    },
  },
}
</script>

<style lang="scss" scoped>
.sub-nav-menu {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 0;
  overflow: hidden;
  left: 0;
  top: 60px;
  background: rgba(252, 252, 252, 0.99);
  box-shadow: 1px 1px 3px #ccc;
  box-sizing: border-box;
  transition: all 0.5s;
}
.nav {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #444;
  .navbar {
    display: flex;
    height: 60px;
    .el-menu,
    .el-menu-item {
      position: inherit;
      color: #444;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-menu-item:hover {
      border: 0;
      .sub-menu {
        border-radius: 20px;
        background-color: #eee;
        // color: #4480F8;
      }
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-menu-item {
      padding: 0 10px;
      border: 0;
      .sub-menu {
        padding: 4px 15px;
        // padding: 16px 26px;
        transition: all 0.5s;
        font-size: 14px;
        .nav-bar {
          display: flex;
          margin: 0 20px;
          transition: all 0.5s;
          justify-content: center;
        }
      }
    }
    .el-select {
      line-height: 60px;
    }
    .search-con {
      position: relative;
      margin-left: 10px;
      .search-con-input {
        position: absolute;
        right: -150px;
        width: 300px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0px 0px 1px 2px #eee;
        transition: all 0.5s;
      }
      .btn-search {
        margin-left: 10px;
        font-size: 20px;
        line-height: 60px;
        cursor: pointer;
        transition: all 0.5s;
        &:hover,
        &:focus {
          color: #999;
        }
      }
    }
    .showItem {
      display: none;
    }

    .search {
      padding: 0 20px;
      color: #444;
    }
    .el-select {
      width: 260px !important;
      padding: 0 20px 0 30px;
    }
  }
}
.show {
  &:hover .sub-nav-menu {
    height: 132px;
  }
}
</style>
<style lang="css" scoped>
.nav >>> .el-submenu.is-active .el-submenu__title {
  height: 59px;
  border: none;
}
.nav >>> .el-select .el-input__suffix {
  right: 15px;
}
.search-con >>> .el-input {
  padding: 10px;
  box-sizing: border-box;
}
.navbar >>> .el-range-editor.is-active .el-input__inner,
.navbar >>> .el-range-editor.is-active:hover .el-input__inner,
.navbar >>> .el-range-editor:focus .el-input__inner,
.navbar >>> .el-select .el-input.is-focus .el-input__inner,
.navbar >>> .el-select .el-input__inner:focus,
.navbar >>> .el-input__inner:hover,
.navbar >>> .el-input__inner:focus {
  border-color: #c0c4cc;
}
</style>
