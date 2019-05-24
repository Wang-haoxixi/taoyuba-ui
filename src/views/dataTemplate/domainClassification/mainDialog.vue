<template>
  <gov-dialog
    ref="dialog"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 详情 -->
        <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption"></gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form ref="form" v-else v-model="form" :option="editOption"></avue-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {detailOption, editOption, form} from './const/mainForm'
import {updateData, createData} from '@/api/dataTemplate/domainClassification'
import {cloneDeep} from 'lodash'
export default {
  mixins: [mixin],
  data () {
    return {
      detailOption,
      editOption,
      form,
      saveBtnLoading: false,
    }
  },
  computed: {
    oldForm () {
      return cloneDeep(form)
    },
    btnGroup () {
      return [
        {
          label: '保存',
          type: 'primary',
          loading: this.saveBtnLoading,
          disabled: false,
          fn: 'handleSubmit',
        },
        {
          label: '取消', // 按钮文本
          loading: false, // 按钮加载中状态
          disabled: false, // 是否禁用按钮
          fn: 'handleCancel', // 按钮回调方法名称
        },
      ]
    },
  },
  props: {
    detailData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleOpen () {
      this.clearValidate()
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        this.saveBtnLoading = true
        if (this.status === this.dialog.textName.create) {
          createData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','新增成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        } else if (this.status === this.dialog.textName.update) {
          updateData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','修改成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        }
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.clearValidate()
      }
      this.resetFormData(this.form, true)
    },
  },
}
</script>
