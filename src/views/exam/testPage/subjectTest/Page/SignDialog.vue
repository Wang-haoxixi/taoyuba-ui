<template>
    <div>
        <basic-container>
            <iep-dialog :dialog-show="dialogShow" title="考试说明" width="500px" @close="handleDialogCancel" center>
                <el-form :label-position="labelPosition" :model="form" label-width="110px">
                    <el-form-item label="说明：">
                    <span>
                        {{explainList}}
                    </span>
                    </el-form-item>
                    <el-form-item label="上传资质证明：" prop="qualificationsurl">
                    <iep-avatar v-model="form.qualificationsurl"></iep-avatar>
                    </el-form-item>
                </el-form>
                <template slot="footer">
                    <operation-wrapper>
                    <iep-button type="primary" @click="handleSignNext ()">下一步</iep-button>
                    <iep-button @click="handleDialogCancel">取消</iep-button>
                    </operation-wrapper>
                </template>
                </iep-dialog>
        </basic-container>
        <iep-dialog :dialog-show="dialogConfigShow" title="报名确认" width="400px" @close="handleSignConfigCancel" center>
            <span>此次考试将消耗 {{consume}} 贝，是否确认报名？</span>
            <template slot="footer">
                <operation-wrapper>
                <iep-button type="primary" @click="handleSignConfig" :loading="handleSure">确认</iep-button>
                <iep-button @click="handleSignConfigCancel">取消</iep-button>
                </operation-wrapper>
            </template>
        </iep-dialog>
    </div>
</template>
<script>
import {postSign} from '@/api/exam/testPage/subjectTest/subjectTest'
export default {
  data () {
    return {
        handleSure: false,
        examId: '',
        dialogShow: false,
        dialogConfigShow: false,
        explainList: '',
        consume: '',
        form: {
            qualificationsurl: '',
        },
        labelPosition: 'right',
    }
  },
  created () {
  },
  methods: {
    /**
     * 关闭报名弹窗
     */
    handleDialogCancel (){
      this.dialogShow = false
      this.form.qualificationsurl = ''
    },
    handleSignConfigCancel (){
      this.dialogConfigShow = false
    },
    /**
     * 报名弹窗下一步按钮
     */
    handleSignNext (){
      this.dialogConfigShow = true
    },
    /**
     * 确认报名
     */
    handleSignConfig (){
      this.handleSure = true
      // let examinationId = this.examId
      // let qualificationsurl = this.form
      // let post = Object.assign(examinationId,qualificationsurl)
      // console.log(post)
      this.form.examinationId = this.examId
      // console.log(JSON.stringify(this.form))
      // let postSingleBothForm = {}
      // postSingleBothForm = JSON.stringify(this.form)
      const params = {
        examinationId: this.examId,
        qualificationsurl: this.form.qualificationsurl,
      }
      postSign(params).then( res => {
        if (res.data.data == true){
          this.dialogConfigShow = false,
          this.dialogShow = false,
          this.$message({
            message: '报名成功！',
              type: 'success',
            })
          this.$emit('reload')
          this.handleSure = false
        }
        if (res.data.data == false) {
          this.dialogConfigShow = false,
          this.dialogShow = false,
          this.$message({
            message: res.data.msg,
            type: 'warning',
          })
          this.handleSure = false
        }
      })
    },
  },
}
</script>