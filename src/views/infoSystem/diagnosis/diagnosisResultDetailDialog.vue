<template>
  <gov-dialog
    ref="dialog"
    :title="dialogStatus[status].title ? dialogStatus[status].title : ''"
    :isBtnGroup="status !== 'detail'"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <div class="detail-wrapper">
      <gov-detail-form v-if="status === 'detail'" v-model="form" :option="diagnosisResultDetailOption"></gov-detail-form>
      <avue-form v-else ref="form" :option="diagnosisFormOption" v-model="form"></avue-form>
    </div>
  </gov-dialog>
</template>

<script>
import scopeMixins from './const/info'
export default {
  name: 'infoDialog',
  mixins: [scopeMixins],
  data () {
    return {
      form: {},
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open (formData) {
      this.form = formData
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.form = {}
      this.form.id= ''
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ''
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('submit', this.form)
      }).catch(()=>{})
    },
  },
}
</script>
