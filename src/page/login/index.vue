<template>
  <!-- <container title="用户登录">
    <template v-slot:tab-panel>
      <user-login v-if="activeName === 'user'" @tab-active="handleActive"></user-login>
      <code-login v-if="activeName === 'code'"></code-login>
      <third-login v-if="activeName === 'third'"></third-login>
      <retrieve v-if="activeName === 'retrieve'" @tab-active="handleActive"></retrieve>
    </template>
  </container> -->
  <div class="container">
    <div class="loginWrap">
      <div class="loginWrapContainer">
        <div class="loginWrapContainerTop">
          <img src="../../../public/img/bg/loginLogo.png" alt="" srcset="" class="loginWrapContainerTopLogo">
          <div class="loginWrapContainerTopTitle">
            淘渔吧用户登陆
          </div>
          <div class="loginWrapContainerTopLine">
          </div>
          <user-login v-if="activeName === 'user'" @tab-active="handleActive"></user-login>
          <code-login v-if="activeName === 'code'"></code-login>
        </div>
         <div class="loginWrapContainerFooter">
           Copyright©TAOYU58 版权所有 2018-2020
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Container from '../Container'
import userLogin from './userlogin'
import codeLogin from './codelogin'
// import thirdLogin from './thirdlogin'
// import retrieve from './retrieve'
import { setStore } from '@/util/store'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Login',
  components: {
    // Container,
    userLogin,
    codeLogin,
    // thirdLogin,
    // retrieve,
  },
  data () {
    return {
      active: 1,
      activeName: 'user',
    }
  },
  computed: {
    ...mapGetters(['website']),
  },
  watch: {
    $route () {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: '登录中,请稍后。。。',
          spinner: 'el-icon-loading',
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        this.handleSocialLogin()
      }
    },
  },
  created () {
    setStore({ name: 'tenantId', content: 1 })
  },
  methods: {
    handleActive (name) {
      this.activeName = name
    },
  },
}
</script>
<style lang="scss" scoped>
.container{
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('../../../public/img/bg/loginBg.png') no-repeat;
  background-size: 100% 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-position:-230px center;
  .loginWrap{
    width: 50%;
    height: 100vh;
    background: url('../../../public/img/bg/loginBgWhite.png') no-repeat;
    background-size: 100% 100vh;
    .loginWrapContainer{
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      .loginWrapContainerTop{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 137px;
        .loginWrapContainerTopLogo{
          width: 136px;
          height: 123px;
          margin-bottom: 8px;
        }
        .loginWrapContainerTopTitle{
          color: #333333;
          font-size: 24px;
          line-height: 40px;
          margin-bottom: 10px;
        }
        .loginWrapContainerTopLine{
          width: 60px;
          height: 8px;
          background: rgba(68, 128, 248, 0.26);
          opacity: 1;
          border-radius: 10px;
          margin-bottom: 60px;
        }
      }
      .loginWrapContainerFooter{
        font-size: 14px;
        line-height: 40px;
        color: #4480F8;
        margin-bottom: 27px;
      }
    }
  }
}
</style>
