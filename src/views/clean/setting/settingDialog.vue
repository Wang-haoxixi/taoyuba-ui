<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
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
          <avue-form ref="settingForm" :option="formOption" v-model="form">
          </avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
export default {
  name: 'settingDialog',
  mixins: [mixin],
  data () {
    return {
      dialog: {
        textMap: {
          create: '新增',
          update: '编辑',
          detail: '详情',
        },
        visible: false,
      },
      form: {
        id: '',
        name: '',
      },
      formOption: {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '规则名称',
            prop: 'name',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
        ],
      },
      detailOption: {
        option: [
          {
            column: [
              {
                label: '规则名称',
                prop: 'name',
                span: 24,
              },
            ],
          },
        ],
      },
    }
  },
  props: {
    status: {
      type: String,
      defaule: 'create',
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
      this.$refs['dialog'].open()
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