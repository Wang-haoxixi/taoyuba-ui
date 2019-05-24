<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form" :option="projectConfigFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>    
</template>

<script>
import mixin from "@/mixins/mixin"
import scopeMixins from './const/mixin'
import { getDictSelect} from '@/api/projectManagement/projectConfig'
export default {
  mixins: [mixin, scopeMixins],
  name: "projectConfigDialog",
  data () {
    return {
      form: {},
      showBoxValue: false,
      showAction: false,
      showModule: false,
      dictSelect: [],
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  created () {
    this.getDictForSelect()
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: this.projectConfigFormOption.column,
          },
        ],
      }
    },
  },
  watch: {
    'form.inputBoxType': {
      deep: true,
      handler (val) {
        if (val === '2'|| val === '9' || val === '10') {
          this.showBoxValue = true
        } else {
          this.showBoxValue = false 
        }
        if (val ==='21') {
          this.showAction = true
        } else {
          this.showAction = false
          this.form.action = ""
        }
        if (val ==='1') {
          this.isMultiSelect = false
           this.form.isMultiSelect = ""
        } else {
          this.isMultiSelect = true
        }
        this.$nextTick(()=>{
          this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
        })
      },
    },
    'form.moduleType': {
      deep: true,
      handler (val) {
        if (val === '7') {
          this.showModule = true
        } else {
          this.showModule = false
          this.form.showModuleType = ""
        }
        this.$nextTick(()=>{
          this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
        })
      },
    },
  },
  methods: {
    getDictForSelect () {
      getDictSelect().then(({data})=>{
        this.dictSelect = data
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

<style scoped>

</style>
