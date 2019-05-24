<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 新增编辑 -->
        <avue-form ref="form" v-model="form" :option="editOption"></avue-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {editOption, form} from './const/index'
import { submitData } from '@/api/supply/retract'
export default {
  mixins: [mixin],
  data () {
    return {
      formData: {},
      form,
      editOption,
    }
  },
  created () {
    this.dialog.textName.update = '提交'
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
        submitData(this.form).then(() => {
          this.successNotify('保存成功')
          this.$emit('successForm')
          this.close()
        })
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.$refs['form'].resetForm()
      this.resetFormData(this.form, true)
      this.form.id = ''
    },
  },
}
</script>
