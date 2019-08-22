<template>
  <div class="contract">
    <basic-container id="pdfDom">
      <page-header :title="getTitle"></page-header>
      <el-form :disabled="type !== 'add' && type !== 'edit'" :model="formData" size="small" ref="form" label-width="200px"
        :rules="rules" class="form" >
        <el-form-item label="持证人信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="持证人姓名：" prop="shipownerName">
                <el-input maxlength="6" v-model="formData.shipownerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号：" prop="shipownerIdcard">
                <el-input maxlength="20" v-model="formData.shipownerIdcard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="船名：" prop="shipName">
                <el-input maxlength="20" v-model="formData.shipName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="船舶登记号：" prop="shipLicenses">
                <el-input maxlength="20" v-model="formData.shipLicenses"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="shipownerPhone">
                <el-input maxlength="20" v-model="formData.shipownerPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭地址：" prop="shipownerAddr">
                <el-input maxlength="20" v-model="formData.shipownerAddr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="甲方（雇主）">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="employerName">
                <el-input maxlength="6" v-model="formData.employerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号：" prop="employerIdcard">
                <el-input maxlength="20" v-model="formData.employerIdcard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签约人身份性质：" prop="employerProp">
                <el-radio-group v-model="formData.employerProp">
                  <el-radio :label="1">船舶持证人</el-radio>
                  <el-radio :label="2">船舶承租人</el-radio> 
                  <el-radio :label="3">船长或授权代理人</el-radio> 
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="船名及船舶登记号：">
                <div>
                  <div style="font-size:10px">船名：{{formData.shipName}}</div>
                  <div style="font-size:10px">船舶登记号：{{formData.shipLicenses}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="employerPhone">
                <el-input maxlength="20" v-model="formData.employerPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="船舶是否共有：" prop="shipJoint">
                <el-radio-group v-model="formData.shipJoint">
                  <el-radio :label="1">是，<el-input v-model="formData.shipJointYes" placeholder="人数（数字）" size="mini" style="width:100px"></el-input>共有（权证附后）</el-radio>
                  <el-radio :label="0">否，<el-input v-model="formData.shipJointNo" size="mini" style="width:100px" disabled>{{formData.shipownerName}}</el-input>独有</el-radio> 
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">  
              <el-form-item label="地址：" prop="employerAddr">
                <el-input maxlength="20" v-model="formData.employerAddr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="乙方（雇员）">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="employeeName">
                <el-input maxlength="6" v-model="formData.employeeName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号：" prop="employeeIdcard">
                <el-input maxlength="20" v-model="formData.employeeIdcard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="employeePhone">
                <el-input maxlength="6" v-model="formData.employeePhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现有资格证书：" prop="employeePosition">
                <iep-dict-select v-model="formData.employeePosition" dict-name="tyb_resume_position">></iep-dict-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地址：" prop="employeeAddr">
                <el-input maxlength="20" v-model="formData.employeeAddr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急联系人及电话：">
                <div>
                  <div style="font-size:10px">紧急联系人：{{formData.employeeName}}</div>
                  <div style="font-size:10px">联系电话：{{formData.employeePhone}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="有无晕船或不适宜从事航海的疾病或身体缺陷：" prop="employeeIsSick">
                <el-radio-group v-model="formData.employeeIsSick">
                  <el-radio :label="1">有，<el-input v-model="formData.employeeIsSickYes" size="mini" style="width:200px"></el-input></el-radio>
                  <el-radio :label="0">无。</el-radio> 
                </el-radio-group>
              </el-form-item>
            </el-col>  
            <el-col :span="12">
              <el-form-item label="有无航海经验：" prop="employeeIsExp">
                <el-radio-group v-model="formData.employeeIsExp">
                  <el-radio :label="1">有，<iep-dict-select v-model="formData.employeeIsExpYes" dict-name="tyb_resume_seniority" style="width:200px"></iep-dict-select></el-radio>
                  <el-radio :label="0">无。</el-radio> 
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-form-item label="工资账户：" prop="employeePayType">
                <el-radio-group v-model="formData.employeePayType">
                  <el-radio :label="1">现金</el-radio>
                  <el-radio :label="2">银行转账</el-radio>
                  <el-radio :label="3">微信</el-radio> 
                  <el-radio :label="4">支付宝</el-radio> 
                </el-radio-group>
              </el-form-item>
              <div v-show="formData.employeePayType == 2">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="户名：" prop="employeePayBankAccount">
                      <el-input maxlength="20" v-model="formData.employeePayBankAccount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="账号：" prop="employeePayAccount">  
                      <el-input maxlength="20" v-model="formData.employeePayAccount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开户行：" prop="employeePayBank">  
                      <el-input maxlength="20" v-model="formData.employeePayBank"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>            
              </div>
              <div v-show="formData.employeePayType == 3">
                <el-form-item label="微信账号：" prop="employeePayAccount">  
                  <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
                </el-form-item>
              </div>
              <div v-show="formData.employeePayType == 4">
                <el-form-item label="支付宝实名账号：" prop="employeePayAccount">  
                  <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
                </el-form-item>
              </div>
            </el-row>
          </el-row>
        </el-form-item>
        <el-form-item label="岗位及试用">
          <el-row>
            <el-col :span="12">
              <el-col :span="12">
                <el-form-item label="在" style="width: 150px!important" prop="workMode">
                  <iep-dict-select v-model="formData.workMode" dict-name="tyb_resume_worktype" style="width: 150px!important"></iep-dict-select>
                </el-form-item >
              </el-col>
              <el-col :span="12">
                <el-form-item label="船担任" style="width: 150px!important" prop="workPosition">
                  <iep-dict-select v-model="formData.workPosition" dict-name="tyb_resume_seniority" style="width: 150px!important"></iep-dict-select>
                </el-form-item >
              </el-col>
            </el-col>
            <el-col>
              <el-form-item label="特长" prop="workSkill">  
                <el-input maxlength="4" v-model="formData.workSkill" style="width:150px"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="试用期" prop="workProbationTypeValue">  
                <el-input maxlength="10" v-model="formData.workProbationTypeValue" style="width:150px"></el-input>
                <el-radio-group v-model="formData.workProbationType" style="margin:15px">
                  <el-radio :label="1">天</el-radio>
                  <el-radio :label="2">月</el-radio>
                  <el-radio :label="3">航次</el-radio> 
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="合同期限、工资标准及支付方式">
          <el-row>
            <el-col :span="16">
              <el-form-item label="按渔业生产周期：" prop="period">
                <el-date-picker v-model="period" type="daterange" range-separator="至"
                  tart-placeholder="开始" end-placeholder="结束"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="薪水类型：" prop="paySalaryType">
                <el-radio-group v-model="formData.paySalaryType">
                  <el-radio :label="1">日薪</el-radio>
                  <el-radio :label="2">月薪</el-radio>
                  <el-radio :label="3">年薪</el-radio> 
                </el-radio-group>
                <el-input maxlength="10" v-model="formData.paySalaryTypeValue" size="mini" style="width:70px; margin:10px"></el-input><span>元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="支付方式：" prop="payType">
              <el-radio-group v-model="formData.payType">
                <el-radio :label="1">定期支付</el-radio>
                <el-radio :label="2">一次性支付</el-radio>
                <el-radio :label="3">不定期支付</el-radio> 
              </el-radio-group>
            </el-form-item>
            <div v-show="formData.payType == 1">
              <el-form-item label="微信账号：" prop="payTypeValue">  
                <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
              </el-form-item>
            </div>
            <div v-show="formData.payType == 2">
              <el-form-item label="微信账号：" prop="payTypeValue">  
                <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
              </el-form-item>
            </div>
          </el-row>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
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
        employerProp: 3,
        employerPhone: '',
        shipJoint: 0,
        shipJointYes: '',
        shipJointNo: '',
        employerAddr: '',
        employeeName: '',
        employeeIdcard: '',
        employeePhone: '',
        employeePosition: '',
        employeeAddr: '',
        employeeIsSick: 0,
        employeeIsExp: 0,
        employeePayType: 1,
        employeePayBankAccount: '',
        employeePayAccount: '',
        employeePayBank: '',
        workMode: '',
        workPosition: '',
        workSkill: '',
        workProbationTypeValue: '',
        workProbationType: '',
        workDateStart: '',
        workDateEnd: '',
        paySalaryType: '',
        paySalaryTypeValue: '',
      },
      period: [],
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
        employeeName: [{ 
          required: true, message: '请输入乙方（雇员)姓名', trigger: 'blur',
        }],
        employeeIdcard: [{ 
          required: true, message: '请输入乙方（雇主)身份证号', trigger: 'blur',
        }],
        employeePhone: [{ 
          required: true, message: '请输入乙方（雇主)联系电话', trigger: 'blur',
        }],
        employeePosition: [{ 
          required: true, message: '请输入现有资格证书', trigger: 'blur',
        }],
        employeeAddr: [{ 
          required: true, message: '请输入甲方（雇主)地址', trigger: 'blur',
        }],
      },
    }
  },
  computed: {
    getTitle () {
      if (this.type === 'add') {
        return '合同新增'
      } else if (this.type === 'edit') {
        return '合同编辑'
      } else {
        return '合同查看'
      }
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