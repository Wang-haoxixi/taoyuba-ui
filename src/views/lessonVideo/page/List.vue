<template>
  <div>
    <basic-container>
      <page-header title="在线视频"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" v-if="manager">新增</iep-button>
        </template>
        <template slot="right">
          <el-select clearable size="small" v-model="params.type" placeholder="请选择类型" style="width:150px!important">
            <el-option
              label="安全教育"
              value="1">
            </el-option>
            <el-option
              label="课程培训"
              value="2">
            </el-option>
            <el-option
              label="渔业知识"
              value="3">
            </el-option>
          </el-select>
          <span><el-input v-model="params.vedioName" placeholder="请输入视频标题" size="small" clearable></el-input></span>
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
        </template>
      </operation-container>
      <iep-table
        :isMutipleSelection="false"
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
                  <span ><el-image  :src="scope.row.videoImg" :on-error="errorImg" style="width:150px;"></el-image></span>
            </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button plain @click="handleEdit(scope.row.vedioId)" v-if="manager">编辑</iep-button>
              <iep-button @click="handleView(scope.row.vedioId)">查看</iep-button>
              <iep-button @click="handleRecord(scope.row.vedioId)">学习记录查看</iep-button>
              <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
            <el-table-column label="排序" style="width:40px;" prop="sort">
              <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.sort"
                 controls-position="right"
                 @change="handleChange(scope.row)"
                 @blur="handleChange(scope.row)"
                  :min="1"
                 :max="100"
                 size="mini">
              </el-input-number>
               </template>
          </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getVideolist, deleteVideo,updateVideo } from '@/api/lessonVideo'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
import queryMixin from '@/mixins/query'
export default {
  mixins: [mixins, queryMixin],
  data () {
    return {
      columnsMap,
      manager: false,
      params: {
        current: 1,
        size: 10,
        vedioName: '',
        type: '',
      },
      errorImg:'this.src = "/img/logo.png"',
      imgsrc:'',
    }
  },
  created () {
    this.getQuery()
    this.pagination.current = this.params.current
    this.pagination.size = this.params.size
    this.loadPage(this.params)
  },
  methods: {
    onSearch (params) {
      params.current = 1
      this.setQuery(params)
      this.loadPage(params)
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.setQuery({current: val})
      this.loadPage()
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.setQuery({size: val})
      this.loadPage()
    },
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
    handleRecord (id) {
      this.$router.push({
        path: `/lessonVideo_spa/learnedUer/${id}`,
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
    handleChange (row) {
       let newVideo = { vedioId:row.vedioId,sort:row.sort }
        updateVideo(newVideo).then(data => {
          if(data.data.data){
              this.loadPage()
          }
      })
    },
  },
}
</script>