<template>
  <gov-dialog
    ref="formDialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    @handleCancel="close"
    @handleSubmit="handleSubmit"
    :title="dialog.textMap[status]"
    width="70%">
    <layout-form>
      <avue-form ref="form" :option="updateProps" v-model="form"/>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {updateProps, form} from './const/index'
import {createSocial, updateSocial} from '@/api/admin/social'
export default {
  mixins: [mixin],
  data () {
    return {
      updateProps,
      form,
    }
  },
  watch: {
    temp: {
      handler (newVal) {
        this.copyData(this.form, newVal)
      },
      deep: true,
      immediate: true,
    },
    status (newVal) {
      if (newVal === this.dialog.textName.create) {
        this.$set(this.updateProps.column[0], 'visdiplay', false)
        this.$set(this.updateProps.column[6], 'visdiplay', false)
      } else {
        this.$set(this.updateProps.column[0], 'visdiplay', true)
        this.$set(this.updateProps.column[6], 'visdiplay', true)
      }
    },
  },
  methods: {
    handleClosedDialog () {
      this.resetForm('form')
    },
    handleOpenDialog () {
      this.clearValidate('form')
    },
    handleSubmit () {
      let form = Object.assign({}, this.form)
      delete form.createTime
      console.log('status', this.status)
      this.$refs['form'].validate().then(() => {
        if (this.dialog.textName.create === this.status) {
          createSocial(form).then(() => {
            this.$emit('successSubmit')
            this.close()
          })
        } else {
          updateSocial(form).then(() => {
            this.$emit('successSubmit')
            this.close()
          })
        }
      })
    },
  },
}
</script>