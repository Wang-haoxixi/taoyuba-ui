<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :isBtnGroup="dialogOption.state !== 'detail'"
    :btnGroup="btnGroup"
    :title="dialogOption.title"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <layout-form>
      <div class="detail-wrapper">
        <template v-if="dialogOption.state === 'detail' || dialogOption.state === 'auditDetail'">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="form" :option="formOption"></avue-form>
        </template>
        <avue-crud
          :data="tableData"
          :option="tableOption"
          :page="false">
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <gov-button type="text" @click="handleDetail(scope.row)">详情</gov-button>
              <gov-button v-if="dialogOption.state!=='detail'" type="text" @click="handleUpdate(scope.row)">编辑</gov-button>
              <gov-button v-if="dialogOption.state!=='detail'" type="text" @click="handleDelete(scope.row)">删除</gov-button>
            </div>
          </template>
        </avue-crud>
      </div>
    </layout-form>
    <field-dialog ref="fieldDialog" @submit="fieldSubmit" :dialogOption="fieldDialogState"></field-dialog>
  </gov-dialog>
</template>

<script>
import { mainFormOption, fieldTableOption } from './const/index'
import FieldDialog from './fieldDialog'

export default {
  components: { FieldDialog },
  data () {
    return {
      form: {},
      tableData: [],
      fieldDialogState: {
        state: 'update',
        title: '编辑',
      },
    }
  },
  props: {
    dialogOption: {
      type: Object,
      default: ()=>{
        return {
          title: '详情',
          state: 'detail',
        }
      },
    },
  },
  computed: {
    formOption () {
      return mainFormOption
    },
    detailOption () {
      return {
        option: [
          {
            column: mainFormOption.column,
          },
        ],
      }
    },
    tableOption () {
      return fieldTableOption
    },
  },
  methods: {
    open (formData, list) {
      this.tableData = list
      this.form = formData
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后回调
    handleClosed () {
      this.$emit('closed')
      this.form = {}
      this.$nextTick(()=>{
        this.$refs['form'].resetForm()
      })
    },
    // 表单提交
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('submit', this.form, this.tableData)
      })
    },
    // 查看详情
    handleDetail (row) {
      this.fieldDialogState.title = '详情'
      this.fieldDialogState.state = 'detail'
      this.$refs['fieldDialog'].open({...row})
    },
    // 编辑
    handleUpdate (row) {
      this.fieldDialogState.title = '编辑'
      this.fieldDialogState.state = 'update'
      this.$refs['fieldDialog'].open({...row})
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        this.tableData.splice(row.$index, 1)
      }).catch(() => {})
    },
    // 接收字段编辑信息
    fieldSubmit (data) {
      this.$set(this.tableData, data.$index, data)
    },
  },
}
</script>
