<template>
  <gov-dialog
    width="70%"
    :title="dialogOption[status].title"
    @handleSubmit="handleSubmit"
    @closed="closed"
    ref="dialog"
    >
    <avue-form ref="form" v-model="form" :option="mainFormOption"></avue-form>
  </gov-dialog>
</template>

<script>
import {dataBaseFormOption} from './const/index'

export default {
  data () {
    return {
      dialogOption: {
        detail: {
          title: '数据库详情',
        },
        create: {
          title: '数据库新增',
        },
        update: {
          title: '数据库修改',
        },
      },
      form: {},
    }
  },
  computed: {
    mainFormOption () {
      return dataBaseFormOption
    },
  },
  props: {
    status: {
      type: String,
      default: "detail",
    },
  },
  methods: {
    open (formData) {
      this.form = formData
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
        this.$refs['form'].clearValidate()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    closed () {
      this.$nextTick(()=>{
        this.form = {}
        this.$refs['form'].resetForm()
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('submit', this.form, this.status)
      }).catch(()=>{})
    },
  },
}
</script>