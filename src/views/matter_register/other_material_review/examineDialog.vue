<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'审核'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 新增编辑 -->
        <avue-form ref="form" v-model="form" :option="editOption"></avue-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import matterMixin from './const/mixin'
import { reviewForm, batchReviewForm } from '@/api/cbs/form_review'
// import { reviewMatter, batchReviewMatter } from '@/api/cbs/matter'
export default {
  mixins: [mixin, matterMixin],
  data () {
    return {
      id: null,
      ids: null,
    }
  },
  methods: {
    handleOpen () {
      this.$nextTick(()=>{
          this.$refs['form'] && this.$refs['form'].clearValidate()
      })
    },
    open (row) {
      if(row.id){
        this.id = row.id
        this.$refs['dialog'].open()
      }
      if(row.ids){
        this.ids = row.ids
        this.$refs['dialog'].open()
      }
    },
    close () {
      this.$refs['dialog'].close()
    },
    _transForm () {
      if(this.form.status === 3){
        this.$set(this.form,'content','')
      }
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(()=>{
        this._transForm()
        // console.log(this.form)
        if(this.id){
          reviewForm(this.id, this.form).then(({data})=>{
            if(data.data){
              this.$emit('successForm','审核成功！')
              this.close()
            }else{
              this.$message.waring(data.msg)
            }
          })
        }
        if(this.ids){
          batchReviewForm(this.ids,this.form).then(({data})=>{
            if(data.data){
              this.$emit('successForm','审核成功！')
              this.close()
            }else{
              this.$message.waring(data.msg)
            }
          })
        }
      })

    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.initForm()
    },
  },
}
</script>
