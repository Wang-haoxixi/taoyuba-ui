<template>
  <div>
    <basic-container>
      <page-header title="渔船保单"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd($route.params.shipId)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="insureColumnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="140">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" plain @click="handleEdit(scope.row.id)">编辑</iep-button>
              <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getShipinsureList, deleteShipinsure } from '@/api/ships/shipinsure/index'
import mixins from '@/mixins/mixins'
import { insureColumnsMap } from '../shipoptions'   
export default {
  mixins: [mixins],
  data () {
    return {
      insureColumnsMap,
      searchData: 'contactName',
      ifexist: true,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd (val) {
      this.$router.push({path: '/hrms_spa/ship_insure', query:{ add: val }}) 
    },
    handleEdit (val) {
      this.$router.push({path: '/hrms_spa/ship_insure', query:{ edit: val } })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row, deleteShipinsure)
    },
    handleView () {
    },
    async loadPage (param = this.searchForm) { 
      param.shipId = this.$route.params.shipId
      let data = await this.loadTable(param, getShipinsureList)
      this.pagedTable = data.records
    },
    backPage () {
      this.$router.push({path: '/hrms_spa/shipCrew_list'})
    },
  },
}
</script>