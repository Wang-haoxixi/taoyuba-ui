<template>
  <div class="contract">
    <basic-container>
      <page-header :title="getTitle"></page-header>
      <el-form :disabled="type !== 'add' && type !== 'edit'"
               :model="formData" size="small"
               ref="form" label-width="200px"
               :rules="rules"
               class="form">
        <el-form-item label="甲方（雇主方）">
          <el-row>
            <el-col :span="12">
              <el-form-item label="船名：" prop="shipName">
                <el-input maxlength="20" v-model="formData.shipName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所有权登记号：" prop="shipLicenses">
                <el-input maxlength="30" v-model="formData.shipLicenses"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性质：">
                <el-radio v-for="item in shipAttrDict" :key="item.value" v-model="formData.shipAttr" :label="parseInt(item.value)">{{item.label}}</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="船舶所有人：" prop="shipowner">
                <el-select v-model="formData.shipowner"
                           placeholder="请选择"
                           filterable
                           remote
                           maxlength="20"
                           :loading="loading"
                           allow-create
                           clearable
                           @change="shipownerChange"
                           :remote-method="getShipOwnerList">
                  <el-option v-for="item in shipowners" :key="item.id" :label="item.realName + '(身份证：' + item.idcard + ')'" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号：">
                <el-input maxlength="20" :value="formData.shipownerIdcard" @input="ValidateIdCard('shipownerIdcard', $event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：">
                <el-input maxlength="20" :value="formData.shipownerPhone" @input="ValidatePhone('shipownerPhone', $event)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="家庭地址：">
                <el-input maxlength="100" v-model="formData.shipownerAddr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="委托代理人：">
                <el-input maxlength="20" v-model="formData.shipownerAgent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="代理人身份证号：">
                <el-input maxlength="20" :value="formData.shipownerAgentIdcard"  @input="ValidateIdCard('shipownerAgentIdcard', $event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="代理人联系电话：">
                <el-input maxlength="20" :value="formData.shipownerAgentPhone" @input="ValidatePhone('shipownerAgentPhone', $event)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="代理人家庭地址：">
                <el-input maxlength="100" v-model="formData.shipownerAgentAddr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="乙方（雇员）">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="employeeName">
                <el-select v-model="formData.employeeName"
                           placeholder="请选择"
                           filterable
                           remote
                           :loading="loading"
                           allow-create
                           clearable
                           @change="employeeChange"
                           :remote-method="getEmployeeList">
                  <el-option v-for="item in employees" :key="item.id" :label="item.realName + '(身份证：' + item.idcard + ')'" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号：" prop="employeeIdcard">
                <el-input :value="formData.employeeIdcard" @input="ValidateIdCard('employeeIdcard', $event)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：">
                <el-input maxlength="20" :value="formData.employeePhone" @input="ValidatePhone('employeePhone', $event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现有资格证书：">
                <el-input maxlength="200" v-model="formData.employeeCert"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经常居住地/家庭地址：" prop="employeeAddr">
                <el-input maxlength="100" v-model="formData.employeeAddr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭联系人：">
                <el-input maxlength="20" v-model="formData.employeeLinkMan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="乙方家庭联系人电话：">
                <el-input maxlength="20" :value="formData.employeeLinkPhone" @input="ValidatePhone('employeeLinkPhone', $event)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="支付方式：">
                <el-radio v-for="item in employeePayTypeDict" :key="item.value" v-model="formData.employeePayType" :label="parseInt(item.value)">{{item.label}}</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付账号：">
                <el-input maxlength="50" v-model="formData.employeePayAccount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="合同期限">
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型：">
                <el-radio v-for="item in periodTypeDict" :key="item.value" v-model="formData.periodType" :label="parseInt(item.value)">{{item.label}}</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div v-show="formData.periodType == 1">
                <el-form-item label="开始时间：">
                  <iep-date-picker v-model="formData.periodDateStart"></iep-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                  <iep-date-picker v-model="formData.periodDateEnd"></iep-date-picker>
                </el-form-item>
              </div>
              <div v-show="formData.periodType == 2">
                <el-form-item label="登船港口：">
                  <el-input maxlength="20" v-model="formData.periodPortStart"></el-input>
                </el-form-item>
                <el-form-item label="下船港口：">
                  <el-input maxlength="20" v-model="formData.periodPortEnd"></el-input>
                </el-form-item>
              </div>
              <div v-show="formData.periodType == 3">
                <el-form-item label="工作内容及时间：">
                  <el-input maxlength="200" type="textarea" v-model="formData.periodWorkContent"></el-input>
                </el-form-item>
                <el-form-item label="任务完成标志：">
                  <el-input maxlength="200" type="textarea" v-model="formData.periodWorkSuccess"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="劳务报酬">
          <el-form-item label="计算方式：">
            <el-radio
                    v-for="(item, index) in payComputeTypeDict"
                    v-show="computeTypeShow(index)"
                    :key="index"
                    v-model="formData.payComputeType"
                    :label="parseInt(item.value)">{{item.label}}</el-radio>
            <div>
              <span style="margin-right: 20px;">{{getDateUnion}}</span>
              <el-input maxlength="10" class="w-200" style="margin-left: 0;" :value="formData.payMoney" @input="inputFloat('payMoney', $event)"></el-input>
              <span>元（大写：{{moneyTransilate(formData.payMoney)}}）</span>
            </div>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-radio v-for="item in payTypeDict" :key="item.value" v-model="formData.payType" :label="parseInt(item.value)">{{item.label}}</el-radio>
            <div v-show="formData.payType === 1">
              <span>每月</span>
              <el-input class="w-200" v-show="formData.payType !== 3" :value="formData.payTypeValue" maxlength="2" @input="inputNum('payTypeValue', $event, 31)"></el-input>
              <span>号支付</span>
            </div>
            <div v-show="formData.payType === 2">
              <span>期限结束、航次完成或工作任务完成后的</span>
              <el-input class="w-200" v-show="formData.payType !== 3" :value="formData.payTypeValue" maxlength="3" @input="inputNum('payTypeValue', $event, 999)"></el-input>
              <span>日内支付</span>
            </div>
          </el-form-item>
        </el-form-item>
        <el-form-item label="工作内容">
          <el-input maxlength="200" type="textarea" v-model="formData.workContent"></el-input>
        </el-form-item>
        <el-form-item label="特别约定">
          <el-input maxlength="200" type="content" v-model="formData.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;padding: 20px 0;">
        <iep-button style="margin-right: 20px;" :disabeld="false" v-show="type === 'add' || type === 'edit'" type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button :disabeld="false" @click="handleBack">返回</iep-button>
      </div>
    </basic-container>
  </div>
