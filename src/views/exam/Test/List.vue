<template>
  <div>
    <basic-container>
      <page-header title="试题库"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
          <!-- <iep-button size="small" @click="handleDeleteAll" v-if="permissionAll">批量删除</iep-button> -->
          <!-- <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <span class="width130"><el-input v-model="params.title" placeholder="题目名称" size="small" clearable></el-input></span>
          <span style="width:185px"><el-select v-model="params.kind" placeholder="试题分类" size="small" @change="getLevel">
              <el-option
                v-for="item in kindList"
                :key="item.index"
                :value="item.kind"
                >
              </el-option>
            </el-select>
          </span>
          <span style="width:110px" ><el-select v-model="params.level" placeholder="职务等级" size="small">
              <el-option
                v-for="item in levelList"
                :key="item.index"
                :value="item.level"
                >
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getParamData">搜索</el-button>
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
        <!-- </operation-search> -->
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
              <iep-button plain @click="handleEdit(scope.row.id)">编辑</iep-button>
              <iep-button plain @click="handleDel(scope.row.id)">删除</iep-button>
              <!-- <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>        
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
// import {} from ''
import { examKind,examLevel,getTestList,delTest } from '@/api/exam/examManagement'
import {columnsMap } from'./options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      permissionAll: false,
      permissionAdd: false,
      permissionView: false,
      params: {
        current: 1,
        size: 10,
        title: '',
        kind: '',
        level: '',
      },
      levelList:[],
      kindList:[],
    }
  },
  created () {
    this.getKindLevel()
    this.loadPage()
    this.setPermission()
    
  },
  computed: {
    ...mapGetters(['userInfo', 'permissions']),
  },
  methods: {
    getKindLevel () {
      examKind().then(res=>{
        this.kindList = res.data.data
      })
    },
    getLevel (kind){
      examLevel(kind).then(res=>{
        this.levelList = res.data.data
      })
    },
    setPermission () {
      this.permissionAll = this.permissions['exam_library_all']
      this.permissionAdd = this.permissions['exam_library_add']
      this.permissionView = this.permissions['exam_library_view']
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },

    loadPage (param = this.params) {
      this.pagedTable=this.loadTable(param, getTestList)
    },
    getParamData () {
      this.params.title = this.params.title.replace(/\s*/g,'')
      this.loadPage()
    },
    /**
     * 新增考试
     */
    handleAdd () {
      this.$router.push({path:'/test/test_add'})
    },
    handleEdit (id) {
      this.$router.push({path:'/test/test_add',query:{edit:id}})
    },
    handleDel (id) {
      this.$confirm('是否确认删除试题' , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(()=>{
        delTest(id).then(res=>{
          if(res.data.data){
            this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
            })
            this.loadPage()
          }
        })
      }).catch(()=>{})
      
    },
  },
}
</script>
