<template>
  <div class="contract-box">
    <basic-container>
        <h1>船东信息</h1>
        <el-form :model="shipowner" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="shipowner.realName" placeholder="" v-if="!$route.query.see" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.realName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="shipowner.idcard" placeholder="" v-if="!$route.query.see" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="shipowner.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.address }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="shipowner.phone" placeholder="" v-if="!$route.query.see" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.phone }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.push({name: 'Shipowner'})">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { getShipownerByidcard, newEditShipowner } from '@/api/tmlms/shipowner'
import { getUserInfo } from '@/api/login'
export default {
  data () {
    // 验证
      var card = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'))
        } else if (!value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
          callback(new Error('请输入正确的身份证号码!'))
        } else {
          callback()
        }
      }
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
      shipowner:{
        address: '',
        idcard: '',
        realName:'',
      },
      rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: card, trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入联系地址', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
      },
      manager: false,
      isManger: false,
      byCard: '',
    }
  },
  methods: {
    // 提交表单
    async save () {     
        if (this.shipowner.idcardPhoto.length > 200) {
        await this.getIdcardFile()
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let type = ''
          if (this.manager) {
            type = 1
          } else {
            type = 2
          }
          newEditShipowner(this.shipowner, type).then(res=>{
            this.$message({
              message: res.data.msg,
              type: 'success',
            })
            this.$router.go(-1) 
          }).catch(err=>{
            this.$message.error(err.message)
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
    // 编辑新增放同一个组件 判断分别
    getAll.call(this)
    // 获取编辑数据
    async function getAll () {
      // 异步获取ID
      this.byCard = await getUserInfo().then(res => {
         return res.data.data.sysUser.idCard
      })
      getShipownerByidcard(this.byCard).then( res=>{
        this.shipowner = res.data.data
      })
    }
    getUserInfo().then(res => {
      if (res.data.data.roles.includes(111)) {
        this.manager = true
      } else {
        this.manager = false
      }
      if (res.data.data.roles.indexOf(111) !== -1) {
        this.isManger = false
      } else if (res.data.data.roles.indexOf(112) !== -1) {
        this.isManger = false
      } else {
        this.isManger = true
      } 
      res.data.data.sysUser.userId
    })
  },
  mounted () {
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-right:16%;
}
</style>
