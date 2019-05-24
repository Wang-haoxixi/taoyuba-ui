<template>
  <!-- 消息 -->
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="60%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <div class="block">
      <el-timeline>
        <el-timeline-item 
          :timestamp="activity.createTime" 
          placement="top" 
          v-for="(activity, index) in dialogueData" 
          :key="index">
          <el-card :class="{ blue:(activity.type > 1 ? true : false)}">
            <h4>{{activity.title}}</h4>
            <p>{{activity.content}}</p>
            <div class="move">{{activity.type > 1 ? "对方留言" : "我的留言"}}{{activity.phone ? "  "+activity.phone:null}}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </gov-dialog>
</template>
<script>
import { msgForm } from "./const/index"
export default {
  name: "msgDialog",
  data () {
    return {
      dialog: {
        textMap: {
        create: "新增",
        update: "修改",
        detail: "详情",
        },
        visible: false,
      },
      dialogueData: [],
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  computed: {
    msgDialogForm () {
      return msgForm
    },
    detailOption () {
      return {
        option: [
          {
            column: this.msgDialogForm.column,
          },
        ],
      }
    },
  },
  methods: {
    //打开弹窗
    openDialog (data) {
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.dialogueData = data
        //this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosedDialog () {
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ""
        this.$emit('closed',null)
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
  },
}
</script>

<style scoped>
  .blue{
    background-color: #ecf5ff
  }
  .move{
    float: right;
  }
</style>


