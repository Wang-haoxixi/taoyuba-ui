<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="编辑个人信息" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="form.phone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证：" prop="idCard">
              <el-input v-model="form.idCard" :disabled="isIdCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像：" prop="avatar">
              <!-- <iep-avatar v-model="form.avatar"></iep-avatar> -->
                <el-upload
                  class="avatar-uploader"
                  action="/api/admin/file/upload/avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess" :headers="headers"  accept="image/*">
                  <img v-if="form.avatar" :src="form.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/login'
import { userEdit } from '@/api/admin/user'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        realName: '',
        avatar: '',
        idCard: '',
        phone: '',
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isIdCard: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    getUserInfo().then(res => {
      this.form.userId = res.data.data.sysUser.userId
      this.form.realName = res.data.data.sysUser.realName
      this.form.phone = res.data.data.sysUser.phone
      this.form.idCard = res.data.data.sysUser.idCard
      if (this.form.idCard && this.form.idCard !== '') {
        this.isIdCard = true
      }
      this.form.avatar = res.data.data.sysUser.avatar
    })
  },
  mounted () {
  },
  methods: {
    onGoBack () {
      this.$router.push({
        path: '/',
      })     
    },
    handleAvatarSuccess (response) {
      this.form.avatar = response.data.url
    },
    card (val) {
      console.log(val.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/))
      if (val && val.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
        return true
      } else {
        return false
      }
    },
    async handleSubmit () {
      if (!this.form.realName) {
        this.form.realName = this.userInfo.realName
      }
      if (!this.form.avatar) {
        this.form.avatar = this.userInfo.avatar
      }
      let m = await this.card(this.form.idCard)
      if (m === true) {
        userEdit(this.form).then(() => {
          this.$message.success('修改成功!')
          this.$router.push({
            path: '/',
          }) 
        }).catch(res => {
          this.$message({
            message: res,
            type: 'error',
          })
        })
      } else {
        this.$message.error('请输入正确的身份证号码!')
      }
    },
  },
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