</template>

<script>
import IepDatePicker from '@/components/IepForm/DatePicker'
import { getContract, addContract, editContract, getDict } from '@/api/tmlms/contract'
import { getShipOwners } from '@/api/mlms/shipowner'
import { getEmployees } from '@/api/mlms/employee'
import debounce from 'lodash/debounce'
export default {
  components: {
    IepDatePicker,
  },
  data () {
    this.getShipOwnerList = debounce(this.getShipOwnerList, 800)
    this.getEmployeeList = debounce(this.getEmployeeList, 800)
    return {
      formData: {
        shipName: '',
        shipLicenses: '',
        shipAttr: 1,
        shipownerId: '',
        shipowner: '',
        shipownerIdcard: '',
        shipownerPhone: '',
        shipownerAddr: '',
        shipownerAgent: '',
        shipownerAgentIdcard: '',
        shipownerAgentPhone: '',
        shipownerAgentAddr: '',
        employeeName: '',
        employeeId: '',
        employeeIdcard: '',
        employeePhone: '',
        employeeCert: '',
        employeeAddr: '',
        employeeLinkMan: '',
        employeeLinkPhone: '',
        employeePayType: '',
        employeePayAccount: '',
        periodType: '',
        periodPortStart: '',
        periodPortEnd: '',
        periodDateStart: '',
        periodDateEnd: '',
        periodWorkContent: '',
        periodWorkSuccess: '',
        workContent: '',
        payComputeType: '',
        payMoney: '',
        payType: '',
        payTypeValue: '',
      },
      shipowners: [],
      employees: [],
      loading: false,
      rules: {
        shipName: [
          {
            required: true, message: '请输入船名',
            trigger: 'blur',
          },
        ],
        shipLicenses: [
          {
            required: true, message: '所有权登记号',
            trigger: 'blur',
          },
        ],
        shipowner: [
          {
            required: true, message: '船舶所有人',
            trigger: 'blur',
          },
        ],
        employeeIdcard: [
          {
            required: true, message: '请输入雇员身份证号',
            trigger: 'blur',
          },
        ],
        employeeAddr: [
          {
            required: true, message: '请输入雇员地址',
            trigger: 'blur',
          },
        ],
        employeeName: [
          {
            required: true, message: '请输入雇员姓名',
            trigger: 'blur',
          },
        ],
      },
      shipAttrDict: [],
      employeePayTypeDict: [],
      periodTypeDict: [],
      payComputeTypeDict: [],
      payTypeDict: [],
    }
  },
  props: {
    record: {},
    type: {},
  },
  created () {
    if (this.record) {
      this.getContract()
    }
    this.getDicts()
  },
  methods: {
    computeTypeShow (index) {
      if (this.formData.periodType === 1 && index < 2) {
        return true
      } else if (this.formData.periodType === 2 && index === 2) {
        return true
      } else if (this.formData.periodType === 3 && index === 3){
        return true
      } else {
        return false
      }
    },
    inputNum (target, value, max) {
      if (value) {
        this.formData[target] = parseInt(value) > max ? this.formData[target] : parseInt(value)
      } else {
        this.formData[target] = ''
      }
    },
    inputFloat (target, value, max) {
      if (value) {
        this.formData[target] = parseInt(value) > max ? this.formData[target] : parseInt(value)
      } else {
        this.formData[target] = ''
      }
    },
    ValidatePhone (target, val) {
      let isPhone = /^[\d|-]{0,20}$/ //手机号码
      if(isPhone.test(val)){
        this.formData[target] = val
      }
    },
    ValidateIdCard (target, val) {
      let idCard = /^\d{0,18}$/
      let idCard1 = /^\d{17}X$/
      if(idCard.test(val) || idCard1.test(val)){
        this.formData[target] = val
      }
    },
    moneyTransilate (number) {
      if (number == '') {
        return ''
      }
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(number)) {
        return '数据非法'
      }
      let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分'
      let str = ''
      number += '00'
      var p = number.indexOf('.')
      if (p >= 0) {
        number = number.substring(0, p) + number.substr(p + 1, 2)
      }
      unit = unit.substr(unit.length - number.length)
      for (var i=0; i < number.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(number.charAt(i)) + unit.charAt(i)
      }
      return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|元)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^元零?|零分/g, '').replace(/(元|角)$/g, '$1整')
    },
    getDicts () {
      getDict('tyb_contract_ship_attr').then(({data}) => {
        if (data.code === 0) this.shipAttrDict = data.data
      })
      getDict('tyb_contract_employee_pay_type').then(({data}) => {
        if (data.code === 0) this.employeePayTypeDict = data.data
      })
      getDict('tyb_contract_period_type').then(({data}) => {
        if (data.code === 0) this.periodTypeDict = data.data
      })
      getDict('tyb_contract_pay_compute_type').then(({data}) => {
        if (data.code === 0) this.payComputeTypeDict = data.data
      })
      getDict('tyb_contract_pay_type').then(({data}) => {
        if (data.code === 0) this.payTypeDict = data.data
      })
    },
    getDictValue (data, key) {
      for (let i = data.length; i--;) {
        if (data[i].value === key) return data[i].label
      }
      return null
    },
    getContract () {
      getContract(this.record).then(({data}) => {
        if (data.code == 0) {
          this.formData = data.data
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    formDataVerification () {
      let verification = true
      for (let key in this.rules) {
        if (this.formData[key] === '') {
          this.$message.error(this.rules[key][0].message)
          return false
        }
      }
      return verification
    },
    handleSubmit () {
      if (this.formDataVerification()) {
        if (this.type === 'add') {
          addContract(this.formData).then(data => {
            if (data.data.code === 0) {
              this.$message.success('添加成功！')
              this.$emit('onGoBack')
            }
          }, (error) => {
            this.$message.error(error.message)
          })
        } else if (this.type === 'edit') {
          editContract(this.formData).then(data => {
            if (data.data.code === 0) {
              this.$message.success('编辑成功！')
              this.$emit('onGoBack')
            }
          }, (error) => {
            this.$message.error(error.message)
          })
        }
      }
    },
    handleBack () {
      this.$emit('onGoBack')
    },
    getShipOwnerList (name) {
      this.loading = true
      if (name !== '') {
        getShipOwners(name).then(({data}) => {
          if (data.code === 0) {
            this.shipowners = data.data.records
          }
        })
      } else {
        this.shipowners = []
      }
      this.loading = false
    },
    shipownerChange (owner) {
      if (typeof owner === 'object') {
        this.refreshShipowner(owner)
      } else {
        this.refreshShipowner({realName: owner, userId: 0})
      }
    },
    refreshShipowner (owner) {
      let {address = '', idcard = '', phone = '', realName = '', userId = ''} = owner
      this.formData.shipowner = realName
      this.formData.shipownerIdcard = idcard
      this.formData.shipownerPhone = phone
      this.formData.shipownerAddr = address
      this.formData.shipownerId = userId
    },
    getEmployeeList (name) {
      this.loading = true
      if (name !== '') {
        getEmployees(name).then(({data}) => {
          if (data.code === 0) {
            this.employees = data.data.records
          }
        })
      } else {
        this.employees = []
      }
      this.loading = false
    },
    employeeChange (employee) {
      if (typeof employee === 'object') {
        this.refreshEmployee(employee)
      } else {
        this.refreshEmployee({realName: employee, userId: 0})
      }
    },
    refreshEmployee (employee) {
      let {address = '', idcard = '', phone = '', realName = '', userId = '', crewCert = '', contactName = '', contactPhone = ''} = employee
      this.formData.employeeIdcard = idcard
      this.formData.employeePhone = phone
      this.formData.employeeCert = crewCert
      this.formData.employeeAddr = address
      this.formData.employeeLinkMan = contactName
      this.formData.employeeLinkPhone = contactPhone
      this.formData.employeeName = realName
      this.formData.employeeId = userId
    },
  },
  watch: {
    'formData.employeePayType': function (newVal, oldVal) {
      if (oldVal !== '') {
        this.formData.employeePayAccount = ''
        this.formData.employeePayTypeName = this.getDictValue(this.employeePayTypeDict, newVal)
      }
    },
    'formData.periodType': function (newVal, oldVal) {
      if (oldVal !== '') {
        this.formData.periodWorkContent = ''
        this.formData.periodWorkSuccess = ''
        this.formData.periodPortStart = ''
        this.formData.periodPortEnd = ''
        this.formData.periodDateStart = ''
        this.formData.periodDateEnd = ''
        this.formData.payMoney = ''
        this.formData.periodTypeName = this.getDictValue(this.periodTypeDict, newVal)
      }
      if (newVal === 1) {
        this.formData.payComputeType = 1
      } else if (newVal === 2) {
        this.formData.payComputeType = 3
      } else if (newVal === 3){
        this.formData.payComputeType = 4
      }
    },
    'formData.payComputeType': function (newVal, oldVal) {
      if (oldVal !== '') {
        this.formData.payMoney = ''
        this.formData.payComputeTypeName = this.getDictValue(this.payComputeTypeDict, newVal)
      }
    },
    'formData.payType': function (newVal, oldVal) {
      if (oldVal !== '') {
        this.formData.payTypeValue = ''
        this.formData.payTypeName = this.getDictValue(this.payTypeDict, newVal)
      }
    },
    'formData.shipAttr': function (newVal, oldVal) {
      if (oldVal !== '') {
        this.formData.shipAttrName = this.getDictValue(this.shipAttrDict, newVal)
      }
    },
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
    getDateUnion () {
      if (this.formData.payComputeType == 1) {
        return '每月人民币'
      } else if (this.formData.payComputeType == 2 || this.formData.payComputeType == 3) {
        return '每天人民币'
      } else {
        return ''
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