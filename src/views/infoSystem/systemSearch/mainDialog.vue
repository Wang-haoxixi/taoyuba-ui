<template>
  <gov-dialog
    ref="dialog"
    title="详情"
    @closed="handleClosed"
    width="80%"
    :isBtnGroup="false">
    <gov-layout-form>
      <div class="detail-wrapper">
        <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>
import { formCurd } from '../systemRegister/const/fields'
export default {
  data () {
    return {

    }
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: formCurd,
          },
        ],
      }
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
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {

    },
  },
}
</script>