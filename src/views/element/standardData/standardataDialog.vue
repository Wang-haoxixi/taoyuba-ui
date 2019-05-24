<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :title="dialog.textMap[status]"
  >
    <avue-form ref="form" v-model="form" :option="mainFormOption"></avue-form>
    <gov-layout-button-group v-if="status==='update'">
      <gov-button type="add" @click="handleNewly"></gov-button>
      <gov-button type="default" @click="querySql">查看SQL</gov-button>
    </gov-layout-button-group>
    <avue-crud
      :data="tableList"
      :option="standarTableOption"
      :tableLoading="tableLoading"
      :page="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-if="status==='update'"
    >
      <template slot-scope="rowData" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleUpdate(rowData)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(rowData.row.id)" type="text" size="small">删除</el-button>
        </div>
      </template>
    </avue-crud>
    <fieldDialog
      ref="fieldDialog"
      :pid="id"
      :title="fieldDialogTitle"
      @submit="fieldFormSubmit"
      @closed="fieldDialogClosed"
    ></fieldDialog>
  </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
// import { getDic } from "@/util/dic"
import { getFieldsDataList, fieldsDelete, fieldsNewly, fieldsEdit, querySql } from "@/api/element/standardata"
import { standardataFormOption, standarTableOption } from "./const/index"
import fieldDialog from './fieldDialog'
import _ from 'lodash'

export default {
  mixins: [mixin],
  components: { fieldDialog },
  data () {
    return {
      id: "",
      fieldDialogTitle: "",
      dialog: {
        textMap: {
          create: "新增",
          update: "编辑",
          delete: "删除",
          drop: "导入数据",
        },
      },
      tableList: [],
    }
  },
  props: {
    form: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  computed: {
    mainFormOption () {
      return standardataFormOption
    },
    standarTableOption () {
      return standarTableOption
    },
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      this.listQuery.tableId = this.id
      getFieldsDataList(this.listQuery).then(({data})=>{
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    openDialog (formData) {
      this.$refs["dialog"].open()
      this.form = formData || {}
      this.id = this.form.id
      this.$nextTick(() => {
        this.getList()
        this.$refs['form'].clearValidate()
      })
    },
    closeDialog () {
      this.$refs['dialog'].close()
    },
    handleClosedDialog () {
      this.$emit("closed")
      this.$nextTick(()=>{
        this.form = {}
        this.$refs['form'].resetForm()
      })
    },
    handleSubmit () {
      this.$refs.form.validate().then(()=>{
        this.$emit('submit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    handleNewly () {
      this.fieldDialogTitle = "新增字段"
      this.$refs['fieldDialog'].open({})
    },
    handleUpdate (row) {
      let rowData = _.cloneDeep(row)
      this.fieldDialogTitle = "编辑字段"
      this.$refs['fieldDialog'].open(rowData.row)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        fieldsDelete(id).then(()=>{
          this.$message({
            type: 'success',
            message: `删除成功!`,
          })
          this.getList()
        })
      }).catch(() => {})
    },
    fieldFormSubmit (formData, pid) {
      if (this.fieldDialogTitle.indexOf('新增') > -1) {
        fieldsNewly(formData, pid).then(()=>{
          this.$message.success('新增字段成功')
          this.getList()
        })
      } else {
        fieldsEdit(formData, pid).then(()=>{
          this.$message.success('编辑字段成功')
          this.getList()
        })
      }
      this.$refs['fieldDialog'].close()
    },
    fieldDialogClosed () {
      // this.getList()
    },
    querySql () {
      querySql(this.id).then(({data})=>{
        this.$alert(data.data, '查看SQL', {
          dangerouslyUseHTMLString: true,
        })
      })
    },
  },
}
</script>
