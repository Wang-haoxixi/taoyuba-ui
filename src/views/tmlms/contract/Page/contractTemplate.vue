<template>
  <div class="contract">
    <basic-container id="pdfDom">
      <page-header :title="title"></page-header>
      <el-form  :model="formData" size="small" ref="form" label-width="120px"
        :rules="rules" class="form" >
        <el-container>
          <el-aside class="side">
            <div class="tex">持证人信息</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="持证人姓名：" prop="shipownerName">
                    <el-input maxlength="6" v-model="formData.shipownerName" style="width:380px" :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="shipownerIdcard">
                    <el-input maxlength="18" v-model="formData.shipownerIdcard" style="width:380px" :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="船名：" prop="shipName">
                    <el-input maxlength="20" v-model="formData.shipName" style="width:380px" :disabled="shipowner"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="船名：" prop="shipName">
                    <el-select v-model="formData.shipName"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="20"
                              :loading="loading"
                              clearable
                              @change="shipNameChange"
                              :remote-method="getShipNameList" style="width:380px!important">
                      <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item"></el-option>
                    </el-select>
                  </el-form-item> -->
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船舶登记号：" prop="shipLicenses">
                    <el-input maxlength="20" v-model="formData.shipLicenses" style="width:380px"  :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="shipownerPhone">
                    <el-input maxlength="11" v-model="formData.shipownerPhone" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭地址：" prop="shipownerAddr">
                    <el-input maxlength="20" v-model="formData.shipownerAddr" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sidea">
            <div class="tex">甲方（雇主）</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="employerName">
                    <el-input maxlength="6" v-model="formData.employerName" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="employerIdcard">
                    <el-input maxlength="18" v-model="formData.employerIdcard" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="签约人身份性质：" prop="employerProp">
                    <el-radio-group v-model="formData.employerProp" @change="employerPropChange">
                      <el-radio :label="1">船舶持证人</el-radio>
                      <el-radio :label="2">船舶承租人</el-radio> 
                      <el-radio :label="3">船长或授权代理人</el-radio> 
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船名及船舶登记号：">
                    <div>
                      <div v-if="formData.shipName && !(formData.shipName instanceof Object)" style="font-size:10px">船名：{{formData.shipName}}</div>
                      <div v-if="formData.shipName.shipName" style="font-size:10px">船名：{{formData.shipName.shipName}}</div>
                      <div v-if="!formData.shipName && !formData.shipName.shipName" style="font-size:10px">船名：</div>
                      <div style="font-size:10px">船舶登记号：{{formData.shipLicenses}}</div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="employerPhone">
                    <el-input maxlength="11" v-model="formData.employerPhone" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船舶是否共有：" prop="shipJoint">
                    <el-radio-group v-model="formData.shipJoint">
                      <el-radio :label="1">是，<el-input v-model="formData.shipJointYes" placeholder="人数（数字）" size="mini" type='number' style="width:100px"></el-input>共有（权证附后）</el-radio>
                      <el-radio :label="0">否，{{formData.shipownerName}} 独有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">  
                  <el-form-item label="地址：" prop="employerAddr">
                    <el-input maxlength="20" v-model="formData.employerAddr" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
      </el-form>
      <div style="text-align: center;padding: 20px 0;">                   
        <iep-button style="margin-right: 20px;" :disabeld="false"  type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button :disabeld="false" @click="handleBack">返回</iep-button>            
      </div>
    </basic-container>
  </div>
</template>

