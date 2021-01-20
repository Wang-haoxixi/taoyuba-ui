<template>
  <div>
    <div v-show="!show">
      <basic-container>
        <page-header title="资讯管理"></page-header>
        <operation-container>
          <template slot="left">
            <iep-button @click="handleAdd()" type="primary">新增</iep-button>
          </template>
          <template slot="right">
            <operation-search @search-page="searchPage" advance-search :prop="searchData">
              <advance-search @search-page="searchPage"></advance-search>
            </operation-search>
          </template>
        </operation-container>
        <iep-table
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange">
          <el-table-column prop="operation" label="操作" width="220">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button plain @click="handleEdit(scope.row)">编辑</iep-button>
                <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </basic-container>
    </div>
    <div v-if="show">
      <form-container ref="formContainer" @end="onEnd"/>
    </div>
  </div>
</template>
<script>
import { getArticleList, delArtilce } from '@/api/article/index'
import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import formContainer from './form'
export default {
  components: {
    advanceSearch,
    formContainer,
  },
  mixins: [mixins],
  data () {
    return {
      show: false,
      columnsMap,
      searchData: 'title',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    onEnd (status) {
      this.show = false
      if (status) {
        this.loadPage()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.articleId, delArtilce)
    },
    handleAdd () {
      this.show = true
      this.$nextTick(() => {
        this.$refs.formContainer.open(0)
      })
      // this.$router.push({
      //   path: '/article_spa/article_post/0',
      // })
    },
    handleEdit (row) {
      this.show = true
      this.$nextTick(() => {
        this.$refs.formContainer.open(row.articleId)
      })
      // this.$router.push({
      //   path: `/article_spa/article_post/${row.articleId}`,
      // })
    },
    async loadPage (param = this.searchForm) {
      let data = await this.loadTable(param, getArticleList)
      this.pagedTable = data.records
      if(this.pagedTable){
        this.pagedTable.forEach(ele => {
          ele.isDispatch = ele.isDispatch == 0 ? '否' : '是'
        })
      }
    },
  },
}
</script>