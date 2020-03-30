<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
      <operation-container>
        <!-- <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template> -->
        <!-- <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
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
              <!-- <iep-button plain @click="handleEdit(scope.row.shipId)">编辑</iep-button> -->
              <iep-button @click="handleView(scope.row.shipId)">查看</iep-button>
              <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)">船员</iep-button>
              <!-- <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getShipList, deleteShip } from '@/api/ships'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
export default {
  components: {
    // advanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      searchData: 'contactName',
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
      this._handleGlobalDeleteById(row.shipId, deleteShip)
    },
    handleAdd () {
      this.$router.push({
        path: '/ship_spa/detail/create/0',
      })
    },
    handleView (id) {
      this.$router.push({
        path: `/ship_spa/detail/view/${id}`,
      })
    },
    handleEdit (id) {             
      this.$router.push({
        path: `/ship_spa/detail/update/${id}`,
      })
    },
    async loadPage (param = this.searchForm) {              
      //  let userId = this.$store.getters.userInfo.userId
      let idcard = this.$store.getters.userInfo.idCard
      this.loadTable({ shipownerIdcard: idcard, ...param }, getShipList)
    },
    handleCrew (id) {
      this.$router.push({       
        path: `/hrms_spa/ship_crew/${id}`,
        query: { 
          page: 1,
        },
      })
    },
  },
}
</script>