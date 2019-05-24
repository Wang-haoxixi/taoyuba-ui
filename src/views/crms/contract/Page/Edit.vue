<template>
  <div class="wrap">
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="170px" style="margin-bottom: 50px;">
      <el-form-item prop="contractName">
        <span slot="label">
          合同名称
          <iep-tip :content="tipContent.contractName"></iep-tip>
          :
        </span>
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。"></el-input>
      </el-form-item>
      <el-form-item prop="contractExpl">
        <span slot="label">
          合同说明 / 收款方式
          <iep-tip :content="tipContent.contractExpl"></iep-tip>
          :
        </span>
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5></el-input>
      </el-form-item>
      <el-form-item label="关联项目：" prop="projectId">
        <el-input v-show="false" v-model="formData.projectId"></el-input>
        <el-tag type="info" v-if="formData.projectName != ''">{{formData.projectName}}</el-tag>
        <iep-button @click="relationProject"><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      <el-form-item prop="businessType">
        <span slot="label">
          业务类型
          <iep-tip :content="tipContent.businessType"></iep-tip>
          :
        </span>
        <!-- <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group> -->
        <businessType v-model="formData.businessType"></businessType>
      </el-form-item>
      <el-form-item prop="tagKeyWords">
        <span slot="label">
          合同标签
          <iep-tip :content="tipContent.tagKeyWords"></iep-tip>
          :
        </span>
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime" @change="startChange(formData.signTime)" placeholder="请选择实际签订合同日期"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" @change="endChange(formData.finishTime)" placeholder="请选择合同中签订的完结时间"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <iep-select prefix-url="crm/customer/myorcolllabel" v-model="formData.companyOrgId" @change="handleChange(formData.companyOrgId)" placeholder="请选择该项目实际服务对象"></iep-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <iep-select prefix-url="crm/customer" v-model="formData.signCompanyOrgId" placeholder="请选择实际与我司签订合同的单位"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签署组织：" prop="signDeptOrgName">
            <!-- <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select> -->
            <el-input v-model="formData.signDeptName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="承接部门：">
            <iep-dept-multiple v-model="formData.underTakeDeptName"></iep-dept-multiple>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="市场经理：" prop="Manager">
            <el-input v-model="formData.Manager" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="请填写合同约定的金额，以“元”为单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="合同级别：" prop="contractLevel">
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="保证金：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="请根据缴纳保证金额填写"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="合同附件上传：" prop="contractFileList">
          <iep-upload v-model="formData.contractFileList" :limit="limit"></iep-upload>
        </el-form-item>
      </el-row>
    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
    <projectDialog ref="project" @project-success="projectSuccess" :form="formData"></projectDialog>
  </div>
</template>
<script>
import { initFormData, rules } from '../options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapGetters } from 'vuex'
import { getDataById } from '@/api/crms/contract'
import { getMarket } from '@/api/crms/customer'
import { getObj } from '@/api/admin/user'
import businessType from './businessType'
import projectDialog from './projectRelation'
const tipContent = {
  contractName: '合同签订日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”',
  contractExpl: '1、合同说明：请详细说明签订合同时承诺客户或需要注意的地方；<br>2、收款方式：付款周期+付款方式，如三期付款+对公;<br>3、开票资料信息。',
  businessType: '咨询：规划/行动计划/工作方案/课题研究/标准规范/管理制度/整体解决方案/评测;<br>产品：DNA/DIPS/营商通/咨询服务产品化;<br>数据：数据采集/普查/编目/标准化/开放共享/应用服务/主题库、基础库建设/事项材料梳理/主题清单规范优化、再造;<br>外包：软件/平台/服务;<br>会议培训：研讨会/招商合作/培训会;<br>平台：平台新建/平台升级;<br>技术服务：网站/平台/软件;<br>其他：自定义填写',
  tagKeyWords: '1、合同标签要与合作项目/产品关联，其中合作项目简称，合作产品，客户简称等必须作为标签；<br>2、标签次序按照重要性排序；<br>3、标签数量必须3个以上。',

}
export default {
  components: { FooterToolbar, businessType, projectDialog },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      tipContent,
      dialogShow: false,
      methodName: '',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      id: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          // this.$emit('load-page', true)
          this.$emit('onGoBack')
        },
      },
      signTime: '',
      finishTime: '',
      isTime: true,
      limit: 1,
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dictGroup']),
  },
  created () {
    this.formRequestFn = this.record.formRequestFn
    this.methodName = this.record.methodName
    this.id = this.record.id
    this.formData.signDeptOrgId = this.userInfo.orgId
    this.formData.signDeptName = this.userInfo.orgName
    if (this.id) {
      getDataById(this.id).then(res => {
        this.formData = res.data.data
        this.signTime = res.data.data.signTime
        this.finishTime = res.data.data.finishTime
        this.formData.signDeptOrgId = this.userInfo.orgId
        this.formData.signDeptName = this.userInfo.orgName
        this.formData.projectName = res.data.data.projectRelation.name
        this.formData.projectId = res.data.data.projectRelation.id
        getObj(this.formData.directorId).then(res => {
          this.$set(this.formData, 'Manager', res.data.data.realName)
        })
      })
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initFormData()
      this.$emit('onGoBack')
    },
    handleChange (val) {
      getMarket({ clientId: val }).then((res) => {
        this.formData.directorId = res.data.data.id
        this.formData.Manager = res.data.data.name
      })
    },
    submitForm (formName) {
      this.formData.contractFile = this.formData.contractFileList.length > 0 ? this.formData.contractFileList[0].url : ''
      let formData = Object.assign({}, this.formData)
      formData.underTakeDeptId = this.formData.underTakeDeptName.map(m => m.id)
      formData.directorId = this.formData.directorId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isTime) {
            this.formRequestFn(formData).then(() => {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('onGoBack')
              this.loadPage()
            })
          } else {
            this.$message.error('签订日期不能晚于完结日期')
          }
        } else {
          return false
        }
      })
    },
    dealTime (val1, val2) {
      var str1 = val1.replace(/-/g, '/')
      var time1 = Date.parse(new Date(str1))
      var str2 = val2.replace(/-/g, '/')
      var time2 = Date.parse(new Date(str2))
      if (time2 < time1) {
        this.$message.error('签订日期不能晚于完结日期')
        this.isTime = false
      } else {
        this.isTime = true
      }
    },
    startChange (val) {
      this.signTime = val
      this.dealTime(val, this.finishTime)
    },
    endChange (val) {
      this.finishTime = val
      this.dealTime(this.signTime, val)
    },
    // 关联项目
    relationProject () {
      this.$refs['project'].open(this.formData.projectId, this.formData.projectName)
    },
    projectSuccess (id, name) {
      this.formData.projectId = id
      // this.formData.projectName = name
      this.$set(this.formData, 'projectName', name)
    },
  },
}
</script>
<style>
.wrap {
  padding: 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>

