<template>
  <div>
    <basic-container>
      <page-header title="在线视频"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain v-if="manager">新增</iep-button>
        </template>
        <template slot="right">
          <span><el-input v-model="params.vedioName" placeholder="请输入视频标题" size="small" clearable></el-input></span>
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
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
          <el-table-column prop="videoSrc" label="视频图片" width="300">          
           <template slot-scope="scope">                                
                  <span ><img  :src="scope.row.videoImg" :on-error="errorImg" style="width:250px;height:50px;"/></span>
            </template> 
        </el-table-column>        
        <el-table-column prop="operation" label="操作" width="200">           
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button plain @click="handleEdit(scope.row.vedioId)" v-if="manager">编辑</iep-button>
              <iep-button @click="handleView(scope.row.vedioId)">查看</iep-button>    
              <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getVideolist, deleteVideo } from '@/api/lessonVideo'           
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      manager: false,
      params: {
        current: 1,
        size: 10,
        vedioName: '',
      },
      errorImg:'this.src = "/img/logo.png"',
      imgsrc:'',
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
      this._handleGlobalDeleteById(row.vedioId, deleteVideo)
    },
    handleAdd () {      
      this.$router.push({        
        path: '/lessonVideo_spa/detail/create/0',
      })      
    },
    handleView (id) {
      this.$router.push({
        path: `/lessonVideo_spa/detail/view/${id}`,
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: `/lessonVideo_spa/detail/update/${id}`,
      })
    },
    async loadPage (param = this.searchForm) {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) === -1 && this.userData.roles.indexOf(1) === -1){
        let data = await this.loadTable(param, getVideolist)
        this.pagedTable = data.records
        this.manager = false
      } else {
        let data = await this.loadTable(param, getVideolist)
        this.pagedTable = data.records
        this.manager = true
      }
    },
  },
}
</script>   