<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
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
              <iep-button plain @click="handleEdit(scope.row.shipId)">编辑</iep-button>
              <iep-button @click="handleView(scope.row.shipId)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getVillageShip } from '@/api/tmlms/bvillage/index'
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
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/village_ship_detail',
      })  
    },
    handleView (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ see: val }})
    },
    handleEdit (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ edit: val }})
    },
    async loadPage (param = this.searchForm) {   
      let data = await this.loadTable(param, getVillageShip)
      this.pagedTable = data.records
      console.log(this.pagedTable)
    },
  },
}
</script>