<template>
  <div>
    <basic-container>
      <page-header title="求职简历"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="default" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getResumePage, deleteResumeById} from '@/api/post/resume'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap} from '../options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      searchData: 'realName',
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
      this._handleGlobalDeleteById(row.resumeId, deleteResumeById)
    },
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/resume_post/0',
      })      
    },
    handleEdit (row) {
      this.$router.push({
        path: `/hrms_spa/resume_post/${row.resumeId}`,
      })    
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    async loadPage (param = this.searchForm) {
       await this.loadTable(param, getResumePage)
      //  let dataList = this.loadTable(param, getResumePage)
      //  dataList.then((res) => {
      //    for (let i=0; i< res.records.length; i++) {
      //      res.records[i].job = res.records[i].job.toString()
      //    }
      //    this.pagedTable = res.records
      //    console.log(this.pagedTable)
      //  })
    },
  },
}
</script>