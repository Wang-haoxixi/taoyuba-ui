<template>
  <iep-fams-card title="组织收支">
    <template slot="right">
      <!-- <div style="width: 350px;">
        <iep-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small">
        </iep-date-picker>
      </div> -->
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="创建日期">
      </el-table-column>
      <el-table-column prop="actualIncome" label="实际收入">
      </el-table-column>
      <el-table-column prop="actualExpenditure" label="实际支出">
      </el-table-column>
      <el-table-column prop="budgetExpenditure" label="预算支出">
      </el-table-column>
    </el-table>
  </iep-fams-card>
</template>
<script>
import { getBudgetList } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      rangeTime: [],
      tableData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getBudgetList(this.rangeTime)
      this.tableData = data.data
    },
  },
}
</script>