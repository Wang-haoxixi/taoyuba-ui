<template>
  <gov-dialog
    title="生成配置"
    ref="dialog"
    @closed="handleClosed"
    @handleCreate="handleCreate"
    :btnGroup="btnGroup">
      <avue-form
        :option="formOption"
        ref="form"
        v-model="data"
      >
      </avue-form>
  </gov-dialog>
</template>

<script>
import { formOption } from './const/'

export default {
  data () {
    return {
      btnGroup: [
        {
          label: '取消',
          type: 'default',
          fn: 'handleCancel',
        }, {
          label: '生成',
          type: 'primary',
          fn: 'handleCreate',
        },
      ],
      formOption: formOption,
      data: {},
    }
  },
  props: ['formData'],
  methods: {
    open () {
      this.data = this.formData
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleCreate () {
      this.$emit('handleCreate', this.data)
    },
    handleClosed () {
      this.$refs['form'].resetForm()
    },
  },
}
</script>