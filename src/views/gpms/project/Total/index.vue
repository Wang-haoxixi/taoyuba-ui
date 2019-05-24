<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleCreate" class="add" type="primary">新增</iep-button>
        <iep-button @click="handleDeleteAll" class="add">批量删除</iep-button>
      </template>
      <template slot="right">
        <operation-search
          @search="searchPage"
          @closed="dialogIsShow = true"
          advanceSearch
          placeHolder="请输入项目名称"
          :dialogIsShow="dialogIsShow">
          <!--title-->
          <el-row class="search">
            <el-col :span="23">高级搜索</el-col>
            <el-col :span="1">
              <i class="iconfon el-icon-plus" @click="closeDialog" style="cursor: pointer;"></i>
            </el-col>
          </el-row>
          <!--表单-->
          <!-- <searchForm></searchForm> -->
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
      is-mutiple-selection 
      @selection-change="selectionChange"
      :dictsMap="dictMap">
      <el-table-column  label="项目名称" slot="before-columns" width="350px">
        <template slot-scope="scope">
          <div style="cursor: pointer;" @click="handleDetail(scope.row)">
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" plain size="small" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dictMap, columnsMap, paramForm } from './const.js'
import { getTableData, deleteData } from '@/api/gpms/index'
// import searchForm from './searchForm'

export default {
  components: {  },
  props: {
    tabType: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      addDialogShow: false,
      isLoadTable: false,
      dictMap,
      columnsMap,
      dialogIsShow: true,
      paramForm: paramForm(),
      value: '',
    }
  },
  mixins: [mixins],
  methods: {
    loadPage (param) {
      this.loadTable(param, getTableData)
    },
    closeDialog () {
      this.dialogIsShow = false
      this.paramForm = paramForm()
    },
    searchPage (name) {
      if (name) {
        this.paramForm.name = name
      }
      // console.log(this.paramForm)
      // 搜索完成后
      // this.paramForm.name = ''
    },
    //勾选行执行
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      // this.$store.commit('SET_ACCESS_TOKEN',row)
      this.$router.push(`/gpms_spa/project/detail/${row.id}`)
    },
    handleCreate () {
      this.$emit('toggle-show', 'create')
    },
    handleUpdate (row) {
      this.$emit('toggle-show', 'update', row)
    },
    handleDelete (val) {
      this._handleGlobalById(val.id, deleteData)
    },
    handleDeleteAll () {
      this._handleGlobalAll(deleteData)
    },
  },
  mounted () {
    this.loadPage({listType: this.tabType})
  },
}
</script>

<style scoped>
  .search {
    height: 35px;
    line-height: 26px;
    color: #666;
    font-weight: 900;
    font-size: 17px;
    border-bottom: 1px solid #cdcdcd;
    margin-bottom: 20px;
  }
  .searchbot {
    margin-right: 20px !important;
  }
  .num{
    width: 47%;
  }
  .smallcol{
    width: 110px !important;
  }
  .blackColor{
    color: #666;
  }

</style>