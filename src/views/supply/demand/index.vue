<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :list-query="listQuery"
        label-width="80px"
        :form-props="searchOption"
        :is-string="false"
        :reset-ignore="['isAsc', 'limit', 'page']"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button v-if="sup_demand_add" type="add" @click="handleCreate"/>
        <gov-button v-if="sup_demand_export" type="export" @click="handleExport"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :data="mainTableData"
        :option="mainTableOption"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
            <gov-button v-if="sup_demand_edit" type="text" @click="handleUpdate(scope.row)" text="编辑" :disabled="scope.row.auditState!==0"></gov-button>
            <gov-button v-if="sup_demand_del" type="text" @click="handleDelete(scope.row.id)" text="删除" :disabled="scope.row.auditState!==0"></gov-button>
            <gov-button type="text" @click="handleSubmit(scope.row.id)" text="提交" :disabled="scope.row.auditState!==0"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :state="state" @successSubmit="getList" :dept-list="deptList"></main-dialog>
  </gov-layout-main>
</template>

<script>
import { mainTableOption } from './const/index'
import { getDept, getDic, getDeptById } from '@/util/dic'
import mainDialog from './mainDialog'
import { getTableData, deleteData, submitTj, getMatterData } from '@/api/supply/demand'
import exportDownload from '@/util/export'
import mixin from '@/mixins/mixin'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { mainDialog },
  computed: {
    searchOption () {
      return [
        {label: '事项名称', prop: 'matName'},
        {label: '事项编码', prop: 'matCode'},
        {label: '需求部门', prop: 'deptId', type:'select', data: this.deptList, show: this.deptType },
        {label: '类别', prop: 'type', type: 'cascader', data: getDic('SUPPLY_ITEM_TYPE')},
        {label: '状态', prop: 'auditState', type: 'select', data: this.statusList},
      ]
    },
    mainTableOption () {
      return mainTableOption
    },
    ...mapGetters(['userInfo','permissions']),
    deptType () {
      return getDeptById(this.userInfo.deptId).type ? true : false
    },
  },
  data () {
    return {
      tableLoading: true,
      cityList: [],
      mainTableData: [], // 主表数据
      formData: {},
      state: 'create',
      deptList: getDept(),
      statusList: [{value: 0, label: '待提交'}, {value: 1, label: '待确认'}, {value: 2, label: '已确认'}],
      sup_demand_add: false,
      sup_demand_export: false,
      sup_demand_edit: false,
      sup_demand_del: false,
    }
  },
  methods: {
    handleCreate () {
      this.state = 'create'
      this.$refs['mainDialog'].open({})
    },
    handleUpdate (row) {
      getMatterData(row.id).then((res)=>{
        this.state = 'update'
        this.formData = _.cloneDeep(res.data.data)
        this.$refs['mainDialog'].open(this.formData)
      })
    },
    handleDetail (row) {
      getMatterData(row.id).then((res)=>{
        this.state = 'detail'
        this.formData = _.cloneDeep(res.data.data)
        this.$refs['mainDialog'].open(this.formData)
      })
    },
    handleDelete (id) {
      this.$confirm('确定要删除吗').then(() => {
        deleteData(id).then(() => {
          this.$message.success(this.DELETE)
          this.getList()
        })
      }).catch(() => {})
    },
    handleSubmit (id) {
      this.$confirm('确定要提交吗').then(() => {
        submitTj(id).then(() => {
           this.$message.success('提交成功')
          this.getList()
        })
      }).catch(() => {})
    },
    // 获取主表数据
    getList () {
      let data = Object.assign({}, this.listQuery)
      delete data.type
      this.tableLoading = true
      getTableData(data).then((res) => {
        this.pagination.total = res.data.data.total
        this.mainTableData = res.data.data.records
        this.tableLoading = false
      })
    },
    handleCloseMainDialog () {
      this.$refs['mainDialog'].close()
    },
    handleExport () {
      exportDownload({url: '/gvs/excel/export', method: 'get', title: '需求梳理导出'})
    },
  },
  watch: {
    'listQuery.type' (newVal) {
      this.listQuery.types = newVal.toString()
    },
  },
  created () {
    this.getList()
    this.sup_demand_add = this.permissions['sup_demand_add']
    this.sup_demand_export = this.permissions['sup_demand_export']
    this.sup_demand_edit = this.permissions['sup_demand_edit']
    this.sup_demand_del = this.permissions['sup_demand_del']

  },
}
</script>
