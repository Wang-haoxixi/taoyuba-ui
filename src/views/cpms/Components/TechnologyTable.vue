<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增技术</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!tableData.length" message="暂无关联技术"></iep-no-data>
    <block-module :value="tableData" @delete="handleDelete"></block-module>
    <iep-dialog :dialog-show="dialogShow" title="添加关联技术" width="50%" @close="dialogShow=false">
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="handleSelectionChange" :checkbox-init="checkboxInit">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <iep-table-link-img-desc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name"></iep-table-link-img-desc>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <iep-tag-detail :value="scope.row.chargeNames"></iep-tag-detail>
          </template>
        </el-table-column>
      </iep-table>
      <template slot="footer">
        <iep-button type="primary" @click="handleSelect()">提交</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { getTechnologyPage } from '@/api/cpms/technology'
import mixins from '@/mixins/mixins'
import BlockModule from './BlockModule'
import uniqBy from 'lodash/uniqBy'
export default {
  mixins: [mixins],
  components: { BlockModule },
  name: 'IepCpmsTechnologyTable',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
    }
  },
  computed: {
    tableData: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    checkboxInit (row) {
      const isIncludes = this.tableData.map(m => m.id).includes(row.id)
      if (isIncludes)
        return 0 //不可勾选
      else
        return 1 //可勾选
    },
    handleAdd () {
      this.dialogShow = true
      this.loadPage()
    },
    handleDelete (row) {
      const tableData = this.tableData.filter(m => m.id !== row.id)
      this.tableData = tableData
    },
    handleSelect () {
      const selectData = this.pagedTable.filter(m => this.multipleSelection.includes(m.id))
      this.tableData.push(...selectData)
      this.tableData = uniqBy(this.tableData, 'id')
      this.dialogShow = false
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param) {
      this.loadTable({ ...param }, getTechnologyPage)
    },
  },
}
</script>