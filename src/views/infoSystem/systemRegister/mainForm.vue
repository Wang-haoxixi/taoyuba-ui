<template>
  <avue-form ref="form" v-model="form" :option="option"></avue-form>
</template>

<script>
import mixin from './const/form.js'

export default {
  data (){
    return {
      form: {}, // 表单数据
    }
  },
  mixins: [ mixin ],
  computed: {
    // 表单配置
    option () {
      return {
        menuBtn: false,
        labelWidth: '180',
        labelPosition: 'right',
        column: this.formCurd,
      }
    },
  },
  methods: {
    // 提交表单数据
    handleSubmit () {
      this.$refs.form.validate().then(()=>{
        this.$emit('submit', this.form)
      }).catch(()=>{
        this.$message.error('请填写所有必填字段后提交！')
      })
    },
    handleDraft () {
      this.$emit('draft', this.form)
    },
    // 重置表单
    resetForm () {
      this.$refs['form'].resetForm()
      this.$refs['form'].clearValidate()
    },
    // 加载编辑数据
    handleEdit (formData) {
      this.form = {...formData}
    },
    clearValidate () {
      this.$refs['form'].clearValidate()
    },
  },
}
</script>