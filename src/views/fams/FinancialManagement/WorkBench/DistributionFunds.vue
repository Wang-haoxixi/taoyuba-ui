<template>
  <iep-fams-card title="财务资产统计">
    <template slot="right">
      <div style="width: 350px;">
        <iep-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small">
        </iep-date-picker>
      </div>
    </template>
    <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors"></ve-histogram>
  </iep-fams-card>
</template>
<script>
import { getAssetsByDate } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    this.colors = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#da8a8d', '#e09c9e', '#e8adaf', '#f7c6c8', '#ffdfe0']
        return colorList1[paramsA.dataIndex]
      },
      (paramsB) => {
        var colorList2 = ['#f58f44', '#f79349', '#f79a55', '#f9a261', '#f7af78', '#f9b37f', '#fdc296', '#fdd1b0']
        return colorList2[paramsB.dataIndex]
      },
    ]
    this.chartSettings = {
      metrics: ['资金'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },

    }
    this.chartExtend = {
      barWidth: '26',
      itemStyle: {
        barBorderRadius: 13,
      },
    }
    return {
      rangeTime: [],
      columnsMap: [],
      chartData: {
        columns: ['dept', '资金'],
        rows: [
          { 'dept': '货币资金', '资金': 38 },
          { 'dept': '集团往来账', '资金': 52 },
          { 'dept': '注册资本', '资金': 61 },
          { 'dept': '有形资产', '资金': 145 },
          { 'dept': '无形资产', '资金': 48 },
          { 'dept': '应收款', '资金': 38 },
          { 'dept': '其他', '资金': 38 },
        ],
      },
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
        '银行存款': 6325.5,
        '库存现金': 6325.5,
        '集团往来': 6325.5,
        '合同应收账款': 6325.5,
        '融资': 6325.5,
        '投资': 6325.5,
        '其他应收款': 6325.5,
        '组织拆借': 6325.5,
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
      this.financialData['银行存款'] = realData.bankDeposit
      this.financialData['库存现金'] = realData.cashInStock
      this.financialData['集团往来'] = realData.groupContacts
      this.financialData['合同应收账款'] = realData.contractualReceive
      this.financialData['融资'] = realData.financing
      this.financialData['投资'] = realData.investment
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
      color: #999;
    }
  }
}
</style>
