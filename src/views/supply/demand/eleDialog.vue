<template>
  <div>
    <gov-dialog
      ref="dialog"
      :title="status[state]"
      @closed="handleClosed"
      @handleSubmit="handleSubmit"
      :is-btn-group="state=='detail'?false:true">
      <gov-layout-form>
        <template v-if="state==='detail'">
          <div class="detail-wrapper">
            <gov-detail-form v-model="eleFormData" :option="eleDeatilFormOption"></gov-detail-form>
          </div>
        </template>
        <template v-else>
          <avue-form ref="eleForm" v-model="eleFormData" :option="eleFormOption"></avue-form>
        </template>
      </gov-layout-form>
    </gov-dialog>
  </div>
</template>

<script>
import { eleFormOption } from './const/index'
export default {
  data () {
    return {
      eleFormData: {},
      status: {update: '编辑', create: '新增', detail: '详情'},
      itemList: [],
    }
  },
  components: {  },
  computed: {
    eleFormOption () {
      return eleFormOption
    },
    eleDeatilFormOption () {
      return {option: [{
        column: this.eleFormOption.column,
      }]}
    },
  },
  props: {
    materialList: {
      type: Array,
      default: () => {},
    },
    deptList: {
      type: Array,
      default: () => {},
    },
    state: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    open (data) {
      this.$refs['dialog'].open()
      this.eleFormData = data
    },
    close () {
      this.$refs['dialog'].close()
      this.handleClosed()
    },
    handleClosed () {
      if (this.state != 'detail') {
        this.$refs.eleForm.clearValidate()
        this.$refs.eleForm.resetForm()
      }
    },
    // 提交事件
    handleSubmit () {
      this.$refs['eleForm'].validate().then(()=>{
        this.$emit('getEleData', this.eleFormData, this.state)
        this.close()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  display: flex;
  .form-block-label {
    width: 150px;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    line-height: 40px;
  }
}
</style>

