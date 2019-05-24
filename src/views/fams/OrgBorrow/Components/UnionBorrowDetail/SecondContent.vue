<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px" disabled>
      <a-alert :closable="true" type="error" message="确认借款申请后，将向借出方组织发出借款申请。" style="margin-bottom: 24px;" />
      <iep-form-item label-name="支付方式">
        <el-radio-group v-model="data.borrowMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.borrowMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="收款公司">
        <iep-select v-model="data.borrowInCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
      </iep-form-item>
      <iep-form-item v-if="!bankAmountOption.disabled" label-name="收款账户">
        <iep-select v-model="data.borrowInCompanyBankId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="还款天数(天)">
        <iep-input-number v-model="data.borrowDays" :precision="0"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <iep-date-picker v-model="data.repaymentTime" type="date" placeholder="选择日期" disabled></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="借款利息">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-input-number v-model="data.borrowAmount"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
        提交
      </a-button>
      <a-button style="margin-left: 8px" @click="handlePrev">
        上一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { postOrgBorrow } from '@/api/fams/org_borrow'
import { dictsMap } from './options'
export default {
  props: ['data'],
  components: { StepsContent },
  data () {
    return {
      dictsMap,
      submitLoading: false,
    }
  },
  computed: {
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.data.borrowInCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.data.borrowInCompanyId}`,
        }
      }
    },
  },
  created () {
  },
  methods: {
    handlePrev () {
      this.$emit('prev')
    },
    async handleSubmit () {
      this.submitLoading = true
      try {
        const { data } = await postOrgBorrow(this.data)
        if (data.data) {
          this.$emit('on-data', data.data)
        } else {
          this.$message(data.msg)
        }
      } catch (error) {
        this.$message('似乎出现了一些问题')
      }
      this.submitLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../borrow.scss";
</style>