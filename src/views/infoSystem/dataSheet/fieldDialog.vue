<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :isBtnGroup="dialogOption.state !== 'detail'"
    :title="dialogOption.title"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <layout-form>
      <div class="detail-wrapper">
        <template v-if="dialogOption.state === 'detail'">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="form" :option="formOption"></avue-form>
        </template>
      </div>
    </layout-form>
  </gov-dialog>
</template>

<script>
import { fieldFormOption } from './const/index'

export default {
  data () {
    return {
      form: {},
    }
  },
  props: {
    dialogOption: {
      type: Object,
      default: ()=>{
        return {
          title: '详情',
          state: 'detail',
        }
      },
    },
  },
  computed: {
    formOption () {
      return fieldFormOption
    },
    detailOption () {
      return {
        option: [
          {
            column: fieldFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    open (formData) {
      this.form = formData
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后回调
    handleClosed () {
      this.$emit('closed')
      this.form = {}
      this.$nextTick(()=>{
        this.$refs['form'].resetForm()
      })
    },
    // 表单提交
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('submit', this.form)
        this.$refs['dialog'].close()
      })
    },
  },
}
</script>
