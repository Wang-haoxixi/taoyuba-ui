<template>
  <gov-dialog
    title="申请详情"
    @closed="handleClosed"
    ref="dialog">
    <layout-form>
      <div class="detail-wrapper">
        <gov-detail-form v-model="form" :option="formOption"></gov-detail-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>

<script>
import { formOption } from './const/index'

export default {
  data () {
    return {
      formOption: formOption,
      form: {},
    }
  },
  props: {
    formData: {
      type: Object,
      default: ()=>{},
    },
  },
  methods: {
    open () {
      this.$nextTick(()=>{
        this.form = this.formData
        this.$refs['dialog'].open()
      })
    },
    handleClosed () {
      this.form = {}
      this.$emit('closed')
      this.$refs['form'].resetForm()
    },
  },
}
</script>