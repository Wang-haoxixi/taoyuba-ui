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
import { getDept } from '@/util/dic'
import { disAgreeFormOption } from './const/index'
import { itemOperation } from '@/api/supply/item'
export default {
  data () {
    return {
      deptList: [],  // 统筹部门
      status: {no: '非数源部门'},
      form: {flowVOs:[]},
      formOption: disAgreeFormOption,
    }
  },
  computed: {
  },
  props: {
    state: {
      type: String,
      default: 'no',
    },
  },
  watch: {
  },
  methods: {
    open (data) {
      this.form = {...data}
      if(data.flowVOs && data.flowVOs.length === 1){
        this.formOption.column[0].dicData = this.deptList
      }else{
        this.formOption.column[0].dicData = getDept()
      }
      // console.log('data',data)
      this.$nextTick(() => {
        this.$refs['dialog'].open()
      })
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
        this.form.attitude = 0
        this.form.itemId = this.form.id
        itemOperation(this.form).then(() => {
          this.$emit('submitForm', this.form)
          this.close()
        })
      })
    },
  },
  created () {
    for (let item of getDept()) {
      if (item.type == 1) {
        this.deptList.push(item)
      }
    }
  },
}
</script>
