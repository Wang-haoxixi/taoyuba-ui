<template>
  <iep-dialog title="新增" :dialog-show="dialogShow" width="520px" @close="loadPage">
    <el-form :model="form" size="small" label-width="160px">
      <el-form-item label="银行户头名称：">
        <el-input v-model="form.accountName" autocomplete="off" placeholder="请输入银行户头名称"></el-input>
      </el-form-item>
      <el-form-item label="户头所属公司：">
        <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择户头所属公司"></iep-select>
      </el-form-item>
      <el-form-item label="是否为工资支付账户：">
        <el-switch v-model="form.isWagePay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否为开票账户：">
        <el-switch v-model="form.isInvoiceingPay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">确 定</iep-button>
      <iep-button @click="loadPage">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      form: initForm(),
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    handleSubmit () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    loadPage () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
  },
}
</script>
