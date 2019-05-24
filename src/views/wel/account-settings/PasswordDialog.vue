<template>
  <iep-dialog :dialog-show="dialogShow" title="修改密码" width="520px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword1">
        <el-input type="password" v-model="form.newpassword1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newpassword2">
        <el-input type="password" v-model="form.newpassword2" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { initPasswordForm } from './options'
import request from '@/router/axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newpassword1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initPasswordForm(),
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        newpassword1: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        newpassword2: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions(['GetUserInfo', 'LogOut']),
    loadPage () {
      this.form = initPasswordForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      const newForm = this.$mergeByFirst(initPasswordForm(this.userInfo.username), { ...this.form })
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: '/admin/user/edit',
            method: 'put',
            data: newForm,
          })
            .then(response => {
              if (response.data.data) {
                this.$message({
                  message: '密码修改成功，请重新登陆',
                  type: 'success',
                })
                this.GetUserInfo()
                // 修改密码之后强制重新登录
                this.LogOut().then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error',
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '修改失败',
                type: 'error',
              })
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

