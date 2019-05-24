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
        <gov-button @click="handleCreate">新增</gov-button>
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
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag>{{scope.row.lineType}}</el-tag>
          </template>
        </el-table-column>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleUpdate(scope.row)" type="text">数据分析</gov-button>
            <gov-button @click="handleClean(scope.row)" type="text">清洗</gov-button>
            <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <pool-dialog
      :options="options"
      :temp="formData"
      :status="dialogStatus"
      ref="formDialog"/>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import poolDialog from './poolDialog'
export default {
  name: 'pool',
  components: {poolDialog},
  mixins: [mixin],
  data () {
    return {
      listQuery: {
        name: undefined,
        source: undefined,
        deptId: undefined,
      },
      exportData: {
        listQuery: {
          data: [],
        },
        data: [
          {
            prop: 'data',
            data: [
              {value: 'name', label: '数据名称'},
              {value: 'source', label: '来源方式'},
              {value: 'deptId', label: '来源部门'},
            ],
          },
        ],
      },
      options: {
        deptId: [{label: 'Excel导入', value: '1'}, {label: '接口调取', value: '2'}],
        source: [{label: '国脉集团', value: '1'}, {label: 'DISP研发组', value: '2'}],
        type: [{label: '未开始', value: '1'}, {label: '进行中', value: '2'}, {label: '已结束', value: '3'}],
      },
      tableList: [
        {id: 1, name: '省公安厅信息项池', deptId: '1', source: '1', type: '1', rule: '1'},
        {id: 2, name: '市建设局信息项池', deptId: '1', source: '1', type: '1', rule: '1'},
        {id: 3, name: '国脉内网标准池', deptId: '1', source: '2', type: '3', rule: '1'},
      ],
    }
  },
  computed: {
    formProps () {
      let data = [
        { label: '数据名称', prop: 'name', type: 'input' },
        { label: '来源方式', prop: 'deptId', type: 'select', data: this.options.deptId },
        { label: '来源部门', prop: 'source', type: 'select', data: this.options.source },
      ]
      data.forEach(item => {
        if (item.type === 'select') {
          const value = item.data.find(item1 => {
            return !item1.value
          })
          if (!value) {
            item.data.unshift({label: '全部', value: ''})
          }
        }
      })
      return data
    },
    tableProps () {
      return {
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
          {label:'来源方式', prop:'deptId', type: 'dic', dicData: this.options.deptId},
          {label:'来源部门', prop:'source', type: 'dic', dicData: this.options.source},
          {label: '状态', prop: 'type', type: 'dic', dicData: this.options.type},
        ],
      }
    },
  },
  created () {
    this.pagination.total = 3
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
    // 批量删除
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
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        this.deleteData([row.id])
      }).catch(() => {})
    },
    handleSelectionChange (list) {
      this.queryData = list
    },
    // 详情
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.formData = Object.assign({}, row)
      this.$refs.formDialog.openDialog()
    },
    handleCreate () {
      this.formData = {}
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog()
    },
    handleExport () {
      this.$refs.exportDialog.open()
    },
    handleExportApi () {
      return new Promise ((resolve) => {
        resolve()
      })
    },
    // 清洗
    handleClean () {
      this.$confirm('确定清洗吗').then(() => {
        this.successNotify('清洗完成')
      }).catch(() => {})
    },
  },
}
</script>

<style lang="sass" scoped>

</style>