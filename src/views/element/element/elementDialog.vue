<template>
  <gov-dialog
    ref="formDialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    @handleCancel="close"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !== dialog.textName.detail"
    :title="dialog.textMap[status]"
    width="80%">
    <layout-form>
      <template v-if="status === dialog.textName.detail">
        <div class="detail-wrapper ">
          <gov-detail-form v-model="temp" :option="elementDetailProps"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="element-wrapper">
          <avue-form ref="elementForm" :option="elementUpdateProps" v-model="form"/>
        </div>
      </template>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {form, elementUpdateProps, elementDetailProps} from './const/element'
import {mapGetters} from 'vuex'
// 是否向全社会开放 是
const IS_OPEN_STATUS_YES = '1'
export default {
  mixins: [mixin],
  name: 'elementDialog',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    informaionForm: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      elementUpdateProps,
      elementDetailProps,
      form,
    }
  },
  watch: {
    temp: {
      handler (newVal) {
        if (!newVal.deptName) {
          newVal.deptIdForShow = this.userInfo.deptName
        }
        this.copyData(this.form, newVal)
        this.setInformaionForm()
        if (this.form.isOpen === IS_OPEN_STATUS_YES) {
          this.changeCurrentData(this.elementUpdateProps.column, 'openCond', {visdiplay: true})
        } else {
          this.changeCurrentData(this.elementUpdateProps.column, 'openCond', {visdiplay: false})
        }
      },
      deep: true,
      immediate: true,
    },
    options: {
      handler (newVal) {
        let data = this.elementUpdateProps.column
        let that = this
        this.setDicColumn(elementDetailProps.option[0].column, newVal)
        for (let key in newVal) {
          for (let i = 0, len = data.length; i < len; i++) {
            if (key === data[i].prop) {
              this.$set(data[i], 'dicData', newVal[key])
            }
            // 判断是否显示开放条件
            if (data[i].prop === 'isOpen') {
              if (data[i].change) {
                break
              }
              data[i].change = function ({value}) {
                if (value === IS_OPEN_STATUS_YES) {
                  that.changeCurrentData(that.elementUpdateProps.column, 'openCond', {visdiplay: true})
                } else {
                  that.changeCurrentData(that.elementUpdateProps.column, 'openCond', {visdiplay: false})
                  that.$set(that.form, 'openCond', '')
                }
              }
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created () {
    this.dialog.textMap.create = '信息项新增'
    this.dialog.textMap.update = '信息项编辑'
    this.dialog.textMap.detail = '信息项详情'
    this.setDic()
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    setInformaionForm () {
      if (this.dialog.textName.create === this.status) {
        let newVal = this.informaionForm
        const arr = ['sharingType', 'sharingCond', 'sharingModeList', 'isOpen', 'updCycle']
        for (let key in newVal) {
          for (let i = 0, len = arr.length; i < len; i++) {
            if (key === arr[i]) {
              this.form[key] = newVal[key]
            }
          }
          if (newVal.isOpen === IS_OPEN_STATUS_YES || this.form.isOpen === IS_OPEN_STATUS_YES) {
            this.changeCurrentData(this.elementUpdateProps.column, 'openCond', {visdiplay: true})
          } else {
            this.changeCurrentData(this.elementUpdateProps.column, 'openCond', {visdiplay: false})
          }
        }
      }
    },
    setDic () {
      const dicList = [
        {name: 'dataTypeList', dicName: 'DATA_TYPE'}, // 数据类型
        {name: 'objectType', dicName: 'OBJECT_TYPE'}, // 对象类型
        {name: 'sharingType', dicName: 'SHARING_TYPE'}, // 共享类型
        {name: 'sharingModeList', dicName: 'SHARING_MODE'}, // 共享方式
        {name: 'isOpen', dicName: 'IS_NOT'}, // 是否向全社会开放
        {name: 'updCycle', dicName: 'UPD_CYCLE'}, // 更新周期
        {name: 'isPk', dicName: 'IS_NOT'}, // 是否主键
        {name: 'isNull', dicName: 'IS_NOT'}, // 是否为空
        {name: 'isDict', dicName: 'IS_NOT'}, // 是否字典项
      ]
      this.setDicList(this.options, dicList)
    },
    handleSubmit () {
      this.$refs.elementForm.validate().then(() => {
        this.$emit('success', Object.assign({}, this.form))
        this.close()
      })
    },
    // 弹窗打开时操作
    handleOpenDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.clearValidate('elementForm')
      }
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      this.$emit('closed')
      if (this.status !== this.dialog.textName.detail) {
        this.resetForm('elementForm')
        this.changeCurrentData(this.elementUpdateProps.column, 'openCond', {visdiplay: false})
      }
    },
  },
}
</script>
<style>
  .element-wrapper .el-input-number.is-controls-right .el-input__inner {
    text-align: left
  }
</style>