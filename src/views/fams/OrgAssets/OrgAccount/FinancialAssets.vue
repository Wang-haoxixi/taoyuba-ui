<template>
  <iep-fams-card title="财务资产">
    <template slot="right">
      <div style="width: 350px;">
        <iep-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small">
        </iep-date-picker>
      </div>
    </template>
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in financialData" :key="index">
        <div class="value">{{item | parseToMoney}}</div>
        <div class="label"><a href="#" @click="$openPage(typeUrlMap[index])">{{index}}</a></div>
      </div>
    </div>
  </iep-fams-card>
</template>
<script>
import { getAssetsByDate } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      rangeTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      financialData: {
        '可用金额': 6325.5,
        '银行存款': 6325.5,
        '库存现金': 6325.5,
        '集团往来': 6325.5,
        '组织拆借': 6325.5,
        '合同应收账款': 6325.5,
        '其他应收款': 6325.5,
      },
      typeUrlMap: {
        '可用金额': '/fams/org_assets/org_account',
        '银行存款': '/fams/financial_management/bank_deposit_journal',
        '库存现金': '/fams/financial_management/cash_journal',
        '集团往来': '/fams/financial_management/group_current_ccount',
        '合同应收账款': '/fams_spa/accounts_receivable',
        '其他应收款': '/fams_spa/other_receivables',
        '组织拆借': '/fams/org_borrow/org_borrow',
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getAssetsByDate(this.rangeTime)
      const realData = data.data
      this.financialData['可用金额'] = realData.availableBalance
      this.financialData['银行存款'] = realData.bankDeposit
      this.financialData['库存现金'] = realData.cashInStock
      this.financialData['集团往来'] = realData.groupContacts
      this.financialData['合同应收账款'] = realData.contractualReceive
      this.financialData['其他应收款'] = realData.other
      this.financialData['组织拆借'] = realData.borrow
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
</style>
