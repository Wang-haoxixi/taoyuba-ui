<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
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
          <avue-form ref="form" :option="mainFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>    
  </gov-dialog>  
</template>
<script>
import { modelBuilding } from "./const/index" 
export default {
  name: "modelBuildingDialog",
  data () {
      return {
        dialog: {
          textMap: {
            create: "新增",
            update: "修改",
            detail: "详情",
          },
          visible: false,
        },
        form: {},
      }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  computed: {
    mainFormOption () {
      return modelBuilding
    },
    detailOption () {
      return {
        option: [
          {
            column: this.mainFormOption.column,
          },
        ],
      }
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
    handleClosedDialog () {
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ""
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      })
    },
  },
}
</script>

