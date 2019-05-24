<template>
  <el-form class="login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="username">
      <a-input ref="username" v-model="form.username" auto-complete="off" placeholder="请输入用户名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="password">
      <a-input ref="password" :type="passwordType" v-model="form.password" auto-complete="false" placeholder="请输入密码" size="large">
        <a-icon slot="prefix" type="lock" />
        <a-icon v-if="form.password" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
      </a-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <a-input ref="cpassword" :type="passwordType" v-model="form.cpassword" auto-complete="false" placeholder="确认你的密码" size="large">
        <a-icon slot="prefix" type="lock" />
        <a-icon v-if="form.cpassword" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
      </a-input>
    </el-form-item>
    <el-form-item prop="realName">
      <a-input ref="realName" v-model="form.realName" auto-complete="off" placeholder="请输入真实姓名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.realName" slot="suffix" type="close-circle" @click="emitEmpty('realName')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="phone">
      <a-input ref="phone" v-model="form.phone" auto-complete="off" placeholder="请输入手机号码" size="large">
        <a-icon slot="prefix" type="phone" />
        <a-icon v-if="form.phone" slot="suffix" type="close-circle" @click="emitEmpty('phone')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input-search :maxlength="4" v-model="form.code" auto-complete="off" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">同意并遵守<span class="agreement">《用户守则》</span></el-checkbox>
    </el-form-item>
    <el-form-item>
      <a-button type="primary" size="large" @click="handleRegister" block>注册</a-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { randomLenNum } from '@/util/util'
import { mapGetters } from 'vuex'
import { getMobileCode } from '@/api/admin/mobile'
import { registerUser, validRegisterUserName, validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  name: 'Userlogin',
  data () {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
        return callback(new Error('4个字符以上，15个字符以下，不能以数字或符号和开头，不含中文'))
      }
      validRegisterUserName(value).then(({ data }) => {
        if (!data.data) {
          callback(new Error('该用户名已存在，无需新增。'))
        } else {
          callback()
        }
      })
    }
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        validRegisterUserPhone(value).then(({ data }) => {
          if (!data.data) {
            callback(new Error('该手机号已存在，无需新增。'))
          } else {
            callback()
          }
        })
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.cpassword !== '') {
          this.$refs.form.validateField('cpassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: {
        username: '',
        password: '',
        cpassword: '',
        phone: '',
        code: '',
        randomStr: '',
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      checked: false,
      rules: {
        username: [
          { validator: checkUserName, trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', validator: validatePass },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        cpassword: [
          { trigger: 'blur', validator: validatePass2 },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
      },
      passwordType: 'password',
    }
  },
  created () {
    this.refreshCode()
  },
  mounted () { },
  computed: {
    ...mapGetters(['tagWel']),
  },
  props: [],
  methods: {
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.form.phone).then(response => {
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
    refreshCode () {
      this.form.code = ''
      this.form.randomStr = randomLenNum(this.code.length, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${
          this.form.randomStr
          }`)
    },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleRegister () {
      if (!this.checked) {
        this.$message('请先同意用户守则')
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          registerUser(this.form).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success',
              })
              this.$router.push('/login')
            } else {
              this.$message({
                message: data.msg,
                type: 'warning',
              })
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 20px;
    .el-form-item__content {
      margin-left: 0 !important;
      width: 100%;
    }
  }
  .el-input {
    padding: 0;
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.agreement {
  color: #999;
  &:hover {
    opacity: 0.7;
  }
}
@media (max-width: 320px) {
  .login-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>