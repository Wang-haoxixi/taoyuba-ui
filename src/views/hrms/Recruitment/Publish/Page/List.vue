<template>
  <div>
    <basic-container>
      <page-header title="发布招聘" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
              <!-- <el-dropdown-item divided>分享</el-dropdown-item>
              <el-dropdown-item>发送群面</el-dropdown-item> -->
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
          <el-table-column label="岗位" width="180px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.position}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="scope.row.status!==2" @click="handleShelf(scope.row)">上架</iep-button>
              <iep-button v-if="scope.row.status===2" @click="handleObtained(scope.row)">下架</iep-button>
              <iep-button type="default" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentPage, shelfPublishRecruitmentById, deletePublishRecruitmentById, obtainedPublishRecruitmentById, deletePublishRecruitment } from '@/api/hrms/publish_recruitment'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0],
      replaceText: (data) => `（本周新增${data[0]}条招聘信息，收到${data[1]}份简历）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deletePublishRecruitment)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePublishRecruitmentById)
    },
    handleShelf (row) {
      this._handleComfirm(row.id, shelfPublishRecruitmentById, '上架')
    },
    handleObtained (row) {
      this._handleComfirm(row.id, obtainedPublishRecruitmentById, '下架')
    },
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/recruitment_publish/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/hrms_spa/recruitment_publish/${row.id}`,
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getPublishRecruitmentPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>