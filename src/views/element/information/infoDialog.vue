<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    :title="dialogStatus[status].title ? dialogStatus[status].title : ''"
    :isBtnGroup="status !== 'detail'"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <div class="detail-wrapper">
      <gov-detail-form v-if="status === 'detail'" v-model="form" :option="infoFormDetailOption"></gov-detail-form>
      <avue-form v-else ref="form" :option="infoFormOption" v-model="form"></avue-form>
    </div>
  </gov-dialog>
</template>

<script>
// import { infoFormOption } from "./const/info"
import scopeMixins from './const/info'
export default {
  name: 'infoDialog',
  mixins: [scopeMixins],
  data () {
    return {
      dialogStatus: {
        update: {
          title: '编辑',
        },
        detail: {
          title: '详情',
        },
        create: {
          title: '新增',
        },
      },
      form: {},
    }
  },
  computed: {
    infoFormDetailOption () {
      return {
        option: [
          {
            column: this.infoFormOption.column,
          },
        ],
      }
    },
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open (formData) {
      this.$nextTick(()=>{
        this.form = formData
        this.$refs['dialog'].open()
        this.$nextTick(()=>{
          this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
        })
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.form = {}
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ''
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('submit', this.form)
      }).catch(()=>{})
    },
  },
}
</script>
