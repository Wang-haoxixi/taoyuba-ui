<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增产品资料</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!tableData.length" message="暂无关联材料"></iep-no-data>
    <el-table v-else :data="tableData">
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          <iep-dict-detail :value="scope.row.materialType" dict-name="mlms_material_type"></iep-dict-detail>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button plain @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <iep-dialog :dialog-show="dialogShow" title="添加关联材料" width="70%" @close="dialogShow=false">
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="handleSelectionChange" :checkbox-init="checkboxInit">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <iep-table-link>{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <iep-dict-detail :value="scope.row.materialType" dict-name="mlms_material_type"></iep-dict-detail>
          </template>
        </el-table-column>
        <el-table-column label="上传者">
          <template slot-scope="scope">
            {{scope.row.creatorRealName}}
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
import mixins from '@/mixins/mixins'
import uniqBy from 'lodash/uniqBy'
import { getTableData } from '@/api/mlms/material/datum/material'
export default {
  mixins: [mixins],
  name: 'IepCpmsMaterialTable',
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
      this.loadTable({ ...param }, getTableData)
    },
  },
}
</script>
