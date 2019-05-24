<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="formProps"
        @handleFilter="getList"
      />
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        ref="crud"
        :page="pagination"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
        <template slot-scope="scope" slot="menu">
          <gov-button type="text" @click="handleDown(scope.row)">生成</gov-button>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :formData="formData" @handleCreate="handleCreate" @closed="handleClosed"></main-dialog>
  </gov-layout-main>
</template>

<script>
import { fetchList, handleDown } from '@/api/admin/gen'
import { tableOption } from './const/'
import allMixins from '@/mixins/mixin'
import mainDialog from './mainDialog'

export default {
  name: 'gen',
  mixins: [allMixins],
  components: { mainDialog },
  data () {
    return {
      tableData: [],
      formData: {},
      box: false,
      tableLoading: false,
      tableOption: tableOption,
      formProps: [
        { label: '表名称', prop: 'tableName', type: 'input' },
      ],
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.pagination.total = response.data.total
        this.tableLoading = false
      })
    },
    handleDown (row) {
      this.$set(this.formData, 'tableName', row.tableName)
      this.$refs['mainDialog'].open()
    },
    handleCreate (formData) {
      handleDown(formData).then(() => {
        this.$message.success('生成成功！')
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    handleClosed () {
      this.formData = {
        tableName: undefined,
        packageName: undefined,
        author: undefined,
        moduleName: undefined,
        tablePrefix: undefined,
        comments: undefined,
      }
    },
  },
}
</script>