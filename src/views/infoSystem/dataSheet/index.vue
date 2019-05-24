<template>
  <!-- 数据表 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
      <gov-layout-button-group>
        <gov-button v-if="ele_datasheet_export" type="export" @click="handleExport"></gov-button>
        <gov-button type="primary" @click="handleDeleteIds(list)" text="批量删除"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="mainTableData"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="ele_datasheet_selete" type="text" @click="handleDetail(scope.row)">详情</gov-button>
            <gov-button v-if="ele_datasheet_update" type="text" @click="handleUpdate(scope.row)">编辑</gov-button>
            <gov-button v-if="ele_datasheet_delete" type="text" @click="handleDelete(scope.row.id)">删除</gov-button>
            <gov-button v-if="ele_datasheet_bulid_catalog && scope.row.buildCatalog === '2'" type="text" @click="buildCatalog(scope.row.id)">生成信息资源</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :dialogOption="mainDialogOption"
      @submit="formSubmit"
      @closed="handleClosed"
      ></main-dialog>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/index'
import mainDialog from './mainDialog'
import {
  getList,
  deleteSheet,
  exportData,
  buildCatalog,
  editSheet,
  getFieldList,
  batchDelete,
} from '@/api/infoSystem/dataSheet'
import { mapGetters } from 'vuex'

export default {
  mixins: [allMixin],
  components: { mainDialog },
  data () {
    return {
      mainTableData: [], // 主表数据
      mainDialogOption: {
        title: '编辑',
        state: 'edit',
      },
      changeList: [],
      formData: {},
      ele_datasheet_export: false,
      ele_datasheet_selete: false,
      ele_datasheet_update: false,
      ele_datasheet_delete: false,
      ele_datasheet_bulid_catalog: false,
    }
  },
  computed: {
    searchOption () {
      return searchOption // 搜索布局
    },
    mainTableOption () {
      return mainTableOption // 主表布局
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getList(this.listQuery).then( res =>{
        this.mainTableData = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
    // 查看详情
    handleDetail (row) {
      this.mainDialogOption.title = '详情'
      this.mainDialogOption.state = 'detail'
      getFieldList(row.id).then(({data}) => {
        this.$refs['mainDialog'].open({...row}, data.data)
      })
    },
    // 编辑
    handleUpdate (row) {
      this.mainDialogOption.title = '编辑'
      this.mainDialogOption.state = 'update'
      getFieldList(row.id).then(({data}) => {
        this.$refs['mainDialog'].open({...row}, data.data)
      })
    },
    handleClosed () {

    },
    formSubmit (formData, tableList) {
      formData.fieldList = tableList
      editSheet(formData).then(({data})=>{
        data.code === 0 ? this.$message.success('编辑成功') : this.$message.error('保存失败')
        this.$refs['mainDialog'].close()
        this.getList()
      }).catch(()=>{
        this.$message.error('保存失败')
      })
    },
    handleEditInfomation (id) {
      this.$refs['infomationDialog'].open(id)
    },
    handleDelete (id) {
      this.$confirm('确定要删除吗').then(() => {
        deleteSheet(id).then(()=>{
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => {})
    },
    handleExport () {
      this.$confirm('是否导出数据表数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let data = Object.assign({}, this.listQuery)
        delete data.page
        delete data.limit
        exportData(data).then(()=>{
          this.$message.info('正在导出数据...')
        })
      }).catch(() => {})
    },
    buildCatalog (id) {
      this.$confirm('是否生成信息资源目录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        buildCatalog(id).then(()=>{
          this.$message.success('生成信息资源成功！')
          this.getList()
        })
      }).catch(() => {})
    },
    //选择
    selectionChange (list) {
      this.changeList = list
    },
    //批量删除
    handleDeleteIds () {
      if (this.changeList.length > 0) {
        this.$confirm('确定要删除吗').then(() => {
          let ids = this.changeList.map(item => {
            return item.id
          })
          batchDelete(ids).then(()=>{
            this.$message.success("删除成功")
            this.getList()
          })
        }).catch(() => {})
      } else {
        this.warningNotify('请选择数据')
      }
    },
  },
  created () {
    this.getList()
    this.ele_datasheet_export = this.permissions['ele_datasheet_export']
    this.ele_datasheet_selete = this.permissions['ele_datasheet_selete']
    this.ele_datasheet_update = this.permissions['ele_datasheet_update']
    this.ele_datasheet_delete = this.permissions['ele_datasheet_delete']
    this.ele_datasheet_bulid_catalog = this.permissions['ele_datasheet_bulid_catalog']

  },
}
</script>
