<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
        <avue-form ref="form" v-model="form" :option="editOption"></avue-form>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/mixins/mixin'
import updateCycleMixin from './const/updateCycleMixin'
import {getList} from '@/api/element/element'
import {updateCycle} from '@/api/supply/dataSharing'
export default {
  mixins: [mixin,updateCycleMixin],
  data () {
    return {
      saveBtnLoading: false,
      showUpdateCycle: false,
      tableList: [],
      _id: null,
    }
  },
  computed: {
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
  methods: {
    // 打开时操作
    handleOpen () {

    },
    open (row) {
      if(row.id){
        this._id = row.id
        let updateCycle = row.updateCycle
        let updateCycleType = null
        if(updateCycle == '实时'){
          updateCycleType = 3
        }else if(updateCycle == '每日'){
          updateCycleType = 1
        } else if(updateCycle == '每周'){
          updateCycleType = 0
        }else{
          updateCycleType = 2
        }
        this.form = {
          id: row.id,
          updateCycle: updateCycle,
          updateCycleType: updateCycleType,
        }
      }
      this.$refs['dialog'].open()

    },
    close () {
      this.$refs['dialog'].close()
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
      })
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        let updateCycleValue = ''
        if(this.form.updateCycleType == 2){
          updateCycleValue = this.form.updateCycle
        }else if(this.form.updateCycleType == 1) {
          updateCycleValue = "每日"
        }else if(this.form.updateCycleType == 3) {
          updateCycleValue = "实时"
        }else{
          updateCycleValue = "每周"
        }
        let params={
          id: this._id,
          updateCycle: updateCycleValue,
        }
        this.saveBtnLoading = true
        updateCycle(params).then(({data}) => {
          if(data.code === 0){
            this.$emit('successForm','保存成功')
            this.close()
          }
          this.saveBtnLoading = false
        }).catch(()=>{
          this.saveBtnLoading = false
        })
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.resetFormData(this.form, true)
      this.form.id = ''
      // console.log('this.form', this.form)
      this.tableList = []
    },
  },
}
</script>
