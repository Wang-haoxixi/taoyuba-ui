<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @handledDraftSubmit="handledDraftSubmit"
    @closed="handleClosed"
    :isBtnGroup=true
    :btnGroup="btnGroups"
    :title="status">
    <gov-layout-form>
      <template>
        <div class="form-wrapper">
          <avue-form ref="form" :option="docFormOption" v-model="form">
          </avue-form>
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
      btnGroups: [
        {
          label: '保存草稿',
          name: 'saveDraftButton',
          type: 'primary',
          show: true,
          disabled: false,
          fn: 'handledDraftSubmit',
        },
        {
          label: '保 存',
          name: 'saveButton',
          type: 'primary',
          show: true,
          disabled: false,
          fn: 'handleSubmit',
        },
        {
          label: '取 消',
          name: 'cancalButton',
          show: true,
          type: 'default',
          disabled: false,
          fn: 'handleCancel',
        },
      ],
    }
  },
  props: {
    status: {
      type: String,
      default: '验收与支付',
    },
    moduleType: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    docFormOption () {
      return this.formOption
    },
  },
  methods: {
    getFormOption () {
      getNewPhaseForm(this.$props.moduleType).then(({data})=>{
        data.data.column.forEach((item) => {
          if (item.dicData && item.type != 'tree') {
            if (item.dicData == 'getDept()') {
              item.dicData = getDept()
            } else {
              item.dicData = getDic(item.dicData)
            }
          }  
          if (item.dicData && item.type === 'tree') {
            item.dicData = JSON.parse(item.dicData)
          }
        })
        this.formOption = data.data
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })  
      })
    },
    //打开弹窗
    openDialog (formData) {
      this.form = formData || {}
      this.id = this.form.id
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.getFormOption()
        
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
        this.$emit('editSubmit', this.form, this.moduleType)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    handledDraftSubmit () {
      this.$emit('editDraftSubmit', this.form, this.moduleType)
    },
  },
}
</script>

<style>

</style>
