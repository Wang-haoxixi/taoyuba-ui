<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="formProps"
        @handleFilter="handleFilter"
      />
      <!-- 按钮组 -->
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleDeleteIds(list)" text="批量删除"/>
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
        :option="fieldTableProps"
        @selection-change="mainTableSelectionChange">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="ele_datafield_selete" type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
            <gov-button v-if="ele_datafield_update" type="text" @click="handleUpdate(scope.row)" text="修改"></gov-button>
            <gov-button v-if="ele_datafield_delete" type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 主弹窗 -->
    <field-dialog
      @success="fieldSuccess"
      :status="dialogStatus"
      ref="formDialog"/>
  </gov-layout-main>
</template>
<script>
import fieldDialog from './fieldDialog'
import {fieldTableProps} from './const/index'
import {
  getList,
  deleteFields,
  batchDelete,
} from '@/api/infoSystem/dataField'

import mixin from '@/mixins/mixin'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    fieldDialog,
  },
  data () {
    return {
      fieldTableProps,
      changeList:[],
      listQuery: {
        name: undefined,
      },
      ele_datafield_selete: false,
      ele_datafield_update: false,
      ele_datafield_delete: false,
    }
  },
  computed: {
    // 搜索表单参数
    formProps () {
      return [
        { label: '字段中文名', prop: 'nameCn', type: 'input' },
      ]
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.ele_datafield_selete = this.permissions['ele_datafield_selete']
    this.ele_datafield_update = this.permissions['ele_datafield_update']
    this.ele_datafield_delete = this.permissions['ele_datafield_delete']

  },
  methods: {
    //表格选择框
    mainTableSelectionChange (list) {
      this.changeList = list
    },
    // 列表
    getList () {
      this.tableLoading = true
      getList(this.listQuery).then(({data}) => {
        let res = data
        if (res.code === this.SUCCESS) {
          const data = res.data
          this.tableList = data.records
          this.pagination.total = data.total
        }
        this.tableLoading = false
      })
    },
    // 列表详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs['formDialog'].open({...row})
    },
    // 列表编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs['formDialog'].open({...row})
    },
    // 列表单条删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteFields(row.id).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    fieldSuccess () {
      this.getList()
    },
    // 批量删除
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
}
</script>
