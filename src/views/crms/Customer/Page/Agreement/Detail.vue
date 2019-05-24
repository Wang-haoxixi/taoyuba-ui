<template>
  <div>
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" style="margin-bottom: 50px;">
      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。" disabled></el-input>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：" prop="contractExpl">
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5 disabled></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <!-- <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group> -->{{infoList}}
      </el-form-item>
      <el-form-item label="合同标签：" prop="tagKeyWords">
        <!-- <iep-tag v-model="formData.tagKeyWords"></iep-tag> -->
        <!-- <a-tag v-for="(item,index) in formData.tagKeyWords" :key="index">{{item}}</a-tag> -->
        <iep-tag-detail v-model="formData.tagKeyWords" disabled></iep-tag-detail>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime" disabled></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" disabled></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <iep-select prefix-url="crm/customer" v-model="formData.companyOrgId" disabled></iep-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <iep-select prefix-url="crm/customer" v-model="formData.signCompanyOrgId" disabled></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署组织：" prop="signDeptOrgName">
            <el-input v-model="formData.signDeptOrgName.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：" prop="underTakeDeptName">
            <a-tag v-for="(item,index) in formData.underTakeDeptName" :key="index">{{item.name}}</a-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：" prop="Manager">
            <el-input v-model="formData.Manager" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="合同金额" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同级别：" prop="contractLevel">
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel" disabled></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus" disabled></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="保证金：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="保证金" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同附件：">
            <span v-for="(item, index) in formData.contractFileList" :key="index">
              <i class="icon-fujian"></i>{{item.name}} <iep-button type="text" @click="downloadFile(item)">下载</iep-button>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <footer-toolbar>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules } from './options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapGetters } from 'vuex'
import { agreementById } from '@/api/crms/agreement'
import { getObj } from '@/api/admin/user'
import { downloadFile } from '@/api/common'
export default {
  components: { FooterToolbar },
  data () {
    return {
      dialogShow: false,
      methodName: '详情',
      formRequestFn: () => { },
      id: '',
      contractId: '',
      formData: initFormData(),
      rules: rules,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('detail')
        },
      },
      infoList: '',
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
    add: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.contractId = this.add.contractId
    agreementById(this.contractId).then(res => {
      this.formData = res.data.data
      // 业务类型处理
      let businessType = res.data.data.businessType.split(','), list = []
      for (let type of businessType) {
        for (let item of this.dictGroup.prms_business_type) {
          for (let t of item.children) {
            if (t.value == type) {
              list.push(t.label)
            }
          }
        }
      }
      this.infoList = list.toString()
      getObj(this.formData.directorId).then(res => {
        this.$set(this.formData, 'Manager', res.data.data.realName)
      })
    })
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.$emit('detail')
    },
    // 下载附件
    downloadFile (obj) {
      downloadFile({
        url: obj.url,
        name: obj.name,
      })
    },
  },
}
</script>
