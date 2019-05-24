<template>
  <iep-result type="success" :description="description" :title="title">
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px">
      <iep-form-item label-name=" 借出组织">
        <iep-div-detail :value="data.outOrgName"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="支付方式">
        <iep-div-detail :value="dictsMap.borrowMoneyType[data.borrowMoneyType]"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="收款公司">
        <iep-div-detail :value="data.borrowInCompany"></iep-div-detail>
      </iep-form-item>
      <iep-form-item v-if="!bankAmountOption.disabled" label-name="收款账户">
        <iep-div-detail :value="data.borrowInCompanyBank"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款天数">
        <iep-div-detail :value="`${data.borrowDays}天`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <iep-div-detail :value="data.repaymentTime"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款利息">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-div-detail :value="`${data.amount}元`"></iep-div-detail>
      </iep-form-item>
      <template v-if="!data.isOut && data.status === 6">
        <a-divider />
        <iep-form-item label-name="还款公司">
          <iep-select v-model="borrowInRepayCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!repayBankAmountOption.disabled" label-name="还款账户">
          <iep-select v-model="borrowInRepayCompanyBankId" autocomplete="off" :prefix-url="repayBankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
        </iep-form-item>
      </template>
    </el-form>
    <template v-slot:action>
      <a-button v-if="!data.isOut && data.status === 6" type="primary" @click="handleRepay">还款</a-button>
      <a-button v-if="data.isOut && data.status === 10" type="primary" @click="handleConfirm">确认收款</a-button>
      <a-button style="margin-left: 8px" @click="handleBack">返回列表</a-button>
    </template>
  </iep-result>
</template>
<script>
import { repayOrgBorrow, confirmRepayOrgBorrow } from '@/api/fams/org_borrow'
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      submitLoading: false,
      borrowInRepayCompanyId: '',
      borrowInRepayCompanyBankId: '',
    }
  },
  computed: {
    title () {
      if (this.data.status === 8) {
        return '借款失败'
      } else if (this.data.status === 6) {
        return '确认成功'
      } else {
        return '操作成功'
      }
    },
    description () {
      if (this.data.status === 8) {
        return '具体原因请与借入方联系'
      } else if (this.data.status === 6) {
        return '已到账，请及时还款，切勿逾期！'
      } else {
        return ''
      }
    },
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === '1') {
        return {
          disabled: false,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    repayBankAmountOption () {
      if (this.borrowInRepayCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      }
    },
  },
  created () {
  },
  methods: {
    handleBack () {
      this.$emit('back')
    },
    async handleConfirm () {
      try {
        await this.$confirm('此操作将已收款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await confirmRepayOrgBorrow(this.data.id)
          if (data.data) {
            this.$message('操作成功')
            this.handleBack()
          } else {
            this.$message(data.msg)
          }
        } catch (error) {
          this.$message('似乎出现了一些问题')
        }
      } catch (error) {
        this.$message('操作取消')
      } finally {
        this.submitLoading = false
      }
    },
    async handleRepay () {
      try {
        await this.$confirm('此操作将还款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await repayOrgBorrow({
            id: this.data.id,
            borrowInRepayCompanyId: this.borrowInRepayCompanyId,
            borrowInRepayCompanyBankId: this.borrowInRepayCompanyBankId,
          })
          if (data.data) {
            this.$message('操作成功')
            this.handleBack()
          } else {
            this.$message(data.msg)
          }
        } catch (error) {
          this.$message('似乎出现了一些问题')
        }
      } catch (error) {
        this.$message('操作取消')
      } finally {
        this.submitLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../borrow.scss";
</style>