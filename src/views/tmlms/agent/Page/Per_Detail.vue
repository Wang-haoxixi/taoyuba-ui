<template>
  <div class="agent-add">
    <basic-container>
        <h1>完善中介信息</h1>                
        <el-form :model="agent" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="中介名称:" prop="agentName">
                <el-input v-model="agent.agentName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="agent.contactName" placeholder="" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="agent.phone" placeholder="" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="agent.address" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="营业执照:" prop="businessLicense">
                  <el-upload
                    :disabled="$route.query.see"
                    class="avatar-uploader"
                    action="/api/admin/file/upload/avatar"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="handleAvatarSuccess"
                    >
                    <img v-if="agent.businessLicense" :src="agent.businessLicense" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save">提交</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { detailAgent, editAgent } from '@/api/tmlms/agent'
import information from '@/mixins/information'
import store from '@/store'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [information],
  data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系电话'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
            callback()
        }
      }
    return {
      agent:{
        businessLicense:'',
        phone: '',
        contactName: '',
      },
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      rules: {
          agentName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入联系地址', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
      },
      uid: '',
    }
  },
  methods: {
    async getData () {
      this.uid = await getUserInfo().then(res => {
        return res.data.data.sysUser.userId
      })
      detailAgent(this.uid).then(res => {
        this.agent = res.data.data
      })
    },
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let type = 2
          editAgent(this.agent, type).then(() => {
            this.$message.success('提交成功！')
            this.$router.go(-1)
          }).catch(() => {
            this.$message.success('提交失败！')
          })
        } else {
          return false
        }
      })
    },
    // 上传成功
    handleAvatarSuccess (response) {
      this.agent.businessLicense = response.data.url
    },
  },
  computed: {
  },
  created () {
    this.getData()
  },
}
</script>
<style lang="scss">
.el-form {
  margin-right:16%;
}
.agent-add {
  .avatar-uploader .el-upload {
    border: 1px solid #CCC;
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
}
</style>
