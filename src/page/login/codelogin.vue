<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="mobile">
      <a-input v-model="loginForm.mobile" auto-complete="off" placeholder="请输入手机号码" size="large" />
    </el-form-item>
    <el-form-item prop="code">
      <a-input-search @keyup.enter.native="handleLogin" :maxlength="4" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item>
    <el-form-item>
      <a-button type="primary" size="large" @click="handleLogin" block>登录</a-button>
    </el-form-item>
  </el-form>
</template>

<script>
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
import { isvalidatemobile } from '@/util/validate'
import { mapGetters, mapActions } from 'vuex'
import { getMobileCode } from '@/api/admin/mobile'
export default {
  name: 'Codelogin',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length != 4) {
        callback(new Error('请输入4位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        mobile: '',
        code: '',
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
      },
    }
  },
  computed: {
    ...mapGetters(['tagWel']),
  },
  methods: {
    ...mapActions(['LoginByPhone']),
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.loginForm.mobile).then(response => {
        if (response.data.data) {
          this.$message.success('验证码发送成功')
        } else {
          this.$message.error(response.data.msg)
        }
      })
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        if (this.msgTime == 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.LoginByPhone(this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value })
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.code-wrapper {
  display: flex;
}
</style>
<style lang="css" scoped>
.login-form >>> .el-form-item .el-input {
  padding: 0;
}
@media (max-width: 320px) {
  .login-form {
    margin-top: 20px;
  }
}
</style>