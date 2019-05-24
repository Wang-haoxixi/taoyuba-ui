<template>
  <iep-dialog :dialog-show="dialogShow" title="详情" width="700px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px" disabled>

      <el-form-item label="支出类型：">
        <iep-div-detail :value="form.typeValue"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出时间：">
        <iep-div-detail :value="form.createTime"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出组织：">
        <iep-div-detail :value="form.orgName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出方式：">
        <iep-div-detail :value="dictsMap.expenditureMode[form.expenditureMode]"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出公司：">
        <iep-div-detail :value="form.companyName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="银行户头：">
        <iep-div-detail :value="form.accountName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="关联合同：">
        <iep-div-detail :value="form.protocolName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出金额：">
        <iep-div-detail :value="form.amount"></iep-div-detail>
      </el-form-item>

      <el-form-item label="税率：">
        <iep-div-detail :value="form.taxRate+'%'"></iep-div-detail>
      </el-form-item>

      <el-form-item v-if="form.parentType==='17'" label="计息比率：">
        <iep-div-detail :value="form.interestRate+'%'"></iep-div-detail>
      </el-form-item>

      <el-form-item v-if="form.parentType==='23'" label="预计退款时间：">
        <iep-div-detail :value="form.estimatedRefundTime"></iep-div-detail>
      </el-form-item>

      <el-form-item label="备注：">
        <iep-div-detail :value="form.remarks"></iep-div-detail>
      </el-form-item>

    </el-form>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      form: initForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
