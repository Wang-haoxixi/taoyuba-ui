<template>
  <div>
    <gov-dialog
      ref="dialog"
      @closed="handleClosedDialog"
      @handleSubmit="handleSubmit"
      :title="dialog.textMap[status]"
      :btnGroup="btnGroup"
      :isBtnGroup="status !== dialog.textName.detail"
      width="80%">
      <layout-form >
        <!-- 详情 -->
        <template v-if="status === dialog.textName.detail">
          <div class="detail-wrapper">
            <gov-detail-form v-model="formData" :option="informationDetailProps"></gov-detail-form>
          </div>
        </template>
        <!-- 编辑 -->
        <template v-else>
          <avue-form ref="informationForm" :option="informationUpdateProps" v-model="formData">
          </avue-form>
        </template>
      </layout-form>
    </gov-dialog>
  </div>
</template>
<script>
import {
  updateDatas,
} from '@/api/infoSystem/dataBase'
import mixin from '@/mixins/mixin'
import { form } from './const/index'
import constMixin from './const/mixin'
import { getDic, getDept } from '@/util/dic'

export default {
  name: 'informationDialog',
  mixins: [mixin, constMixin],
  data () {
    return {
      refNameDialog: 'dialog',
      form,
      // 当前信息项下标
      elementCurrentIndex: '',
      formData: {},
      btnGroup: [
        {
          label: '取 消',
          type: 'default',
          fn: 'handleCancel',
        },
        {
          label: '保 存',
          type: 'primary',
          fn: 'handleSubmit',
        },
      ],
      sysList: [],
    }
  },
  computed: {
    informationDetailProps () {
      return {
        option: [
          {
            column: this.informationUpdateProps.column,
          },
        ],
      }
    },
    elementOptions () {
      return this.options.deptId
    },
  },
  props: {
    currentData: {
      type: Object,
      default () {
        return {}
      },
    },
    id: {
      type: [Number, String],
      dafault: '',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    isElement: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    open (data, form) {
      this.sysList = data
      this.formData = form
      this.$nextTick(()=>{
        this.openDialog()
        // this.status !== 'detail' ? this.$refs['informationForm'].clearValidate() : ""
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    getDept () {
      return getDept()
    },
    getDic (dicName) {
      return getDic(dicName)
    },
    handleSubmit () {
      this.$refs['informationForm'].validate().then(()=>{
        updateDatas(this.formData).then(()=>{
          this.$message.success('修改成功')
          this.close()
          this.$emit('success')
        })
      })
    },
    handleClosedDialog () {
      this.formData = {}
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['informationForm'].resetForm() : ""
      })
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
</style>
