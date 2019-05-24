<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :model="form" label-width="150px">
      <iep-form-item label-name="借出组织">
        <iep-select v-model="form.borrowOutOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织借款"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="支付方式">
        <el-radio-group v-model="form.borrowMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.borrowMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="收款公司">
        <iep-select v-model="form.borrowInCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
      </iep-form-item>
      <iep-form-item v-if="!bankAmountOption.disabled" label-name="收款账户">
        <iep-select v-model="form.borrowInCompanyBankId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="还款天数(天)">
        <iep-input-number v-model="form.borrowDays" :precision="0"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <iep-date-picker v-model="form.repaymentTime" type="date" placeholder="选择日期" disabled></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="借款利息">
        <iep-div-detail :value="`${form.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-input-number v-model="form.borrowAmount"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleSubmit">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import { mapGetters } from 'vuex'
import StepsContent from './StepsContent'
import { dictsMap, initForm, calculaterDate } from './options'
export default {
  components: { StepsContent },
  data () {
    return {
      form: {},
      dictsMap,
    }
  },
  computed: {
    ...mapGetters(['famsConfig']),
    bankAmountOption () {
      if (this.form.borrowInCompanyId && this.form.borrowMoneyType === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.borrowInCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.form.borrowInCompanyId}`,
        }
      }
    },
  },
  created () {
    this.form = initForm(this.famsConfig)
  },
  methods: {
    handleSubmit () {
      this.$emit('on-data', this.form)
    },
  },
  watch: {
    'form.borrowDays': function (n) {
      this.form.repaymentTime = calculaterDate(n)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../borrow.scss";
</style>