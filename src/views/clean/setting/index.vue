<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
       @handleFilter="handleFilter"
       :listQuery="listQuery"
       :formProps="formProps"/>
       <!-- 按钮组 -->
       <gov-layout-button-group>
        <gov-button @click="handleCreate" class="btn-default">新增</gov-button>
        <gov-button text="批量删除" @click="handleDeleteQuery"/>
       </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
        @selection-change="handleSelectionChange"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="tableProps">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
            <gov-button @click="handleUpdate(scope.row)" type="text">编辑</gov-button>
            <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <setting-dialog
      :exportApi="handleExportApi"
      :temp="formData"
      :status="dialogStatus"
      ref="formDialog"/>
  </gov-layout-main>
</template>
<script>
import mixin from '@/mixins/mixin'
import settingDialog from './settingDialog'
export default {
  name: 'cleaned',
  mixins: [mixin],
  components: {settingDialog},
  data () {
    return {
      listQuery: {
        name: '',
      },
      formProps: [
        { label: '规则名称', prop: 'name', type: 'input' },
      ],
      tableProps: {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: true,
        menuWidth: '180px',
        indexLabel:'序号',
        index: true,
        align:'center',
        column: [
          {label:'规则名称', prop:'name'},
        ],
      },
      tableList: [
        {id: 1, name: '清洗规则一'},
        {id: 2, name: '清洗规则二'},
        {id: 3, name: '清洗规则三'},
        {id: 4, name: '清洗规则四'},
      ],
    }
  },
  created () {
    this.pagination.total = 4
  },
  methods: {
    deleteData (ids) {
      ids.forEach(id => {
        this.tableList.forEach((item, index) => {
          if (item.id === id) {
            this.tableList.splice(index, 1)
            return false
          }
        })
      })
      this.successNotify(this.DELETE)
    },
    handleDeleteQuery () {
      if (this.queryData.length > 0) {
        this.$confirm('确定要删除吗').then(() => {
          let ids = this.queryData.map(item => {
            return item.id
          })
          this.deleteData(ids)
        }).catch(() => {})
      } else {
        this.warningNotify('请选择数据')
      }
    },
    handleCreate () {
      this.formData = {}
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog()
    },
    // 修改
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.formData = Object.assign({}, row)
      this.$refs.formDialog.openDialog()
    },
    // 详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = Object.assign({}, row)
      this.$refs.formDialog.openDialog()
    },
    handleSelectionChange (list) {
      this.queryData = list
    },
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        this.deleteData([row.id])
      }).catch(() => {})
    },
    handleExportApi () {
      return new Promise ((resolve) => {
        resolve()
      })
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
