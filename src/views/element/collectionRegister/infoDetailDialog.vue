<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    title="信息资源详情"
    :isBtnGroup="false"
    width="80%">
    <div class="detail-wrapper">
      <gov-detail-form v-model="formData" :option="informationDetailProps"></gov-detail-form>
    </div>
  </gov-dialog>
</template>

<script>
import { informationDetailOption } from './const/index'

export default {
  computed: {
    informationDetailProps () {
      return informationDetailOption
    },
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  methosd: {
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosedDialog () {

    },
  },
}
</script>