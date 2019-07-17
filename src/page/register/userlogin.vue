<template>
  <el-form class="login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="phone">
      <a-input ref="phone" v-model="form.phone" auto-complete="off" placeholder="请输入手机号码" size="large">
        <a-icon slot="prefix" type="phone" />
        <a-icon v-if="form.phone" slot="suffix" type="close-circle" @click="emitEmpty('phone')" />
      </a-input>
    </el-form-item>
    <!-- <el-form-item prop="username">
      <a-input ref="username" v-model="form.username" auto-complete="off" placeholder="请输入用户名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
      </a-input>
    </el-form-item> -->
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
    <!-- <el-form-item prop="realName">
      <a-input ref="realName" v-model="form.realName" auto-complete="off" placeholder="请输入真实姓名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.realName" slot="suffix" type="close-circle" @click="emitEmpty('realName')" />
      </a-input>
    </el-form-item> -->
    <el-form-item prop="code">
      <a-input-search :maxlength="4" v-model="form.code" auto-complete="off" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">同意并遵守
        <!-- <el-button type="text" class="agreement" @click="dialogVisible = true">《免责声明》</el-button> -->
        <el-button type="text" @click="dialogVisible = true">《免责声明》</el-button>
      </el-checkbox>
      <el-dialog title="免责声明" :modal-append-to-body='false' :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <p style="text-indent: 2em">
          本网站是一个旨以提供渔船及配件交易服务、渔需渔获供销服务、渔业船员服务、渔业管理服务为一体的公共服务平台，不适宜发表政治实事、危害国家安全、破坏民族团结、破坏国家宗教政策、破坏社会稳定、侮辱、诽谤、教唆、淫秽等内容的作品。我们有权检查并删除任何不恰当、违法、侵害、中伤、胁迫以及违反条款的其它内容、信息、图片或资料。
        </p>
        <p style="text-indent: 2em">
          本网站所收集的部分公开资料来源于互联网，转载的目的在于传递更多信息及用于网络分享，并不代表本站赞同其观点和对其真实性负责，也不构成任何其他建议。本站部分作品是由会员自主发布、编辑整理上传，对此类作品本站仅提供发布平台，不为其版权负责，本网站不为任何由于作品发布而引起的纠纷承担责任。如果您发现网站上有侵犯您的知识产权的作品，请与我们取得联系，我们会及时修改或删除。
        </p>
        <p style="text-indent: 2em">
          本网站所提供的信息，只供参考之用。本网站不保证信息的准确性、有效性、及时性和完整性。本网站及其雇员一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误，对用户或任何其他人士负任何直接或间接责任。在法律允许的范围内，本网站在此声明，不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿。
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDagree">同 意</el-button>
        </span>
      </el-dialog>
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
      dialogVisible: false,
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
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: err,
            })
          })
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleDagree () {
      this.dialogVisible = false
      this.checked = true
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