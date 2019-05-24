<template>
  <div class="iep-page-form project-relation">
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;">
      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="合同类型：" prop="contractType">
        <el-select v-model="formData.contractType" placeholder="请选择">
          <el-option v-for="(item, value) in dictsMap.contractType" :key="value" :label="item" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联项目：" prop="projectId">
        <el-input v-show="false" v-model="formData.projectId"></el-input>
        <el-tag type="info" v-if="formData.projectName != ''">{{formData.projectName}}</el-tag>
        <iep-button @click="relationProject"><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：">
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5 maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <!-- <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup.mlms_business_type" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group> -->
        <businessType v-model="formData.businessType"></businessType>
      </el-form-item>
      <el-form-item label="合同标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime" :picker-options="signTimeOption"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" :picker-options="finishTimeOption"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="formData.contractType==1">
        <el-col :span='12'>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <!-- <selectMore v-model="formData.companyOrgObj" prefix-url="crm/customer/myorcoll/list" @change="clientChange"></selectMore> -->
            <IepCrmsSelect 
              v-model="formData.companyOrgId" 
              :option="[{id: formData.companyOrgId, name: formData.companyName}]" 
              prefixUrl="crm/customer/myorcoll/list" 
              @change="clientChange">
            </IepCrmsSelect>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <!-- <selectMore v-model="formData.signCompanyOrgId" prefix-url="crm/customer/all/list"></selectMore> -->
            <IepCrmsSelect 
              v-model="formData.signCompanyOrgId" 
              :option="[{id: formData.signCompanyOrgId, name: formData.signCompanyRealName}]" 
              prefixUrl="crm/customer/all/list">
            </IepCrmsSelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签署组织：" prop="signDeptName">
            <!-- <iep-dept-select v-model="formData.signDeptName"></iep-dept-select> -->
            <el-input v-model="formData.signDeptName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="承接部门：" prop="underTakeDeptList">
            <iep-dept-multiple v-model="formData.underTakeDeptList"></iep-dept-multiple>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12' v-if="formData.contractType == 1">
          <el-form-item label="市场经理：" prop="directorId">
            <el-input v-model="formData.directorId" v-show="false"></el-input>
            <el-input v-model="formData.directorRealName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12' v-else>
          <el-form-item label="市场经理：" prop="directorList">
            <iep-contact-select v-model="formData.directorList"></iep-contact-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="合同金额" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="合同级别：" prop="contractLevel">
            <iep-dict-select v-model="formData.contractLevel" dict-name="mlms_contract_level"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select v-model="formData.contractStatus" dict-name="mlms_contract_status"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="保证金：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="保证金" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="合同附件上传：" prop="contractFileList">
        <iep-upload v-model="formData.contractFileList" :limit="limit"></iep-upload>
      </el-form-item>
    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>
    <projectDialog ref="project" @project-success="projectSuccess" :form="formData"></projectDialog>
  </div>
</template>
<script>
import { initFormData, rules, dictsMap } from './option'
import { mapGetters } from 'vuex'
import { getManeger, updateData, getDataById } from '@/api/mlms/material/datum/contract'
import projectDialog from './projectRelation'
import businessType from './businessType'

export default {
  components: { projectDialog, businessType },
  computed: {
    ...mapGetters(['userInfo', 'dictGroup']),
  },
  data () {
    return {
      loadState: false,
      dialogShow: false,
      methodName: '新增',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      directorList: [],
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
      limit: 1,
      signTimeOption: {
        disabledDate: (time) => {
          if (this.formData.finishTime) {
            return time.getTime() > +new Date(this.formData.finishTime)
          } else {
            return time.getTime() < 0
          }
        },
      },
      finishTimeOption: {
        disabledDate: (time) => {
          if (this.formData.signTime) {
            return time.getTime() < +new Date(this.formData.signTime)
          } else {
            return time.getTime() < 0
          }
        },
      },
    }
  },
  methods: {
    // 编辑
    open (id) {
      getDataById(id).then(({ data }) => {
        let row = data.data
        row.underTakeDeptList = row.underTakeDeptName // 承接部门
        if (row.contractType == 0) {
          row.directorList = {
            id: row.directorId,
            name: row.directorRealName,
          }
        }
        if (row.projectRelation) {
          row.projectId = row.projectRelation.id
          row.projectName = row.projectRelation.name
        }
        row.signDeptName = row.signDeptOrgName.name
        row.companyOrgObj = { id: row.companyOrgId, name: row.companyName }
        row.signCompanyOrgObj = { id: row.signCompanyOrgId, name: row.signCompanyRealName }
        this.formData = Object.assign({}, this.formData, row)
        this.methodName = '编辑'
        this.formRequestFn = updateData
      })
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.underTakeDeptId = this.formData.underTakeDeptList.map(m => m.id) // 承接部门
      this.formData.contractFile = this.formData.contractFileList.length > 0 ? this.formData.contractFileList[0].url : ''
      // 提交前需要处理下数据
      if (this.formData.contractType == 1) { // 外部合同
        // this.formData.companyOrgId = this.formData.companyOrgObj.id // 委托单位
        // this.formData.signCompanyOrgId = this.formData.signCompanyOrgObj.id // 签署单位
      } else { // 内部合同
        this.formData.directorId = this.formData.directorList.id
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.formRequestFn(this.formData).then(({data}) => {
            this.loadState = false
            if (data.data) {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.loadPage()
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 根据委托单位查询市场经理
    clientChange (val) {
      getManeger(val).then(({ data }) => {
        if (data.data) {
          this.formData.directorRealName = data.data.name
          this.formData.directorId = data.data.id
        } else {
          this.formData.directorRealName = ''
          this.formData.directorId = ''
        }
      })
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
  mounted () {
    this.formData.signDeptOrgId = this.userInfo.orgId
    this.formData.signDeptName = this.userInfo.orgName
  },
}
</script>

<style lang="scss" scoped>
.project-relation {
  .el-tag {
    margin-right: 10px;
  }
}
</style>
