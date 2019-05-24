<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption">
            <template slot="plannedTime" slot-scope="scope">
              {{scope.row.plannedTime.split(' ')[0]}}
            </template>  
          </gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form" :option="tableOption" v-model="form"></avue-form>
        </div>
      </template>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import { selectUserList } from '@/api/projectManagement/projectUser'
import {tableOption} from './const/index'
export default {
  name: 'milestoneDialog',
  mixins: [mixin],
  data () {
    return {
      form: {},
    }
  },
  props: {
    status: {
      type: String,
      defaule: 'create',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  created () {
    selectUserList().then(({data}) => {
      tableOption.column[4].dicData = data
    })
  },
  computed: {
    detailOption () {
      tableOption.column[2].dicData = this.options
      return {
        option: [
          {
            column: tableOption.column,
          },  
        ],  
      }  
    },
    tableOption () {
      tableOption.column[2].dicData = this.options
      return tableOption
    },
  },
  methods: {
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    handleOpenDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('form')
      }
    },
    openDialog (formData) {
      this.form = formData
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    closeDialog () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('form')
        this.resetForm('form')
      }
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
