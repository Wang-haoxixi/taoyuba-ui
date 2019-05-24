<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :isBtnGroup=true
    :title="dialog.textMap['update']">
    <gov-layout-form> 
      <template>
        <gov-detail-form v-model="form1" :option="detailOption"></gov-detail-form>
        <avue-form ref="form" :option="auditFormOption" v-model="form"></avue-form>
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
  name: "auditProjectDialog",
  data () {
    return {
      form: {},
      formOption: {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '审核结果',
            prop: 'approvalStatus',
            span: 24,
            type: 'select',
            dicData: [{label:'审核通过',value:'3'},{label:'审核不通过',value:'4'}],
            rules: [{ required: true, message: '不能为空', trigger: 'change'}],
          }, {
            label: '不通过原因',
            prop: 'auditNote',
            span: 24,
            visdiplay: false,
            rules: [{ required: true, message: '不能为空', trigger: 'blur'}],
            maxlength: 100,
          },
        ],
      },
      detailForm: {},
      // 弹窗
      dialog: {
        textMap: {
          update: '审核',
        },
        textName: {
          update: 'update',
        },
      },
    }
  },
  watch: {
    'form.approvalStatus': {
      ideep: true,
      handler (val) {
        if (val == '3') {
          this.formOption.column[1].visdiplay = false
          this.form.auditNote = ''
        } else if (val == '4') {
          this.formOption.column[1].visdiplay = true
        }
      },  
    },
  },
  computed: {
    auditFormOption () {
      return this.formOption
    },
    detailOption () {
      return {
        option: [
          {
            column: this.detailForm.column,
          },
        ],
      }
    },
  },
  created () {
    this.getFormOption()
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
        this.detailForm = data.data
      })
    },
    //打开弹窗
    openDialog (formData) {
      this.form1 = formData
      this.form = {id: formData.id}
      this.id = this.form.id
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$nextTick(()=>{
        this.$refs['form'].resetForm()
        this.$refs['dialog'].close()
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.$emit('editAuditSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
  },
}
</script>

<style>

</style>
