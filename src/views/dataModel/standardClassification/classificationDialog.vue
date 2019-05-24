<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form1" :option="mainFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
    <!-- 新增按钮 -->
      <gov-layout-button-group v-if="status !== 'detail'">
        <gov-button type="add" @click="handleAdd" plain="true"></gov-button>
      </gov-layout-button-group>
    <avue-crud
      :data="tableList"
      :option="standardDataTableOption"
      :tableLoading="tableLoading"
      :page="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleDetial(scope.row)" type="text" size="small">详情</el-button>
        </div>
      </template>
    </avue-crud>
    <!-- 弹窗 -->
    <standard-data-table-dialog
      @getList="getList"
      @closed="handleClosed"
      @submit="handleSubmitStandardData"
      ref="tableDialog"/>
    <standard-data-form-dialog
      :status="formDialogStatus"
      ref="formDialog"/>

  </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
import { classificationFormOption, standardDataTableOption } from "./const/index"
import { getStandardDataPage } from "@/api/dataModel/standardClassification"
import standardDataTableDialog from './standardDataTableDialog'
import standardDataFormDialog from './standardDataFormDialog'
export default {
  name: "classificationDialog",
  mixins: [mixin],
  components: {standardDataTableDialog, standardDataFormDialog},
  data () {
    return {
      form: {},
    }
  },
  props: {
    formData: {
      type: Object,
      default () {
        return {}
      },
    },
    status: {
      type: String,
      default: 'detail',
    },
  },
  created () {

  },
  computed: {
    // 查询字段
    mainFormOption () {
      return classificationFormOption
    },
    detailOption () {
      return {
        option: [
          {
            column: this.mainFormOption.column,
          },
        ],
      }
    },
    standardDataTableOption () {
        return standardDataTableOption
    },
  },
  methods: {
    //打开弹窗
    openDialog (formData) {
      this.$nextTick(() => {
        if (this.status !== 'create') {
          this.listQuery.ids = formData.dataEleIds
          this.getList()
        } else {
          this.tableList = []
        }
      })
      this.$refs["dialog"].open()
      this.form = formData || {}
      this.id = this.form.id
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form1'].clearValidate() : ''
      })
    },
    //查询标准数据元
    getList () {
      this.tableLoading = true
      getStandardDataPage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    //提交表单
    handleSubmit () {
      if (this.tableList.length < 1) {
        this.$message.error('请选择标准数据元!')
        return
      } else {
        let ids = []
        this.tableList.forEach((item) => {
          ids.push(item.id)
        })
        this.form.dataEleIds = ids.toString()
      }

      this.$refs.form1.validate().then(()=>{
        this.$emit('submit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    //子组件提交的表单
    handleSubmitStandardData (selectList) {
      if (selectList.length > 0) {
        let flag = true
        this.tableList.forEach((item) => {
          selectList.forEach((data) => {
            if (item.id === data.id) {
              this.$message.error('已存在相同数据,中文名称为'+data.dataCn)
              flag = false
            }
          })
        })
        if (flag) {
          for (var i = 0;i < selectList.length;i++) {
            this.tableList.push(selectList[i])
          }
        }
      }
    },
    //关闭弹窗
    handleClosedDialog () {
      this.$emit("closed")
      this.$nextTick(()=>{
        this.form = {}
        this.status !== 'detail' ? this.$refs['form1'].resetForm() : ''
      })
    },
    //提供给调用者关闭弹窗
    closeDialog () {
      this.$refs['dialog'].close()
    },
    handleAdd () {
      this.$refs.tableDialog.openDialog()
    },
    handleDetial (data) {
      this.formDialogStatus = 'detail'
      this.$refs['formDialog'].openDialog(data)
    },
  },
}
</script>
