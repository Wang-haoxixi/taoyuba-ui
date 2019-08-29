<template>
  <div>
    <basic-container>
      <page-header title="渔船经营人"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd($route.params.shipNo)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="operatColumnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" plain @click="handleEdit(scope.row.shipNo)">编辑</iep-button>
              <iep-button size="mini" plain @click="handleView(scope.row.shipNo)">查看</iep-button>
              <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button>    
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getShipManagerList, deleteShipManager } from '@/api/ships/shipoperat/index'
import mixins from '@/mixins/mixins'
import { operatColumnsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      operatColumnsMap,
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
    handleAdd (val) {
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`, query:{ add: val }}) 
    },
    handleEdit (val) {
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`,query:{ edit: val }})
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row, deleteShipManager)
    },
    handleView (val) {
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`,query:{ see: val }})
    },
    async loadPage (param = this.searchForm) { 
      param.shipNo = this.$route.params.shipNo
      let data = await this.loadTable(param, getShipManagerList)
      this.pagedTable = data.records
    },
    backPage () {
      this.$router.push({path: '/hrms_spa/shipCrew_list'})
    },
  },
}
</script>