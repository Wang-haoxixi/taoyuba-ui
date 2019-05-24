<template>
  <div>
    <basic-container>
      <page-header title="互助基金"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="关键字">
                <el-input v-model="paramForm.keyword"></el-input>
              </el-form-item>
              <el-form-item label="申请时间">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="审核时间">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="申请金额">
                <el-col :span="11">
                  <el-input v-model="paramForm.sum" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="paramForm.sum2" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="发送人" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      form: {
        name: '',
      },
      columnsMap,
      paramForm: initSearchForm(),
      state: [
        {
          value: '选项1',
          label: '待审核',
        },
      ],
      value: '',
    }
  },
  created () {
    // this.loadPage()
    this.isLoadTable = false
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
