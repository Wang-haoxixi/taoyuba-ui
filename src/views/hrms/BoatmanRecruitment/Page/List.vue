<template>
  <div>
    <basic-container>
      <page-header title="船老大招聘"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus">新增</iep-button>
          <iep-button @click="loadPage()" type="default">刷新</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="default" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <!-- <iep-button @click="handleDetail(scope.row)">查看</iep-button> -->
              <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getList, deleteById} from '@/api/post/resume'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      searchData: 'shipName',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {
      console.log(row)
      this._handleGlobalDeleteById(row.id, deleteById)
    },
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/bot_admin/0',
      })      
    },
    handleEdit (row) {
      this.$router.push({
        path: `/hrms_spa/bot_admin/${row.id}`,
      })    
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/crew_view/${row.userId}`,
      }) 
    },
    async loadPage (param = this.searchForm) {
       this.loadTable(param, getList)
    },
  },
}
</script>