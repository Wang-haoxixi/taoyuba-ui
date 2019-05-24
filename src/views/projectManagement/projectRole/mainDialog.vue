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
          <avue-form ref="form" :option="projectRoleFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>    
</template>

<script>
import mixin from "@/mixins/mixin"
import { projectRoleFormOption } from './const/index'
export default {
  mixins: [mixin],
  name: "mainDialog",
  data () {
    return {
      form: {},
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  created () {
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: this.projectRoleFormOption.column,
          },
        ],
      }
    },
    projectRoleFormOption () {
      return projectRoleFormOption
    },
  },
  methods: {
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