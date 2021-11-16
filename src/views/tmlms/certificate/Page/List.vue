<template>
  <div>
    <basic-container>

      <page-header title="职务证书"></page-header>

      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button> -->
              <el-upload 
        ref="upload"
        class="upload-demo"
    action="/api/tmlms/crewAndShip/import"
    accept="excel"
    :show-file-list="false"
    :headers="headers"
    :on-success="onBeforeUpload"
    :limit="1">
    <el-button  type="default" size="small" :loading='loading'>{{ importA }}</el-button>
    </el-upload>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <!-- <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="default" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column> -->
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getList,lookTask} from '@/api/tmlms/boatMan'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  mixins: [mixins],
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      importA:'船员证书导入',
      dictsMap,
      columnsMap,
      searchData: 'realName',
      loading:false,
    }
  },
  created () {
    this.loadPage()
    // console.log(this.dictGroup)
  },
   computed: {
    ...mapGetters([
      'dictGroup',
  ]),
    
  },
  methods: {
    onBeforeUpload (e){
     this.loading = true
     lookTask(e.data).then(({ data }) => {
        console.log(data.data)
       this.parseInt(data.data)
       if(data.data.status!=1){
         var that =this
       var id =  setInterval(function (){
           var e = {
           data:data.data.midId,
            }
            lookTask(e.data).then(({ data }) => {
              var e =data.data
               var top =e.successCount+e.failCount
               that.importA=parseInt(top/e.total*100)+'%'
               console.log(this.importA)
              if(data.data.status==1){
                
                clearInterval(id)
                that.$refs.upload.clearFiles()
                that.loading = false
                that.importA='船员证书导入'
              }
             })
          },1000)
        }
      })
      
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    // handleDelete (row) {
    //   console.log(row)
    //   this._handleGlobalDeleteById(row.id, deleteById)
    // },
    // handleAdd () {
    //   this.$router.push({
    //     path: '/hrms_spa/bot_admin/0',
    //   })      
    // },
    // handleEdit (row) {
    //   this.$router.push({
    //     path: `/hrms_spa/bot_admin/${row.id}`,
    //   })    
    // },
    // handleDetail (row) {
    //   this.$router.push({
    //     path: `/hrms_spa/crew_view/${row.userId}`,
    //   }) 
    // },
    async loadPage (param = this.searchForm) {
       this.loadTable(param, getList)
    },
  },
}
</script>