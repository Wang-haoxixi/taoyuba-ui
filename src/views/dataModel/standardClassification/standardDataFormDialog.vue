<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
     <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form1" :option="mainFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>    
</template>
<script>
import mixin from "@/mixins/mixin"
import { standardDataFormOption } from './const/index'
export default {
  name: "standardDataFormDialog",
  mixins: [mixin],  
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
  created () {

  },
  computed: {
    mainFormOption () {
      return standardDataFormOption
    },
    detailOption () {
      return {
        option: [
          {
            column: this.mainFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    openDialog (formData) {
      this.$refs["dialog"].open()
      this.form = formData || {}
      this.id = this.form.id
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form1'].clearValidate() : ''
      })
    },
  },
}
</script>

