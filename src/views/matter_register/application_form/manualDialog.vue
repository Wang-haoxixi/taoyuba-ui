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
      <!-- 编辑 -->
      <avue-form ref="form" v-model="form" :option="infoEditOption"></avue-form>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import matterMixin from './const/mixin'
export default {
  mixins: [mixin, matterMixin],
  data () {
    return {
      index: undefined,
    }
  },
  methods: {
    open (row,index) {
      if(row){
        this.form = row
        this.index = index
      }
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
          this.$refs['form'] && this.$refs['form'].clearValidate()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        if(this.index !== undefined){
          this.$emit('updateForm', this.form, this.index)
        }else{
          this.$emit('successForm', this.form)
        }
        this.close()
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.resetFormData(this.form, true)
      this.tableList = []
      this.index = undefined
    },
  },

}
</script>
