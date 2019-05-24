<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form> 
      <template>
        <div class="form-wrapper" v-if="status !== 'detail'">
          <avue-form ref="form" :option="projectFormOption" v-model="form"></avue-form>
        </div>
        <div class="form-wrapper" v-else>
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>  
      </template>
    </gov-layout-form>
  </gov-dialog>      
</template>
<script>
import { getDic, getDept } from '@/util/dic'
import mixin from "@/mixins/mixin"
import { getNewPhaseForm } from '@/api/projectManagement/projectList'
export default {
  mixins: [mixin],
  name: "projectDialog",
  data () {
    return {
      form: {},
      formOption: {},
    }
  },
  props: {
    status: {
      type: String,
      default: 'create',
    },
  },
  created () {
    this.getFormOption()
  },
  computed: {
    projectFormOption () {
      return this.formOption
    },
    detailOption () {
      let detail = [...this.formOption.column]
      detail.push({label: "审核结果",prop: "approvalStatus",dicData: [{label:'审核通过',value:'3'},{label:'审核不通过',value:'4'}]},{label: '不通过原因',prop: 'auditNote'})
      return {
        option: [
          {
            column: detail,
          },
        ],
      }
    },
  },
  methods: {
    getFormOption () {
      var moduleType = 1
      getNewPhaseForm(moduleType).then(({data})=>{
        data.data.column.forEach((item) => {
          if (item.dicData && item.type != 'tree') {
            if (item.dicData == 'getDept()') {
              item.dicData = getDept()
            } else if (item.inputType == 3) {
              item.dicData = JSON.parse(item.dicData)
            } else {
              item.dicData = getDic(item.dicData)
            }  
          }
          if (item.dicData && item.type === 'tree') {
            item.dicData = JSON.parse(item.dicData)
          }
        })
        this.formOption = data.data
      })
    },
    //打开弹窗
    openDialog (formData) {
      this.form = formData || {}
      this.id = this.form.id
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ""
        this.$refs['dialog'].close()
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
  },
}
</script>

<style>

</style>
