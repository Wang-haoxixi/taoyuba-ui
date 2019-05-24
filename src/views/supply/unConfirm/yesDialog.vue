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
import { getDept, getDic } from '@/util/dic'
export default {
  data () {
    return {
      deptList: [],
      status: {yes: '是数源部门'},
      form: {},
      recDeptList: [],
      materialType: true,
    }
  },
  computed: {
    formOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '需求部门',
            prop: 'demandDeptId',
            type: 'select',
            span: 24,
            disabled: true,
            dicData: getDept(),
          }, {
            label: '事项名称',
            prop: 'matName',
            span: 24,
            disabled: true,
          }, {
            label: '材料名称',
            prop: 'materialName',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            span: 24,
            maxlength: 100,
          }, {
            label: '材料类别',
            prop: 'materialType',
            span: 24,
            type: 'select',
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('SUPPLU_MATERIAL_TYPE'),
          }, {
            label: '数据项名称',
            prop: 'itemName',
            rules: [{ required: this.materialType, message: '不能为空', trigger: 'blur' }],
            span: 24,
            maxlength: 100,
          }, {
            label: '责任部门',
            prop: 'deptId',
            type: 'select',
            span: 24,
            dicData: getDept(),
            disabled: true,
          },
        ],
      }
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
  watch: {
    'form.materialType' (newVal) {
      console.log("newVal: ", newVal)
      this.materialType = newVal == 1
    },
  },
}
</script>