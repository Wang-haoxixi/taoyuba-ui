<template>
  <gov-dialog
    ref="dialog"
    :title="title"
    width="80%"
    :isBtnGroup="status !== 'detail'"
    :btnGroup="btnGroup"
    @closed="closed"
    @handleSubmit="dialogSubmit"
    @handleDraft="handleDraft">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 详情 -->
        <!-- <gov-detail-form v-show="status === 'detail'" v-model="detailData" :option="detailOption"></gov-detail-form> -->
        <gov-detail-form v-show="status === 'detail'" v-model="detailData" :option="detailOption"></gov-detail-form>
        <!-- 新增和编辑 -->
        <main-form
          ref="form"
          v-show="status !== 'detail'"
          @submit="formSubmit"
          @draft="formDraft"
          :formData="formData"
          :status="status">
        </main-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>

<script>
import mainForm from './mainForm'
import govDetailForm from '@/components/govDetailForm'
import { defaultFormData, formCurd } from './const/fields'
export default {
  name: 'systemRegister',
  components: {mainForm, govDetailForm},
  mixins: [],
  data () {
    return {
      btnGroup: [
          {
            label: '保 存',
            type: 'primary',
            fn: 'handleSubmit',
          },
          {
            label: '存为草稿',
            type: 'default',
            fn: 'handleDraft',
          },
          {
            label: '取 消',
            type: 'default',
            fn: 'handleCancel',
          }, 
        ],
    }
  },
  props: {
    option: {
      type: Object,
      default: ()=>{
        return {
          status: 'detail',
          isBtnGroup: false,
          title: '详情',
        }
      },
    },
    detailData: {
      type: Object,
      default: ()=>{},
    },
    formData: {
      type: Object,
      default: ()=>{
        return defaultFormData
      },
    },
  },
  computed: {
    title () {
      return this.option.title
    },
    status () {
      return this.option.status ? this.option.status : 'detail'
    },
    isBtnGroup () {
      return this.option.isBtnGroup ? true : false
    },
    detailOption () {
      return {
        labelWidth: '150',
        option: [
          {
            column: formCurd,
          },
        ],
      }
    },
  },
  watch: {
    detailOption: {
      handler (newVal) {
        console.log(newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    open () {
      this.$nextTick(()=>{
        this.$refs['form'].clearValidate()
        this.$refs['form'].handleEdit(this.formData)
      })
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['form'].clearValidate()
      this.$refs['dialog'].close()
    },
    // 由表单提交触发
    formSubmit (formData) {
      if(this.status === 'edit') {
        this.$emit('edit', formData)
      } else {
        this.$emit('newly', formData)
      }
    },
    formDraft (formData) {
      this.$emit('draft', formData, this.status)
    },
    // 表单提交
    dialogSubmit () {
      this.$refs['form'].handleSubmit()
    },
    handleDraft () {
      this.$refs['form'].handleDraft()
    },
    // 重置表单
    closed () {
      if (this.status !== 'detail') {
        this.$refs['form'].resetForm()
        this.$refs['form'].clearValidate()
      }
      this.$emit('closed')
    },
  },
}
</script>