<template>
  <div>
    <basic-container>
      <page-header title="部门管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
              <!-- <el-dropdown-item divided>导入</el-dropdown-item> -->
              <!-- <el-dropdown-item>导出</el-dropdown-item> -->
              <!-- <el-dropdown-item>分享</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-tree>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row._level===1" icon="el-icon-plus" @click="handleAdd(scope.row)" type="warning" plain>子部门</iep-button>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item @click.native="handleMove(scope.row)">移动</el-dropdown-item>
                  <el-dropdown-item @click.native="handleMerge(scope.row)">合并</el-dropdown-item> -->
                  <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <merge-dialog ref="MoveDialog" @load-page="loadPage"></merge-dialog>
    <move-dialog ref="MergeDialog" @load-page="loadPage"></move-dialog>
  </div>
</template>

<script>
import { getDeptPage, postDept, putDept, deleteDeptById, deleteDeptBatch } from '@/api/hrms/department_management'
import mixins from '@/mixins/mixins'
import { columnsMap, toDeptForm, toNewParentForm } from './options'
import DialogForm from './DialogForm'
import MoveDialog from './MoveDialog'
import MergeDialog from './MergeDialog'
export default {
  mixins: [mixins],
  components: { DialogForm, MoveDialog, MergeDialog },
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteDeptBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteDeptById)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = toDeptForm(row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putDept
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd (row) {
      this.$refs['DialogForm'].form = toNewParentForm(row)
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postDept
      this.$refs['DialogForm'].dialogShow = true
    },
    handleMove (row) {
      return
      // eslint-disable-next-line no-unreachable
      console.log(row)
      this.$refs['MoveDialog'].dialogShow = true
    },
    handleMerge (row) {
      return
      // eslint-disable-next-line no-unreachable
      console.log(row)
      this.$refs['MergeDialog'].dialogShow = true
    },
    loadPage (param) {
      this.loadTable(param, getDeptPage)
    },
    add () {

    },
  },
}
</script>
