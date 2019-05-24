<template>
  <gov-dialog
    ref="dialog"
    :title="dialogStatus[status].title ? dialogStatus[status].title : ''"
    :isBtnGroup="status !== 'detail'"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <div class="detail-wrapper">
      <gov-detail-form v-if="status === 'detail'" v-model="form" :option="diagnosisFormDetailOption"></gov-detail-form>
      <avue-form v-else ref="form" :option="diagnosisFormOption" v-model="form"></avue-form>
    </div>
  </gov-dialog>
</template>

<script>
import scopeMixins from './const/info'
import {
  getDic,
} from '@/util/dic'
export default {
  name: 'infoDialog',
  mixins: [scopeMixins],
  data () {
    return {
      form: {},
      parentId: null,
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open (formData) {

      if(this.status == 'create'){
        this.optionFieldType= 'input'
        this.conditionDisabled = false
        this.optionFieldDic= []
        if(formData._id || formData.id){ //添加关联条件
          this.parentId = formData.id || formData._id
          this.form.conditionType = "1"
          this.$refs['dialog'].open()
          this.$nextTick(()=>{
            this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
          })
        }else{
          this.$nextTick(()=>{
            this.form = formData
            this.$refs['dialog'].open()
            this.$nextTick(()=>{
              this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
            })
          })
        }
      }else{
        this.form = formData
        let valString = this.form.optionField+ ""
        let splitVal = valString.split('-')
        if(splitVal.length>1){
          // optionFieldType
          this.optionFieldType = 'select'
          this.conditionDisabled = true
          this.optionFieldDic = [...getDic(splitVal[1])]
        }else{
          this.optionFieldType = 'input'
          this.conditionDisabled = false
          this.optionFieldDic = []
        }

        // this.changeOptionField(this.form.optionField)
        this.$refs['dialog'].open()
        this.$nextTick(()=>{
          this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
        })
      }
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.initForm()
    },
    initForm () {
      this.form = {}
      this.form.id = ''
      this.parentId = null
      this.conditionDisabled = false
      this.optionFieldType = 'input'
      this.optionFieldDic = []
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ''
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.form._id ? '' :this.form._id = new Date().valueOf() //赋值虚拟Id以便列表增删改查
        // console.log(this.optionFieldType,this.form)
        this.$emit('submit', this.form, this.status, this.parentId)
      }).catch(()=>{})
    },
  },
}
</script>