<script>
// import debounce from 'lodash/debounce'
import store from '@/store'
// import { findorgShip} from '@/api/ships/index'
// // import { findMyship } from '@/api/ships/index'
// import { getUserInfo } from '@/api/login'
import { getOperatorList } from '@/api/ships/shipoperat/index'
// import { detailCrew } from '@/api/tmlms/boatMan/index'
import { findMyship } from '@/api/ships'
import { addContractModel,editContractModel,getContractModel } from '@/api/tmlms/contractModel'
// import { getShipownerByidcard } from '@/api/tmlms/shipowner/index'
// import { isCheckIdcard } from '@/api/tmlms/newContract'
export default {
  props: {
    record: {},
    type: {},
  },
  data () {
    return {
    formData: {
        shipownerName: '',
        shipownerIdcard: '',
        shipName: '',
        shipLicenses: '',
        shipownerPhone: '',
        shipownerAddr: '',
        employerName: '',
        employerIdcard: '',
        employerProp: 1,
        employerPhone: '',
        shipJoint: 0,
        otherContent:'',
        shipJointYes: '',
        shipJointNo: '',
        employerAddr: '',
      },
      rules: {
        shipownerName: [{ 
          required: true, message: '请输入持证人姓名', trigger: 'blur',
        }],
        shipownerIdcard: [{ 
          required: true, message: '请输入持证人身份证号', trigger: 'blur',
        }],
        shipName: [{ 
          required: true, message: '请输入持证人船名', trigger: 'blur',
        }],
        shipLicenses: [{ 
          required: true, message: '请输入持证人船舶登记号', trigger: 'blur',
        }],
        shipownerPhone: [{ 
          required: true, message: '请输入持证人联系电话', trigger: 'blur',
        }],
        shipownerAddr: [{ 
          required: true, message: '请输入持证人家庭地址', trigger: 'blur',
        }],
        employerName: [{ 
          required: true, message: '请输入甲方（雇主)姓名', trigger: 'blur',
        }],
        employerIdcard: [{ 
          required: true, message: '请输入甲方（雇主)身份证号', trigger: 'blur',
        }],
        employerProp: [{ 
          required: true, message: '请输入签约人身份性质', trigger: 'blur',
        }],
        employerPhone: [{ 
          required: true, message: '请输入甲方（雇主)联系电话', trigger: 'blur',
        }],
        employerAddr: [{ 
          required: true, message: '请输入甲方（雇主)地址', trigger: 'blur',
        }],
      },
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isLicenses: false,
      isContract: false,
      shipowner:false,
      employee:false,
      checkEmployeeIdcard:false,
      employer:false,
      title:'',
    }
  },
  created () {
    // if (this.record) {
    //   this.getList()
    // }
    this.getShipDetail()
    this.getTitle()
  },
  methods: {
    getTitle (){
      this.title = this.$route.params.shipName+'渔船生成合同模板'
    },
    getShipDetail () {
      if(this.$route.query.operate=='add'){
        findMyship(this.$route.params.shipName).then(res=>{
            let shipData = res.data.data
            this.formData.shipownerName = shipData.shipowner
            this.formData.shipownerIdcard = shipData.shipownerIdcard
            this.formData.shipName = shipData.shipName
            this.formData.shipLicenses = shipData.licensesOwnerShip
            this.formData.shipownerPhone = shipData.mobile
            this.formData.shipownerAddr = shipData.address
            this.shipowner = true
            this.formData.employerName = this.formData.shipownerName
            this.formData.employerIdcard = this.formData.shipownerIdcard
            this.formData.employerPhone = this.formData.shipownerPhone
            this.formData.employerAddr = this.formData.shipownerAddr
            this.employer =true
        })
      }
      if(this.$route.query.operate=='edit') {
        getContractModel(this.$route.params.shipName).then(res=>{
          this.formData = res.data.data
          this.shipowner=true
          if(this.formData.employerProp==1){
            this.employer =true
          }
          // console.log(res.data.data)
        })
      }
    },
    handleBack () {
      this.$router.go(-1)
      // this.$emit('onGoBack')
    },
    employerPropChange (val) {
      if (val === 1) {
        this.formData.employerName = this.formData.shipownerName
        this.formData.employerIdcard = this.formData.shipownerIdcard
        this.formData.employerPhone = this.formData.shipownerPhone
        this.formData.employerAddr = this.formData.shipownerAddr
        this.employer =true
      } else if (val === 2) {
        this.formData.employerName = ''
        this.formData.employerIdcard = ''
        this.formData.employerPhone = ''
        this.formData.employerAddr = ''
        getOperatorList (this.formData.shipName.shipName).then(data => {
          // console.log('lll')
          // console.log(data.data.data)
          if(data.data.data){
            this.formData.employerName = data.data.data.realname
            this.formData.employerIdcard = data.data.data.idcard
            this.formData.employerPhone = data.data.data.phone
            this.formData.employerAddr = data.data.data.address
          }
        })
        this.employer =false
      } else if (val === 3) {
          this.formData.employerName = ''
          this.formData.employerIdcard = ''
          this.formData.employerPhone = ''
          this.formData.employerAddr = ''
          this.employer =false
      }
    },
    handleSubmit () {
      this.formData.shipJointNo = this.formData.shipownerName
      if (this.formData.shipName.shipName) {
        this.formData.shipName = this.formData.shipName.shipName
      }
      // addContractModel
      this.$refs['form'].validate(valid =>{
        if(valid){
          this.$confirm('请确认当前合同信息是否正确，提交后将无法修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(()=> {
            console.log(this.formData)
            if(this.$route.query.operate=='add'){
              addContractModel(this.formData).then(res=>{
              console.log(res)
              this.$message.success('合同模板已生成')
              this.$router.go(-1)
              })
            }else if(this.$route.query.operate=='edit'){
              editContractModel(this.formData).then(()=>{
              this.$message.success('合同模板修改成功')
              this.$router.go(-1)
              })
            }
            
          })
        }else{
          this.$message.error('请确认已经填写了所有必填信息！')
          // this.$message.error(valid)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .w-200 {
    width: 200px;
    margin: 0 20px;
  }
</style>

<style lang="scss">
  .spe {
      label {
        width: 180px!important;
      } 
    }
</style> 

<style>
  .side {
    width: 120px!important;
    height: 200px!important;
  }
  .sidea {
    width: 120px!important;
    height: 280px!important;
  }
  .sideb {
    width: 120px!important;
    height: 500px!important;
  }
  .sidec {
    width: 120px!important;
    height: 100px!important;
  }
  .sided {
    width: 120px!important;
    height: 300px!important;
  }
  .sidee {
    width: 120px!important;
    height: 150px!important;
  }
  .sidef {
    width: 120px!important;
    height: 200px!important;
  }
  .sideg {
    width: 120px!important;
    height: 600px!important;
  }
  .head {
    height: 30px!important;
  }
  .mai {
    flex-basis: 0!important;
  }
  .tex {
    font-size: 16px;
    text-align: center;
  }
</style>