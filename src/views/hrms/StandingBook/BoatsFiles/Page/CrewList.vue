<template>
  <div>
    <basic-container>
      <page-header title="船员列表"></page-header>      
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
        <!-- <el-table-column prop="operation" label="操作" width="220">     
          <template slot-scope="scope">                             
            <operation-wrapper>                   
              <iep-button @click="handleView(scope.row.shipId)"></iep-button>         
            </operation-wrapper>
          </template>
        </el-table-column> -->
      </iep-table>
    </basic-container>      
  </div>
</template>
<script>                                                                                                                                                                                                           
import { getPositionPage } from '@/api/post/crew'       
import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../crewoptions'   
export default {
  components: {
    advanceSearch,
  },
  mixins: [mixins],
  data () {
    return {                
      columnsMap,                     
      searchData: 'realName',
    }
  },
  created () {                              
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)              
    },   
    async loadPage (param = this.searchForm) {    
       this.loadTable({ shipId: this.shipId, ...param }, getPositionPage)
    },
  },
    computed: {            
        shipId () {
            return  this.$route.params.shipId
        },
  },
}
</script>