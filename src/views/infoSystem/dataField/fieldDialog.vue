<template>
  <div>
    <gov-dialog
      ref="dialog"
      @open="handleOpenDialog"
      @closed="handleClosedDialog"
      @handleSubmit="handleSubmit"
      :title="dialog.textMap[status]"
      :btnGroup="btnGroup"
      :isBtnGroup="status !== dialog.textName.detail"
      width="80%">
      <layout-form >
        <!-- 详情 -->
        <template v-if="status === dialog.textName.detail">
          <div class="detail-wrapper">
            <gov-detail-form v-model="form" :option="fieldDetailProps"></gov-detail-form>
          </div>
        </template>
        <!-- 编辑 -->
        <template v-else>
          <avue-form ref="fieldForm" :option="fieldUpdateProps" v-model="form"></avue-form>
        </template>
      </layout-form>
    </gov-dialog>
  </div>

</template>
<script>
import mixin from '@/mixins/mixin'
import { fieldUpdateProps } from './const/index'
import {
  updateFields,
} from '@/api/infoSystem/dataField'

export default {
  name: 'fieldDialog',
  mixins: [mixin],
  data () {
    return {
      refNameDialog: 'dialog',
      form: {},
    }
  },
  computed: {
    fieldUpdateProps () {
      return fieldUpdateProps
    },
    fieldDetailProps () {
      return {
        option: [
          {
            column: this.fieldUpdateProps.column,
          },
        ],
      }
    },
  },
  props: {
    currentData: {
      type: Object,
      default () {
        return {}
      },
    },
    id: {
      type: [Number, String],
      dafault: '',
    },
  },
  created () {

  },
  methods: {
    open (formData) {
      this.form = formData
      this.openDialog()
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['fieldForm'].clearValidate() : ""
      })
    },
    close () {
      this.closeDialog()
    },
    // form提交
    handleSubmit () {
      this.$refs['fieldForm'].validate().then(()=>{
        updateFields(this.form).then(()=>{
          this.$message.success('修改成功')
          this.close()
          this.$emit('success')
        })
      }).catch(()=>{})
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      this.form = {}
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['fieldForm'].resetForm() : ""
      })
    },
    // 批量选择
    handleSelectionChange (rows) {
      this.queryData = rows
    },
    handleDeleteQuery () {
      var arr = []
      this.queryData.forEach((item) => {
        arr.push(item.$index)
      })
      this.deleteArrayData(this.tableList, arr)
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
</style>
