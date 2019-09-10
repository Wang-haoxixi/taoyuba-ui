<template>
  <div class="training_detail">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}主管单位信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>
        <el-form :model="gov" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">            
              <el-form-item label="单位名称:" prop="govName">
                <el-input v-model="gov.govName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.govName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">            
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="gov.contactName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.contactName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">        
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="gov.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位地址:" prop="address">
                <el-input v-model="gov.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.address }}</div>
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
import { detailGov, saveGov, updateGov } from '@/api/tmlms/gov'
export default {
  data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
          callback()
        }
      }
    return {
        gov:{
          govName: '',
          contactName: '',
          phone: '',
          address: '',
        },
        userId: '',
        rules: {
            govName: [
                { required: true, message: '请输入单位名称', trigger: 'blur' },
            ],
            contactName: [
                { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入联系电话', trigger: 'blur' },
                { validator: checkPhone, trigger: 'blur' },
            ],
        },
       }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.$route.query.edit) {
            saveGov(this.gov).then(() => {
              this.$message.success('新增成功！')
              this.$router.go(-1)
            }).catch(() => {
              this.$message.error('新增失败！')
            })
          } else {
            updateGov(this.gov).then(() => {
              this.$message.success('修改成功！')
              this.$router.go(-1)
            }).catch(() => {
              this.$message.error('修改失败！')
            })
          }
        }
      })
    },
    getData () {
      if (this.$route.query.edit) {
        this.userId = this.$route.query.edit
      }
      if (this.$route.query.see) {
        this.userId = this.$route.query.see
      }
      if (this.$route.query.edit || this.$route.query.see) {
        detailGov(this.userId).then(data => {
          this.gov = data.data.data
        })
      }
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
  margin-right: 16%;
}
.training_detail {
    .amap-demo {
        height: 300px;
        margin-top: 60px;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }
    .amap-page-container {
        position: relative;
    }
    .amap-logo {
        display: none;
    }
    .el-vue-search-box-container .search-tips {
        position: absolute;
        top: 100%;
        border: 1px solid #dbdbdb;
        background: #fff;
        overflow: auto;
        height: 300px;
        overflow: auto;
    }
}
</style>
