<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>{{year}}月度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择季度" size="small" @change="handleChange">
          <el-option v-for="item in quarterList" :key="item.budgetId" :label="item.budgetTime+'季度'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table v-loading="loading" :data="budgetTableRelation" style="width: 100%" :height="tableHeight" show-summary :summary-method="getSummaries">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column v-for="item in budgetTable" :key="item.id" :label="getLabel(item)">
        <el-table-column prop="budget" label="预算(元)">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'budget')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际(元)">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'actual')}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getBudgetMonthDetail, putBudgetMonthRelation } from '@/api/fams/budget'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
export default {
  props: {
    year: {
      type: Number,
      required: true,
    },
    quarterId: {
      type: Number,
      required: true,
    },
    quarterList: {
      type: Array,
      required: true,
    },
  },
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      loading: false,
      budgetId: this.quarterId,
      budgetTime: '',
      budgetTableRelation: [],
      budgetTable: [],
      budgetMap: {},
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    getLabel (item) {
      return item.flag ? item.time + '季度' : item.time + ((this.budgetId - 2) * 3) + '月份'
    },
    getSummaries (param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const realIndex = Math.ceil(index / 2)
        const data = this.budgetTable[realIndex - 1].relation
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
    getValue (item, scope, tName) {
      return this.budgetMap[item.id].relation[scope.$index][tName]
    },
    handleDetail (item, scope) {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.id = item.id
      this.$refs['DialogForm'].form.type = scope.row.type
      this.$refs['DialogForm'].form.budget = this.getValue(item, scope, 'budget')
      this.$refs['DialogForm'].form.actual = this.getValue(item, scope, 'actual')
      this.$refs['DialogForm'].formRequestFn = putBudgetMonthRelation
      this.$refs['DialogForm'].dialogShow = true
    },
    handleChange () {
      this.loadPage()
    },
    async loadPage () {
      this.loading = true
      const { data } = await getBudgetMonthDetail(this.budgetId)
      this.budgetTable = data.data
      this.budgetTableRelation = this.budgetTable[0].relation
      this.budgetMap = keyBy(this.budgetTable, 'id')
      this.loading = false
    },
  },
}
</script>



