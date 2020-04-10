<template>
  <div class="bvillage_detail">
    <basic-container>
        <h1>完善基层信息</h1>        
        <el-form :model="bvillage" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="基层名称:" prop="villageName">
                <el-input v-model="bvillage.villageName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="bvillage.contactName" placeholder="" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="bvillage.phone" placeholder="" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基层组织类型:" prop="type">
                <el-radio-group v-model="bvillage.type">
                  <el-radio :label="1">公司</el-radio>
                  <el-radio :label="2">服务站</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基层地址:" prop="address" class="amap-page-container">
                <el-input v-model="bvillage.address" placeholder="请输入地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="介绍:" prop="content">
                <el-input v-model="bvillage.content" type="textarea" placeholder=""></el-input>
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
import { detailVillage, editVillage } from '@/api/tmlms/bvillage'
import { getUserInfo } from '@/api/login'
import information from '@/mixins/information'
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
        bvillage:{
            address: '',
            phone: '',
            contactName: '',
            content: '',
            villageId: '',
            villageName: '',
            type: 1,
        },
        rules: {
            villageName: [
                { required: true, message: '请输入基层组织名称', trigger: 'blur' },
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
    async getData () {
      this.uid = await getUserInfo().then(res => {
        return res.data.data.sysUser.userId
      })
      detailVillage(this.uid).then(res => {
        this.bvillage = res.data.data
      })
    },
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let type = 2
          editVillage(this.bvillage, type).then(() => {
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
.bvillage_detail {
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
