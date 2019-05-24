<template>
  <div class="top clearfix">
    <p class="subtitle">{{website.subTitle}}</p>
    <div class="top-wrapper wrapper-left clearfix">
      <router-link tag="div" :to="{path: '/'}" class="nav-wrapper title-logo pull-left">
        <h1 class="top-title">
          <img class="logoImg" src="/img/logo.png" width="30"/> {{website.title}}
        </h1>
      </router-link>
      <div class="nav-wrapper pull-left" v-if="mainMenuShow">
        <top-main-menu/>
      </div>
    </div>
    <div class="top-wrapper wrapper-right clearfix">
      <div class="nav-wrapper  pull-left">
        <el-tooltip class="item"
          effect="dark"
          :content="isFullScren ? '退出全屏' : '全屏' "
          placement="bottom">
          <span class="top-item">
            <i class="iconfont"
              :class="isFullScren ? 'icon-suoxiao' : 'icon-icon--' "
              @click="handleScreen"></i>
          </span>
        </el-tooltip>
      </div>
      <div class="nav-wrapper  pull-left">
        <top-notice/>
      </div>
      <div class="nav-wrapper  pull-left">
        <top-question/>
      </div>
      <div class="nav-wrapper  pull-left">
        <top-setting/>
      </div>
      <div class="nav-wrapper  pull-left">
        <top-menu/>
      </div>
    </div>
  </div>
</template>
<script>
import { fullscreenToggel } from "@/util/util"
import { mapGetters } from 'vuex'
import topMenu from './top-menu'
import topMainMenu from './top-main-menu'
import topNotice from './top-notice'
import topQuestion from './top-question'
import topSetting from './top-setting'

export default {
  components: { topMainMenu, topNotice, topMenu, topQuestion, topSetting },
  name: 'top',
  props: {
    mainMenuShow: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      isFullScren: false,
      infoNum: '',
    }
  },
  computed: {
    ...mapGetters([
      'website',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag',
    ]),
  },
  methods: {
    open (url) {
      this.$router.push({
        path: url,
      })
    },
    imageLoadError (thisImg) {
      this.$message({
        showClose: true,
        message: '头像加载失败, 使用默认头像',
        type: 'warning',
      })
      thisImg.target.src = '/img/onerror-avatar.png'
    },
    handleScreen () {
      this.isFullScren = !this.isFullScren
      fullscreenToggel()
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  // justify-content: space-between;
  // align-items: center;
  position: relative;
  .wrapper-left {
    position: absolute;
    top: 0;
    left: 0px;
  }
  .wrapper-right {
    position: absolute;
    top: 0;
    right: 10px;
  }
  .subtitle {
    position: absolute;
    line-height: 64px;
    color: #999;
    left: 50%;
    top: 0;
    margin-left: -30px;
  }
  .top-wrapper {
    height: 100%;
    .title-logo {
      display: block;
      .top-title {
        margin-left: 10px;
        font-size: 18px;
        line-height: 60px;
        .logoImg{
          height: auto;
          vertical-align: -5px;
        }
      }
    }
  }
  .nav-wrapper {
    cursor: pointer;
    transition: all 0.5s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 12px 0 8px;
    &:hover {
      color: #00AAFF;
    }
    .search {
      padding: 0;
      margin: 0 12px;
      &:hover {
        background: transparent;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
    .navicon-box {
      font-size: 17px !important;
      padding: 6px 8px;
      color: #fff;
      border-radius: 5px;
      background: #2f4050;
      cursor: pointer;
    }
    .top-userImg {
      margin: 0 8px 0 10px;
      padding: 2px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #eee;
    }
    .el-dropdown {
      margin-right: 10px;
    }
  }
}
.about {
  text-align: left;
  padding-left: 20px;
  line-height: 26px;
  font-size: 16px;
  p {
    margin-left: 5px;
    margin-top: 5px;
  }
}
.el-icon--right {
  margin-left: 0px;
}
</style>
