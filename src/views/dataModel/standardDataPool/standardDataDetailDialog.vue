<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosed"
    width="60%"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="mainForm" :option="standardDataDetailFormOption" v-model="formData"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>
import mixin from "@/mixins/mixin"
// import { mapGetters } from 'vuex'
import { standardDataDetailFormOption } from './const/index'
export default {
  mixins: [mixin],
  data () {
    return {
      standardDataDetailFormOption: standardDataDetailFormOption,
      formData: '',
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: this.standardDataDetailFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    openDialog (formData) {
      this.formData = formData
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
  },
}
</script>
