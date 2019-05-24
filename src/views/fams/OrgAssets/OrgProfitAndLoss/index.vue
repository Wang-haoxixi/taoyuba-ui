<template>
  <div class="profit-loss">
    <basic-container>
      <page-header title="组织盈亏">
        <div class="right">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="日期：">
              <el-select v-model="form.region" placeholder="请选择年份">
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </page-header>
      <p class="title">2018年度本部门财务财务核算情况</p>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { columnsMap, dictsMap, initForm } from './options.js'
export default {
  data () {
    return {
      dictsMap,
      columnsMap,
      form: initForm(),
      pagination: {},
      pagedTable: [
        { month: '1', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
        { month: '2', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
        { month: '3', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
        { month: '4', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
        { month: '5', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
        { month: '总计', contractSigning: '', departmentalIncome: '', departmentalApply: '', operatingProfit: '', netProfit: '' },
      ],
    }
  },
  created () {
  },
  methods: {
  },
}
</script>
<style scoped lang='scss'>
.right {
  margin: 0 8px 0 auto;
}
.title {
  font-size: 18px;
  text-align: center;
  color: #666;
}
</style>
<style scoped>
.profit-loss >>> .title-wrapper {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.profit-loss >>> .el-form-item {
  margin-bottom: 0;
}
</style>
