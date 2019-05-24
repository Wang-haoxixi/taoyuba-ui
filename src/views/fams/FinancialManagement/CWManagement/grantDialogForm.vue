<template>
  <iep-dialog :dialog-show="dialogShow" title="发放" width="520px" @close="close">
    <el-form size="small" ref="form" label-width="150px">
      <el-form-item label="选择线下公司：">
        <iep-select v-model="form.offlineCompany" autocomplete="off" prefix-url="fams/company" placeholder="请选择线下公司"></iep-select>
      </el-form-item>
      <el-form-item label="支付类型：">
        <el-radio-group v-model="form.payType">
          <el-radio :label="1">银行</el-radio>
          <el-radio :label="0">现金</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!bankAmountOption.disabled" label="选择银行账户：">
        <iep-select v-model="form.bankAmount" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </el-form-item>
      <el-form-item label="备注：">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">发放</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { grantWithdrawBatch } from '@/api/fams/withdraw'
import { initGrantForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      form: initGrantForm(),
    }
  },
  computed: {
    bankAmountOption () {
      if (this.form.offlineCompany && this.form.payType) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.offlineCompany}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.form.offlineCompany}`,
        }
      }
    },
  },
  methods: {
    submitForm () {
      grantWithdrawBatch(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
    close () {
      this.dialogShow = false
      this.form = initGrantForm()
      this.$emit('load-page')
    },
  },
}
</script>

