<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        label-width="80px"
        :list-query="listQuery"
        :form-props="formProps"
        @handleFilter="handleFilter"
      ></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        :data="mainTableData" 
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :option="mainTableOption" 
        :page="pagination"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleSubmit(scope.row)" text="提交"></gov-button>
            <gov-button type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus">
    </main-dialog>
  </gov-layout-main>
</template>

<script>
import { getDept, getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import { getPage, deleteData } from '@/api/supply/retract'
import { itemTableOption } from './const/index'
import mainDialog from './mainDialog'
export default {
  name: 'Demand',
  mixins: [mixin],
  components: {mainDialog},
  computed: {
    formProps () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
        { label: '材料类型', prop: 'materialType', type: 'select', data: getDic('SUPPLU_MATERIAL_TYPE') },
      ]
    },
  },
  data () {
    return {
      tableLoading: true,
      mainTableOption: itemTableOption,
      mainTableData: [], // 主表数据
    }
  },
  methods: {
    // 提交
    handleSubmit (row) {
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteData(row.id).then(() => {
          this.successNotify('删除成功')
          this.getList()
        })
      })
    },
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getPage(this.listQuery).then(({data}) => {
        if (data.code === 0) {
          this.pagination.total = data.data.total
          this.mainTableData = data.data.records
        }
        this.tableLoading = false
      })
    },
    // 提交成功后
    successForm () {
      this.getList()
    },
  },
  created () {
    this.getList()
  },
}
</script>
