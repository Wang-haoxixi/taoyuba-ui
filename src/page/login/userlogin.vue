<template>
  <el-form class="login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="username">
      <a-input ref="username" @keyup.enter.native="handleLogin" v-model="form.username" auto-complete="off" placeholder="请输入用户名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="password">
      <a-input ref="password" @keyup.enter.native="handleLogin" :type="passwordType" v-model="form.password" auto-complete="false" placeholder="请输入密码" size="large">
        <a-icon slot="prefix" type="lock" />
        <a-icon v-if="form.password" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
      </a-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input class="login-code" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="form.code" auto-complete="false" placeholder="请输入验证码" size="large">
        <img slot="addonAfter" :src="code.src" class="login-code-img" @click="refreshCode" />
      </a-input>
    </el-form-item>
    <el-form-item>
      <div class="login-text">
        <el-checkbox v-model="form.isKeepLogin">保持登陆</el-checkbox>
        <div class="check-text">
          <el-button type="text" @click.prevent="handleRetrieve">忘记密码?</el-button>
          <el-button type="text" @click.prevent="handleRegister">立即注册</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-button type="primary" size="large" :loading="loginLoading" @click="handleLogin" block>登录</a-button>
        </a-col>
        <a-col :span="12">
          <a-button size="large" @click="$message.success('功能开发中')" block>访客</a-button>
        </a-col>
      </a-row>
    </el-form-item>
  </el-form>
</template>

<script>
import { codeUrl } from '@/config/env'
import { randomLenNum } from '@/util/util'
import { mapGetters, mapActions } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Userlogin',
  data () {
    return {
      socialForm: {
        code: '',
        state: '',
      },
      form: {
        username: '',
        password: '',
        code: '',
        redomStr: '',
        isKeepLogin: false,
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
        ],
      },
      passwordType: 'password',
      loginLoading: false,
    }
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
    this.loadPage()
  },
  computed: {
    ...mapGetters(['tagWel']),
  },
  methods: {
    ...mapActions(['LoginBySocial', 'LoginByUsername', 'GetMenu']),
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    loadPage () {
      this.refreshCode()
    },
    handleRetrieve () {
      this.$emit('tab-active', 'retrieve')
    },
    handleRegister () {
      this.$router.push('/register')
    },
    refreshCode () {
      this.form.code = ''
      this.form.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${codeUrl}?randomStr=${
          this.form.randomStr
          }`)
    },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleSocialLogin () {
      this.LoginBySocial(this.socialForm).then(() => {
        this.$router.push({ path: this.tagWel.value })
      })
    },
    handleLogin () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loginLoading = true
            await this.LoginByUsername(this.form)
            const data = await this.GetMenu()
            this.$router.$avueRouter.formatRoutes(data, true)
            this.$router.push({ path: this.tagWel.value })
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.loginLoading = false
            this.refreshCode()
          }
        }
      })
    },
  },
}
</script>

<style lang="css" scoped>
.login-code >>> .ant-input-group-addon {
  padding: 0;
  height: 40px;
}
.login-code .login-code-img {
  padding: 1px 0;
  height: 100%;
  box-sizing: border-box;
}
.login-text {
  color: red;
}
.login-text .check-text {
  float: right;
  color: red;
}
.login-text >>> .el-button--text {
  color: #ba1b20;
}
.login-text >>> .el-button--text:hover {
  color: #f56c6c;
}
.login-text >>> .el-button--text:nth-child(1) {
  color: #666;
}
.login-text >>> .el-button--text:nth-child(1):hover {
  color: #999;
}
.login-form {
  margin: 10px 0;
}
.login-form i {
  color: #999;
}
.login-form .el-form-item {
  margin-bottom: 20px;
}
.login-form >>> .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  width: 100%;
}
.login-form >>> .el-input {
  padding: 0;
}
.login-form >>> .el-input .el-input__prefix i {
  padding: 0 5px;
  font-size: 16px !important;
}
</style>
