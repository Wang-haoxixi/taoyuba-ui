<template>
  <gov-dialog
    ref="dialog"
    title="详情"
    width="80%"
    :isBtnGroup="false"
    @closed="handleClosed">
    <layout-form>
      <div class="detail-wrapper">
        <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
      </div>
    </layout-form>
    <info-dialog ref="infoDialog"></info-dialog>
  </gov-dialog>
</template>

<script>
import { infoDetailOption } from './const'

export default {
  computed: {
    detailOption () {
      return infoDetailOption
    },
  },
  props: {
    formData: {
      type: Object,
      default: ()=>{},
    },
  },
  methods: {
    open () {
      console.log(this.formData)
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
  },
}
</script>