<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin" v-once>
    <div class="login-info text-white animated fadeInLeft">
      <h2 class="login-info-title text-white"><img src="/img/logo-white.png" alt="国脉集团" class="web-logo"><span class="title">{{website.title}}</span></h2>
      <h3 class="slogan">为数据管理赋权, 数据应用赋能, 数据资产赋值</h3>
    </div>
    <div class="login-border animated fadeInRight login-wrapper">
      <div class="login-main">
        <h3 class="login-title">欢迎登录</h3>
        <user-login/>
      </div>
      <div style="height: calc(100vh - 450px);position: relateive;">
        <footer class="footer">国脉集团   版权所有</footer>
      </div>
    </div>
  </div>
</template>
<script>
import { setTheme } from '@/util/util'
import userLogin from './userlogin'
import color from '@/mixins/color'
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  mixins: [color()],
  components: { userLogin },
  data () {
    return {
      activeName: 'user',
    }
  },
  computed: {
    ...mapGetters(['website', 'themeName']),
  },
  mounted () {
    setTheme(this.themeName)
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: calc(100vh);
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("/img/login-mainbg.jpg");
  background-size: cover;
  background-repeat:repeat-x;
}
.login-info {
  padding: 50px 0 0 50px;
  width: 70%;
  height: calc(100vh);
  float: left;
  background-image: url("/img/loginbg.jpg");
  background-size: cover;
  background-position: left center;
}
.login-info-title {
  line-height: 70px;
  .icon-logo {
    font-size: 30px;
    vertical-align: bottom;
    padding-right: 8px;
  }
  .web-logo {
    margin-right: 10px;
    // height: 18px;
    width: 25px;
    vertical-align: middle;
  }
  .title {
    vertical-align: inherit;
    font-size: 18px;
  }
}
.slogan {
  padding-top: 4%;
  font-size: 26px;
  text-align: center;
  color: #fff;
  letter-spacing: 3px;
}
.login-info-item {
  line-height: 24px;
  font-size: 14px;
  color: #efefef;
}
.login-border {
  width: 30%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  padding: 5% 30px;
}
.login-main {
  position: relative;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 20px;
  .login-title {
    text-align: left;
    margin-bottom: 50px;
    color: #000;
    font-size: 19px;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: 30px;
      height: 4px;
      background: -webkit-linear-gradient(left, #64c6ff ,#2a78e3);
      background: -o-linear-gradient(right, #2a78e3, #64c6ff);
      background: -moz-linear-gradient(right, #2a78e3, #64c6ff);
      background: linear-gradient(to right, #2a78e3 , #64c6ff);
    }
  }
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  font-size: 18px;
  color: #409eff;
}
.login-submit {
  margin-top: 20px;
  padding: 12px 0;
  width: 100%;
  font-size: 16px;
  border-radius: 30px;
}
.login-form {
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 25px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-wrapper {
  position: relative;
  .footer {
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
</style>
