<template>
  <div class="contract-box">
    <basic-container>
        <h1>{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}经营人信息</h1>
        <el-form :model="operator" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="operator.realname" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ operator.realname }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证:" prop="idcard">
                <el-input v-model="operator.idcard" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ operator.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="phone">
                <el-input v-model="operator.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ operator.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家庭地址:" prop="address">
                <el-input v-model="operator.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ operator.address }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="渔船编号:" prop="shipNo">
                <el-input v-model="operator.shipNo" placeholder="" v-if="!$route.query.see" disabled></el-input>
                <div v-else>{{ operator.shipNo }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="船名号:" prop="shipName">
                <el-input v-model="operator.shipName" placeholder="" v-if="!$route.query.see" disabled></el-input>
                <div v-else>{{ operator.shipName }}</div>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="船舶登记号:" prop="shipLicenses">
                <el-input v-model="operator.shipLicenses" placeholder="" v-if="!$route.query.see" disabled></el-input>
                <div v-else>{{ operator.shipLicenses }}</div>
              </el-form-item>
            </el-col> -->
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
import { getShipByShipNo } from '@/api/ships/index'
import { getOperatorList, creatShipManager,  updateShipManager } from '@/api/ships/shipoperat/index'
import { getShipownerByidcard } from '@/api/tmlms/shipowner/index'
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
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
            callback()
        }
      }
    return {
      haveInfo: {
        phone: false,
      },
      operator:{
        shipNo: '',
        shipName: '',
        shipLicenses: '',
        realname:'',
        idcard: '',
        phone: '',
        address: '',
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
    }
  },
  methods: {
    getShipInfo () {
      if (this.$route.query.add) {
        getShipByShipNo (this.$route.query.add).then(res => {
          this.operator.shipName = res.data.data.shipName
          this.operator.shipNo = res.data.data.shipNo
          this.operator.shipLicenses =res.data.data.licensesOwnerShip
        })
      } else if (this.$route.query.edit) {
        getOperatorList(this.$route.query.see).then(res=>{
          this.operator = res.data.data
        })
      } else if (this.$route.query.see) {
        getOperatorList(this.$route.params.shipName).then(res=>{
          this.operator = res.data.data
          this.operator.shipName = this.$route.params.shipName
          this.operator.shipNo = this.$route.query.see
        }).then(()=>{
          getShipownerByidcard(this.operator.idcard).then(res=>{
            if(res.data.data){
              this.operator.phone = res.data.data.phone
              this.operator.address = res.data.data.address
            }
          })
        })
        // getShipManagerByShipNo (this.$route.query.see).then(res => {
        //   this.operator = res.data.data
        // })
      } 
    },
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$route.query.add) {
            creatShipManager (this.operator).then(() => {
              this.$message.success('新增成功！')
              this.$router.go(-1)
            })
          } else if  (this.$route.query.edit) {
            updateShipManager (this.operator).then(() => {
              this.$message.success('修改成功！')
              this.$router.go(-1)
            })
          }    
        }
      })
    },
  },
  computed: {
  },
  created () {
    this.getShipInfo()
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-right:16%;
}
</style>
