<template>
  <gov-dialog
    ref="dialog"
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
import matterMixin from './const/mixin'
import { postMatter as createData, putMatter as updateData} from '@/api/cbs/matter'
export default {
  mixins: [mixin, matterMixin],
  data () {
    return {}
  },
  methods: {
    handleOpen () {
      if(this.temp.level === 1){
        this.levelChildName = "子项"
        this.typeDisable = false
        this.maxlength = 5
      }else if(this.temp.level === 2){
        this.levelChildName = "办理项"
        this.typeDisable = true
        this.maxlength = 3
      }else{
        this.showIsChild = false
        this.typeDisable = true
        this.maxlength = 2
      }
      this.form = Object.assign(this.form,this.temp)
      // console.log("form",this.form)
      !this.form.type ? this.form.type = [] : ""
            console.log("form",this.maxlength)
      this.$nextTick(()=>{
          this.$refs['form'] && this.$refs['form'].clearValidate()
      })
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
        if (this.status === this.dialog.textName.create) {
          createData(this.form).then(({data}) => {
            if(data.data){
              this.$emit('successForm','添加成功！')
              this.close()
            }else{
              this.$message.warning(data.msg)
            }
          })
        } else if (this.status === this.dialog.textName.update) {
          updateData(this.form).then(({data}) => {
            if(data.data){
              this.$emit('successForm','修改成功！')
              this.close()
            }else {
              this.$message.warning(data.msg)
            }
          })
        }
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.initForm()
    },
  },
}
</script>
