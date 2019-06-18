<template>
  <div>
    <basic-container>
      <page-header title="渔村列表"></page-header>      
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
              <iep-button @click="handleView(scope.row.userId)">查看渔船列表</iep-button>     
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>      
  </div>
</template>
<script>                                                                                                                                                                             
import { getVillageList,getVillageDetail } from '@/api/hrms/standing_village'    
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
        getVillageDetail(id).then(({data}) => {          
              if(data.code === 0){
                let  villageId = data.data.villageId
                console.log(villageId)
                this.$router.push({         
                    path: `/hrms_spa/village_ship_list/${villageId}`,
                  })
              }
        })
    },
    async loadPage (param = this.searchForm) {    
       this.loadTable(param, getVillageList)
    },
  },
}
</script>