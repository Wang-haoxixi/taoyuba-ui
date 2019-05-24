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
import { disAgreeFormOption } from '../const/index'
import { materialOperation } from '@/api/supply/material'
export default {
  data () {
    return {
      deptList: [],  // 统筹部门
      status: {no: '非数源部门'},
      form: {flowVOs:[]},
    }
  },
  computed: {
    formOption () {
      let data = disAgreeFormOption
      if (this.form.flowVOs) {
          if (this.form.flowVOs.length == 1) {
          data.column[0].dicData = this.deptList
        } else {
          data.column[0].dicData = getDept()
        }
      }
      return data
    },
  },
  props: {
    state: {
      type: String,
      default: 'no',
    },
  },
  methods: {
    open (data) {
      this.form = {...data}
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
        this.form.materialId = this.form.id
        materialOperation(this.form).then(() => {
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