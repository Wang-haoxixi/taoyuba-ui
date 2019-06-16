<template>
  <div>
    <basic-container>
      <page-header title="船员证书"></page-header>
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
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
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
import { deleteCertById,getCertPage} from '@/api/post/cert'   
import { getUserInfo } from '@/api/login'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap,queryForm } from '../options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      searchData: 'contactName',
      maps:queryForm(),
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
      this._handleGlobalDeleteById(row.certId, deleteCertById)
    },
    handleAdd () {
      this.$router.push({
        path: '/cert_spa/cert_user/0',
      })      
    },
    handleEdit (row) {        
      this.$router.push({
        path: `/cert_spa/cert_user/${row.certId}`,
      })    
    },
 async loadPage (param = this.searchForm) {                              
              console.log(this.maps)      
        getUserInfo().then(({data}) => {
              this.maps.userId  =  data.data.sysUser.userId
              this.loadTable({ userId: this.maps.userId, ...param }, getCertPage)
              console.log(this.maps)
        })         
    },
  },
}
</script>