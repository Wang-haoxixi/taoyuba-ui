<template>
  <gov-dialog
    ref="dialog"
    @open="handlerOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
      <!-- 详情 -->
      <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption"></gov-detail-form>
      <!-- 编辑 -->
      <avue-form ref="form" v-else v-model="form" :option="editOption"></avue-form>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {editOption, detailOption, form} from './const/informationItem'
export default {
  mixins: [mixin],
  data () {
    return {
      editOption,
      detailOption,
      form,
    }
  },
  methods: {
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        if (this.status === this.dialog.textName.create) {
          this.$message.success('添加成功')
          this.$emit('successForm', this.form)
          this.close()
        } else if (this.status === this.dialog.textName.update) {
          this.$message.success('修改成功')
          this.$emit('successForm', this.form)
          this.close()
        }
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.resetFormData(this.form, true)
      this.tableList = []
    },
  },

}
</script>
