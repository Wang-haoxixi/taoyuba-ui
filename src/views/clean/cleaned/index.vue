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
        <gov-button type="export" @click="handleExport" />
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
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
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <gov-dialog-export
      :listQuery="exportData.listQuery"
      :data="exportData.data"
      ref="exportDialog"/>
    <cleaned-dialog
      :options="options"
      :temp="formData"
      :status="dialogStatus"
      ref="formDialog"/>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import govDialogExport from '@/components/govDialogExport'
import cleanedDialog from './cleanedDialog'

export default {
  name: 'cleaned',
  components: {govDialogExport, cleanedDialog},
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
              {value: 'name', label: '规则名称'},
              {value: 'source', label: '来源方式'},
              {value: 'deptId', label: '来源部门'},
            ],
          },
        ],
      },
      options: {
        deptId: [{label: '全部', value: ''},{label: 'Excel导入', value: '1'}, {label: '接口调取', value: '2'}],
        source: [{label: '全部', value: ''},{label: '国脉集团', value: '1'}, {label: 'DISP研发组', value: '2'}],
      },
      tableList: [
        {id: 1, name: '省公安厅信息项池', deptId: '1', source: '1'},
        {id: 2, name: '市建设局信息项池', deptId: '1', source: '1'},
        {id: 3, name: '国脉内网标准池', deptId: '1', source: '2'},
      ],
    }
  },
  computed: {
    formProps () {
      return [
        { label: '规则名称', prop: 'name', type: 'input' },
        { label: '来源方式', prop: 'deptId', type: 'select', data: this.options.deptId },
        { label: '来源部门', prop: 'source', type: 'select', data: this.options.source },
      ]
    },
    tableProps () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        menuWidth: '180px',
        indexLabel:'序号',
        index: true,
        column: [
          {label:'规则名称', prop:'name'},
          {label:'来源方式', prop:'deptId', type: 'dic', dicData: this.options.deptId},
          {label:'来源部门', prop:'source', type: 'dic', dicData: this.options.source},
        ],
      }
    },
  },
  created () {
    this.pagination.total = 3
  },
  methods: {
    // 详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = Object.assign({}, row)
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
  },
}
</script>

<style lang="scss" scoped>

</style>