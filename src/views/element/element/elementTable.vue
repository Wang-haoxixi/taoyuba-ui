<template>
  <div>
    <div class="no-border">
      <avue-crud
        @selection-change="handleSelectionChange"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="elementTableProps">
        <template slot-scope="scope" slot="menu">
          <el-button
            v-if="btnGroupStatus.detailBtn"
            @click="handleDetail(scope.row)"
            type="text"
            size="small">详情</el-button>
          <el-button
            v-if="btnGroupStatus.updataBtn"
            @click="handleUpdate(scope.row)"
            type="text"
             size="small">编辑</el-button>
          <el-button
            v-if="btnGroupStatus.deleteBtn"
            @click="handleDelete(scope.row)"
            type="text"
            size="small">删除</el-button>
        </template>
      </avue-crud>
    </div>
    <element-dialog
      :informaionForm="informaionForm"
      @success="elementSuccess"
      :temp="formData"
      :status="dialogStatus"
      ref="formDialog"/>
  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import { elementTableProps } from './const/element'
import elementDialog from './elementDialog'
import {elementTableData} from '@/api/element/element'
import mergeWith from 'lodash/mergeWith'
export default {
  components: {elementDialog},
  mixins: [mixin],
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    isPage: {
      type: Boolean,
      defaule: true,
    },
    // 信息資源數據
    informaionForm: {
      type: Object,
      default () {
        return {}
      },
    },
    // 按鈕顯示
    btnGroup: {
      type: Object,
      default () {
        return {}
      },
    },
    // 是否有checkbox
    isSelection: {
      type: Boolean,
      default: false,
    },
    // 搜索參數
    queryData: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      refNameDialog: 'formDialog',
      elementCurrentIndex: '',
      btnGroupStatus: {detailBtn: true, updataBtn: true, deleteBtn: true},
    }
  },
  computed: {
    elementTableProps () {
      return elementTableProps
    },
  },
  watch: {
    total: {
      handler (newVal) {
        if (newVal > 0) {
          this.pagination.total = newVal
        }
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler (newVal) {
        if (newVal.length > 0) {
          this.tableList = newVal
        }
      },
      deep: true,
      immediate: true,
    },
    isPage: {
      handler () {
        this.elementTableProps.page = true
      },
      deep: true,
      immediate: true,
    },
    isSelection: {
      handler (newVal) {
        this.$set(this.elementTableProps, 'selection', newVal)
      },
      deep: true,
      immediate: true,
    },
    btnGroup: {
      handler (newVal) {
        this.btnGroupStatus = mergeWith(this.btnGroupStatus, newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  created () {
    this.getDicList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      elementTableData(this.queryData).then((response) => {
        let res = response.data
        if (res.code === 0) {
          const data = res.data
          this.tableList = data.records
          this.pagination.total = data.total
        }
        this.tableLoading = false
      })
    },
    getDicList () {
      const dicList = {
        dataTypeList: this.getDic('DATA_TYPE'),
        sharingTypeList: this.getDic('SHARING_TYPE'),
        sharingModeList: this.getDic('SHARING_MODE'),
        isOpen: this.getDic('IS_NOT'),
      }
      let data = this.elementTableProps.column
      data.forEach(item => {
        if (item.type === 'dic') {
          item.dicData = dicList[item.prop]
        }
      })
      console.log('ddd', data)
    },
    // 批量选择
    handleSelectionChange (rows) {
      this.$emit('handleSelectionChange', rows)
    },
    // 列表详情
    handleDetail (row) {
      console.log(row)
      this.dialogStatus = 'detail'
      this.formData = Object.assign({}, row)
      this.openDialog()
    },
    // 列表编辑
    handleUpdate (row) {
      this.clearValidate()
      this.dialogStatus = 'update'
      this.formData = Object.assign({}, row)
      this.elementCurrentIndex = row.$index
      this.openDialog()
    },
    // 列表新增
    handleCreate () {
      this.formData = {}
      this.dialogStatus = 'create'
      this.elementCurrentIndex = ''
      this.openDialog()
    },
    // 列表单条删除
    handleDelete (row) {
      this.$emit('handleElementDelete', row)
    },
  },
}
</script>
<style>

</style>