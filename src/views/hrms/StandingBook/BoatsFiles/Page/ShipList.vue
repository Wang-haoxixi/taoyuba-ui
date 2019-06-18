<template>
  <div>
    <basic-container>
      <page-header title="渔船列表"></page-header>      
      <operation-container>
        <template slot="left">
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
              <iep-button @click="handleView(scope.row.shipId)">查看船员列表</iep-button>     
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>      
  </div>
</template>
<script>                                                                                                                                                                             
import { getShipList } from '@/api/ships'       
import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../shipoptions'   
export default {
  components: {
    advanceSearch,
  },
  mixins: [mixins],
  data () {
    return {                
      columnsMap,             
      searchData: 'villageName',
    }
  },
  created () {                         
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {             
      this.multipleSelection = val.map(m => m.id)       
    },
    handleView (id) {                                                                          
      this.$router.push({       
        path: `/hrms_spa/ship_crew_list/${id}`,
      })
    },
    async loadPage (param = this.searchForm) { 
       this.loadTable({ villageId: this.villageId, ...param }, getShipList)
    },
  },
  computed: {            
        villageId () {
            return  this.$route.params.villageId
        },
  },
}
</script>