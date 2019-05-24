<template>
  <gov-dialog
    ref="dialog"
    :title="status[state]"
    @closed="handleClosed"
    @handleSubmit="handleSubmit"
    :is-btn-group="true">
    <gov-layout-form>
      <template>
        <div class="form-wrapper">
          <avue-form ref="form" :option="formOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>
import { itemOperation } from '@/api/supply/item'
import { agreeFormOption } from '../const/index'
export default {
  data () {
    return {
      deptList: [],
      status: {yes: '是数源部门'},
      form: {},
      recDeptList: [],
    }
  },
  computed: {
    formOption () {
      return agreeFormOption
    },
  },
  props: {
    state: {
      type: String,
      default: 'yes',
    },
  },
  methods: {
    open (data) {
      this.$refs['dialog'].open()
      this.form = {...data}
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$refs.form.clearValidate()
      this.$refs.form.resetForm()
    },
    handleSubmit (){
      this.$refs['form'].validate().then(()=>{
        console.log("form: ", this.form)
        this.form.attitude = 1
        this.form.itemId = this.form.id
        itemOperation(this.form).then(() => {
          this.$emit('submitForm', this.form)
          this.close()
        })
      })
    },
  },
}
</script>