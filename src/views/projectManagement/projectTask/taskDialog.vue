<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption">
            <template slot="plannedStartTime" slot-scope="scope">
              {{scope.row.plannedStartTime.split(' ')[0]}}
            </template>
            <template slot="plannedTime" slot-scope="scope">
              {{scope.row.plannedTime.split(' ')[0]}}
            </template>  
          </gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form" :option="taskFormOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
import {taskFormOption} from "./const/index"
import { selectUserList } from '@/api/projectManagement/projectUser'
export default {
  mixins: [mixin],
  name: "taskDialog",
  data () {
    return {
      form: {},
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  computed: {
    detailOption () {
      taskFormOption.column[2].dicData = this.options
      taskFormOption.column[3].dicData = this.options
      return {
        option: [
          {
            column: this.taskFormOption.column,
          },
        ],
      }
    },
    taskFormOption () {
      taskFormOption.column[2].dicData = this.options
      taskFormOption.column[3].dicData = this.options
      return taskFormOption
    },
  },
  created () {
    this.getUserSelect()
  },
  methods: {
    //打开弹窗
    openDialog (formData) {
      this.form = formData || {}
      this.id = this.form.id
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ""
        this.$refs['dialog'].close()
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    getUserSelect () {
      selectUserList().then(({data}) => {
        this.taskFormOption.column[11].dicData = data
      })
    },
  },
   
}
</script>

<style>

</style>
