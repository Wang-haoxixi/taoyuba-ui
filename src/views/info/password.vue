<template>
  <div>
    <gov-layout-main>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="150px">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" :value="userInfo.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" maxlength='20'></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="newpassword1">
                <el-input type="password" v-model="ruleForm2.newpassword1" auto-complete="off" maxlength='20'></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="newpassword2">
                <el-input type="password" v-model="ruleForm2.newpassword2" auto-complete="off" maxlength='20'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2');">提交</el-button>
                <el-button @click="resetForm('ruleForm2');">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </gov-layout-main>
  </div>
</template>

<script>
import { editorUser } from '@/api/umps/user'
import { mapState } from 'vuex'
import { getToken } from '@/util/auth'
// import ElFormItem from 'element-ui/packages/form/src/form-item.vue'

export default {
  // components: {
  //   ElFormItem,
  // },
  data () {
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm2.password !== '') {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.newpassword1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入密码'))
      }
    }
    var Verification = (rule, value, callback) => {
      if (value === this.ruleForm2.password) {
        callback(new Error('与原密码相同'))
      }else if(value.length < 6){
        callback(new Error('新密码不能为空且不少于6位'))
      } else {
        callback()
      }
    }
    return {
      fileList: [],
      show: false,
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      ruleForm2: {
        password: '',
        newpassword1: '',
        newpassword2: '',
      },
      rules2: {
        password: [
          {
            required: true,
            min: 6,
            message: '原密码不能为空且不少于6位',
            trigger: ['change','blur'],
          },
        ],
        newpassword1: [
          {
            required: true,
            validator: Verification,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        newpassword2: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      },
    }
  },
  created () { },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm2.id = this.userInfo.id
          editorUser(this.ruleForm2).then(response => {
            if (response.data.data) {
              this.$notify({
                title: '修改成功',
                message: '即将重新登录......',
                type: 'success',
                duration: 2000,
              })
              setTimeout(() => {
                // 修改密码之后强制重新登录
                if (this.ruleForm2.newpassword1 !== '') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                } else {
                  this.$router.push({ path: '/' })
                }
              }, 1500)
            } else {
              this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000,
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toggleShow () {
      this.show = !this.show
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess (jsonData) {
      this.$store.commit('SET_AVATAR', jsonData.filename)
    },
  },
}
</script>
