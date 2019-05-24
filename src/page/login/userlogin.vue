<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" ref="inputUserName" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="iconfont icon-yonghu1"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <div class="hund">
          <el-col>
              <el-input size="small" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">
                <i slot="prefix" class="iconfont icon-icon-Verification-code"></i>
              </el-input>
          </el-col>
        </div>
        <div class="hundF">
          <el-col>
            <div class="login-code">
              <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{ code.value }}</span>
              <img :src="code.src" class="login-code-img" @click="refreshCode" v-else />
              <!--
                <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i>
              -->
            </div>
          </el-col>
        </div>
      </el-row>
    </el-form-item>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { randomLenNum } from '@/util/util'
  import { mapGetters } from 'vuex'
  // import { codeUrl } from '@/config/env'
  export default {
    name: 'userlogin',
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          code: '',
          randomStr: '',
        },
        checked: false,
        code: {
          src: '',
          value: '',
          len: 4,
          type: 'image',
        },
        loginRules: {
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
        loading: false,
      }
    },
    created () {
      this.refreshCode()
    },
    mounted () {
      this.$refs.inputUserName.focus()
    },
    computed: {
      ...mapGetters(['tagWel']),
    },
    props: [],
    methods: {
      refreshCode () {
        this.loginForm.randomStr = randomLenNum(this.code.len, true)
        this.code.type === 'text'
          ? (this.code.value = randomLenNum(this.code.len))
          : (this.code.src = `${this.BASE_URL}/code?randomStr=${this.loginForm.randomStr}`)
        this.loginForm.code = this.code.value
      },
      showPassword () {
        this.passwordType === ''
          ? (this.passwordType = 'password')
          : (this.passwordType = '')
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(
              () => {
                this.$store.commit('ADD_TAG', this.tagWel)
                this.$router.push({ path: this.tagWel.value })
                this.loading = false
              },
              error => {
                this.$store.commit('ADD_TAG', this.tagWel)
                this.$router.push({ path: this.tagWel.value })
                console.error(error)
                this.refreshCode()
                this.loading = false
              }
            )
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .login-form /deep/ .el-form-item__error {
    padding: 0;
  }
  .login-code {
    margin: 0 0 0 10px;
    height: 40px;
    align-items: center;
    justify-content: space-around;
  }
  .login-code-img {
    padding: 0 5px;
    width: 100px;
    height: 32px;
    background-color: #fdfdfd;
    border-radius: 5px;
  }
  .login-submit {
    border-radius: 0;
    display: block;
    width: 100%;
    font-size: 20px;
  }
  .hund{
    float: left;
    width: calc(100% - 100px);
  }
  .hundF{
    float: left;
    width: 100px;
  }
</style>
