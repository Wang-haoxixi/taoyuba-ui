<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}中介信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>                
        <el-form :model="agent" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="中介名称:" prop="agentName">
                <el-input v-model="agent.agentName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ agent.agentName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="agent.contactName" placeholder="" v-if="!$route.query.see" :disabled="haveInfo.realName"></el-input>
                <div v-else>{{ agent.contactName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="agent.phone" placeholder="" v-if="!$route.query.see" :disabled="haveInfo.phone"></el-input>
                <div v-else>{{ agent.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="agent.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ agent.address }}</div>
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
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { saveAgent, detailAgent, editAgent } from '@/api/tmlms/agent'
import information from '@/mixins/information'
import store from '@/store'
// import { getUserInfo } from '@/api/login'
// import { addUserRole } from '@/api/admin/user'
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
      haveInfo: {
        contactName:false,
        phone:false,
      },
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
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'children',
      },
      // userRole: {
      //   userId: '',
      //   roleId: 109,
      // },
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let type = 1
            if(this.$route.query.edit){
              let data = JSON.parse(JSON.stringify(this.agent))
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              editAgent(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1)  
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else {
                let data = JSON.parse(JSON.stringify(this.agent))
                if(this.$route.query.userId){
                  type = 2
                  data.userId = this.$route.query.userId
                }
                saveAgent(data,type).then(res=>{
                    this.$message({
                      message: res.data.msg,
                      type: 'success',
                    })
                    this.$router.go(-1)  
                }).catch(err=>{
                  this.$message.error(err.message)
                })
                // this.userRole.userId = data.userId
                // addUserRole(this.userRole)
            }
          } else {
          return false
        }
      })
    },
    // 上传成功
    handleAvatarSuccess (response) {
      this.agent.businessLicense = response.data.url
      console.log(this.agent.businessLicense)
    },
  },
  computed: {
  },
  created () {
    if(this.$route.query.edit || this.$route.query.see){
      detailAgent(this.$route.query.edit || this.$route.query.see).then( res=>{
        this.agent = res.data.data
      })
    }
    this.getInformation('agent',['phone','contactName'])
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
