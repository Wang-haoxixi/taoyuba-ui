<template>
  <gov-dialog
    ref="formDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'

export default {
  name: 'cleanedDialog',
  mixins: [mixin],
  data () {
    return {
      form: {
        id: '',
        name: '',
        deptId: '',
        source: '',
      },
    }
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: [
              {
                label: '规则名称',
                prop: 'name',
                span: 24,
              },
              {
                label: '规则名称',
                prop: 'name',
                span: 24,
                type: 'dic',
                // dicData: this.options.deptId,
              },
              {
                label: '来源部门',
                prop: 'source',
                span: 24,
                type: 'dic',
                // dicData: this.options.source,
              },
            ],
          },
        ],
      }
    },
  },
  props: {
    status: {
      type: String,
      defaule: 'create',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  watch: {
    temp: {
      handler (newVal) {
        for (let key in this.form) {
          this.form[key] = newVal[key]
        }
      },
      deep: true,
    },
  },
  methods: {
    openDialog () {
      this.open()
    },
    closeDialog () {
      this.$refs[this.refDialog].close()
    },
    handleSubmit () {
      this.$refs.settingForm.validate().then(() => {
        if (this.status === 'create') {
          this.closeDialog()
        } else if (this.status === 'update') {
          this.closeDialog()
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .detail-wrapper, .form-wrapper{
    margin: 20px 0 50px;
  }
</style>