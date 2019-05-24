<template>
  <div>
    <basic-container>
      <page-header title="银行存款日记账" :replaceText="replaceText" :data="['国脉海洋']"></page-header>
      <operation-container>
        <template slot="left">
          <div class="table-heading">舟山国脉海洋舟山建行支行（工资支出）2019年四月</div>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="关键字：">
                <el-input v-model="paramForm.applicant"></el-input>
              </el-form-item>
              <el-form-item label="所属公司：">
                <el-select v-model="paramForm.company" placeholder="请选择所属公司">
                  <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="现金账户：">
                <el-select v-model="paramForm.cashAccount" placeholder="请选择现金账户">
                  <el-option v-for="item in cashAccount" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间：">
                <el-date-picker v-model="paramForm.date" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" show-summary :summary-method="getSummaries">
        <el-table-column label="金额">
          <el-table-column prop="income" label="收入">
          </el-table-column>
          <el-table-column prop="expenditure" label="支出">
          </el-table-column>
          <el-table-column prop="balance" label="本期余额">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>

<script>
import { getFinancialManagementPage } from '@/api/fams/financial_management'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      company: '',
      cashAccount: '',
      paramForm: initSearchForm(),
      replaceText: (data) => `（所属公司：${data[0]}）`,

    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getFinancialManagementPage)
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
