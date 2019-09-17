<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="修改个人密码"></page-header>
      <el-form ref="form" :model="form" label-width="140px" size="small" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="原密码：" prop="password">
              <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="新密码：" prop="newpassword1">
              <el-input type="password" v-model="form.newpassword1" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="确认密码：" prop="newpassword2">
              <el-input type="password" v-model="form.newpassword2" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="save">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { editPass } from '@/api/admin/user'
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
      form: {
        username: '',
        password: '',
        newpassword1: '',
        newpassword2: '',
      },
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
    save () {
      this.form.username = this.userInfo.username
      this.$refs['form'].validate((valid) => {
        if (valid) {
          editPass(this.form).then(() => {
            this.$message.success('密码修改成功，请重新登陆')
            this.GetUserInfo()
            this.LogOut().then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }).catch(() => {
            this.$message.error('修改失败！')
          })
        }
      })
    },
  },
}
</script>