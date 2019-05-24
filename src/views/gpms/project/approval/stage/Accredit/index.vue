<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button class="add" @click="handleCreate" type="primary">新增</iep-button>
        <iep-button @click="handleDeleteAll" class="add">批量删除</iep-button>
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
      :dictsMap="dictsMap" 
      @selection-change="selectionChange">
      <el-table-column prop="operation" label="操作" width="280" align="center">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleDetail(scope.row)">详情</iep-button>
            <iep-button plain v-if="scope.row.approvalStatus == 1" @click="handleSubmit(scope.row)">提交</iep-button>
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleUpdate(scope.row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <apply-dialog ref="apply" @load-page="loadPage"></apply-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './option.js'
import { getAuthorList, deleteDate, getDetailById } from '@/api/gpms/author'
import ApplyDialog from './apply/'

export default {
  data () {
    return {
      addDialogShow: false,
      isLoadTable: false,
      columnsMap,
      value: '',
      dictsMap,
    }
  },
  props: {
    projectInfoId: {
      type: Number,
      default: 0,
    },
  },
  components: { ApplyDialog },
  mixins: [ mixins ],
  methods: {
    loadPage (param = {projectInfoId: this.projectInfoId}) {
      this.loadTable(param, getAuthorList)
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('toggle-detail', row)
    },
    handleSubmit (row) {
      this.$refs['apply'].open(row)
    },
    handleCreate () {
      this.$emit('toggle-show', 'create')
    },
    handleUpdate (row) {
      getDetailById(row.id).then(({data}) => {
        this.$emit('toggle-show', 'update', data.data.data)
      })
    },
    handleDeleteAll () {
      this._handleGlobalAll(deleteDate)
    },
    handleDelete (val) {
      this._handleGlobalById(val.id, deleteDate)
    },
    closeDialog () {
      this.paramForm = {}
    },
  },
  created () {
    this.loadPage()
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