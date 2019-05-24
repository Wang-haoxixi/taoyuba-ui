<template>
  <div class="total-wrapper">
    <iep-fams-card class="total-item-2" title="组织收支">
      <template slot="right">
        <el-radio-group v-model="type" size="small" @change="loadPage">
          <el-radio-button label="1">月</el-radio-button>
          <el-radio-button label="2">季</el-radio-button>
          <el-radio-button label="3">年</el-radio-button>
        </el-radio-group>
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
    <iep-fams-card class="total-item-1" title="快捷入口">
      <div class="card-btn-grid">
        <div @click="$openPage('/fams/org_borrow/org_borrow')">组织拆借</div>
        <div @click="$openPage('/fams_spa/organization_transfer')">组织转账</div>
        <div @click="$openPage('/fams_spa/organization_reward')">组织打赏/扣减</div>
        <div>投资管理</div>
        <div @click="$openPage('/fams/financial_management/organizational_budget')">组织预算</div>
      </div>
    </iep-fams-card>
  </div>
</template>
<script>
import { getOrgBudgetList } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      type: '1',
      rangeTime: [],
      tableData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getOrgBudgetList(this.type)
      this.tableData = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  .total-item-2 {
    flex: 2;
  }
  .total-item-1 {
    flex: 1;
    margin-left: 20px;
  }
}
.card-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  & > div {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    border: 1px solid #aaa;
    color: #666;
    &:hover {
      border: 1px solid #ba1b21;
      color: #ba1b21;
    }
  }
}
</style>
