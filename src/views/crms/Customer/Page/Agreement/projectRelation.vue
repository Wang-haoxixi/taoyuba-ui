<template>
  <iep-dialog :dialog-show="dialogShow" title="关联项目" width="50%" @close="resetForm">

    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSelect(scope.row)" size="small" :type="projectId == scope.row.id ? 'warning' : ''" plain>{{projectId == scope.row.id ? '已选中' : '选择'}}</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { projecTableOption } from './options'
import { getTableData } from '@/api/gpms/index'

export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      pagedTable: [],
      columnsMap: projecTableOption,
      projectId: '',
      projectName: '',
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    open (id, name) {
      this.dialogShow = true
      this.projectId = id
      this.projectName = name
      this.loadPage()
    },
    loadPage (param = {}) {
      this.loadTable(param, getTableData)
    },
    handleSelect (row) {
      if (this.projectId == row.id) {
        this.projectId = ''
        this.projectName = ''
      } else {
        this.projectId = row.id
        this.projectName = row.projectName
      }
    },
    submitForm () {
      this.$emit('project-success', this.projectId, this.projectName)
      this.dialogShow = false
    },
  },
}
</script>
