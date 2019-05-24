<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'合同详情'" width="50%" @close="loadPage">
    <el-form :model="formData" label-width="150px">
      <el-form-item label="合同名称：">
        <el-input v-model="formData.contractName" disabled></el-input>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：">
        <el-input type="textarea" v-model="formData.contractExpl" disabled></el-input>
      </el-form-item>
      <el-form-item label="业务类型：">
        <!-- <el-radio-group v-model="formData.businessType" disabled>
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group> -->{{infoList}}
      </el-form-item>
      <el-form-item label="合同标签：">
        <!-- <a-tag v-for="(item,index) in formData.tagKeyWords" :key="index">{{item}}</a-tag> -->
        <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签订日期：">
            <el-input v-model="formData.signTime" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：">
            <el-input v-model="formData.finishTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：">
            <el-input v-model="formData.companyName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：">
            <el-input v-model="formData.signCompanyRealName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署组织：">
            <el-input v-model="formData.signDeptOrgName.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：" disabled>
            <a-tag v-for="(item,index) in formData.underTakeDeptName" :key="index">{{item.name}}</a-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：">
            <el-input v-model="formData.Manager" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同金额：">
            <el-input v-model="formData.contractAmount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同级别：">
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel" disabled></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus" disabled></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="保证金：">
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
  </iep-drawer>
</template>
<script>
import { initFormData } from '../options'
import { mapGetters } from 'vuex'
import { downloadFile } from '@/api/common'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      drawerShow: false,
      formData: initFormData(),
      infoList: '',
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
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

