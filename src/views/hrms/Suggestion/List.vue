<template>
  <div>
    <basic-container>
      <page-header title="我发出的建议"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="收件人" width="160px">
            <template slot-scope="scope">
              {{scope.row.attendeeList[0]}}
            </template>
          </el-table-column>
          <el-table-column label="主题">
            <template slot-scope="scope">
              {{scope.row.theme}}<i class="iconfont icon-fujian" v-show="scope.row.annex"></i>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button @click="handleEdit(scope.row)" v-if="scope.row.status==0">修改</iep-button>
              <iep-button @click.native="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getSuggestionIssuePage, deleteSuggestionById, deleteSuggestionBatch } from '@/api/hrms/suggestion'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from './options'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSuggestionIssuePage)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
    handleEdit (row) {
      this.$router.push(`/hrms_spa/suggestion_edit/${row.id}`)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteSuggestionBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteSuggestionById)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/suggestion_detail/${row.id}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
