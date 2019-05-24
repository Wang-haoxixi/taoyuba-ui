<template>
  <div class="top">
    <div class="top-left">
      <div class="logo-wrapper">
        <el-tooltip class="item" effect="dark" content="点击返回工作台" placement="bottom">
          <div class="logo" @click="$openPage('/')"></div>
        </el-tooltip>
        <a-dropdown>
          <a href="#">
            国脉智慧平台
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item v-for="(v, i) in collectWebsite" :key="i" @click="$openPage(v.url, 'url')">
              {{v.name}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="top-center">
      <top-navbar></top-navbar>
    </div>
    <div class="top-right">
      <top-search-icon></top-search-icon>
      <top-guide></top-guide>
      <top-message></top-message>
      <top-user></top-user>
    </div>
  </div>
</template>
<script>
import website from '@/const/website'
import TopNavbar from './TopNavbar'
import TopMessage from './TopMessage'
import TopGuide from './TopGuide'
import TopSearchIcon from './TopSearchIcon'
import TopUser from './TopUser'
export default {
  components: {
    TopNavbar,
    TopMessage,
    TopSearchIcon,
    TopGuide,
    TopUser,
  },
  name: 'Top',
  data () {
    return {
      collectWebsite: website.collectWebsite,
    }
  },
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .top-left {
    display: flex;
    margin-left: 20px;
    .logo-wrapper {
      margin: 13px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      .logo {
        cursor: pointer;
        margin-right: 10px;
        width: 76px;
        height: 32px;
        background-image: url("/img/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .top-right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
