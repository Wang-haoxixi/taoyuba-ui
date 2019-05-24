<template>
  <container title="用户登录">
    <template v-slot:tab-panel>
      <user-login v-if="activeName === 'user'" @tab-active="handleActive"></user-login>
      <code-login v-if="activeName === 'code'"></code-login>
      <third-login v-if="activeName === 'third'"></third-login>
      <retrieve v-if="activeName === 'retrieve'" @tab-active="handleActive"></retrieve>
    </template>
    <template v-slot:tab-footer>
      <div class="menu-p">
        <span class="menu-line"></span>
        <span class="menu-text">其他方式登录</span>
        <span class="menu-line"></span>
      </div>
      <a href="#" @click.stop="activeName = 'user'">账号密码</a>
      <a href="#" @click.stop="activeName = 'code'">手机号登录</a>
      <a href="#" @click.stop="activeName = 'third'">第三方登录</a>
    </template>
  </container>
</template>
<script>
import Container from '../Container'
import userLogin from './userlogin'
import codeLogin from './codelogin'
import thirdLogin from './thirdlogin'
import retrieve from './retrieve'
import { setStore } from '@/util/store'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Login',
  components: {
    Container,
    userLogin,
    codeLogin,
    thirdLogin,
    retrieve,
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
a {
  color: rgb(153, 153, 153);
  font-size: 14px;
  margin: 0px 8px;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  &:hover,
  &:focus {
    outline: none;
    color: #b1b0b0;
  }
}
.menu-p {
  height: 40px;
  line-height: 10px;
  text-align: center;
  .menu-line {
    display: inline-block;
    width: 130px;
    border-top: 1px solid #d7d7d7;
  }
  .menu-text {
    color: #686868;
    vertical-align: middle;
    vertical-align: -4px;
    margin-right: 10px;
    margin-left: 10px;
  }
}

@media (max-width: 767px) {
  .menu-p {
    .menu-line {
      width: 15%;
    }
  }
}
@media (max-width: 320px) {
  .login-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .el-form-item__error {
    top: 30%;
    left: 10px;
  }
}
</style>
