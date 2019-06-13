<template>      
  <div>       
    <basic-container>
      <page-header title="服务管理"></page-header>
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
      <iep-table                                          
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
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
</template>                                                          
<script>                                                                                                                                                                                                                                                                                                                                                           
import { getArticleList, delArtilce } from '@/api/article/index'
import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
export default {                          
  components: {
    advanceSearch,
  },
  mixins: [mixins],       
  data () {                              
    return {
      columnsMap,
      searchData: 'title',
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
      this._handleGlobalDeleteById(row.articleId, delArtilce)
    },
    handleAdd () {
      this.$router.push({
        path: '/article_spa/article_agent/0',
      })   
    },
    handleEdit (row) {
      this.$router.push({
        path: `/article_spa/article_agent/${row.articleId}`,
      })
    },
    async loadPage (param = this.searchForm) { 
      param.type = 4
      this.loadTable(param, getArticleList)
    },
  },
}
</script>