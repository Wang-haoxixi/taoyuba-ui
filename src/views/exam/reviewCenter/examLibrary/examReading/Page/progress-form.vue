<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <div class="top">
      <h3 style="margin-left:16px; margin-bottom: 15px;">
        <span>阅卷完毕人数: </span>
        <span style="color:#409eff">{{resdata.done}}</span>/<span>{{resdata.all}}</span>，
        <span>每位阅卷老师阅卷一题，奖励<span style="color: red">{{money}}</span>贝</span>
      </h3>
    </div>

    <div class="card">
      <div v-if="resdata.operateUsers">
        <span class="answerSheet"><span class="line">|</span>报名管理&考卷管理</span>
        <div class="answerSheetTop">
          <el-tag type="info" v-for="(item, idx) in resdata.operateUsers" :key="idx" style="margin-right: 10px">{{item}}</el-tag>
        </div><br>
      </div>
    </div>

    <div class="card">
      <div v-if="resdata.operateUsers">
        <span class="answerSheet"><span class="line">|</span>试卷审阅权限</span>
        <div class="answerSheetTop">
          <el-tag type="info" v-for="(item, idx) in resdata.writeUsers" :key="idx" style="margin-right: 10px">{{item}}</el-tag>
        </div><br>
      </div>
    </div>

    <div class="card">
      <div v-if="resdata.operateUsers">
        <span class="answerSheet"><span class="line">|</span>面试判分权限</span>
        <div class="answerSheetTop">
          <el-tag type="info" v-for="(item, idx) in resdata.faceUsers" :key="idx" style="margin-right: 10px">{{item}}</el-tag>
        </div><br>
      </div>
    </div>

    <div class="bottom">
      <iep-button type="primary" class="button" v-if="isCreator || permissionAll" @click="handleRollingPaper">一键收卷</iep-button>
      <iep-button type="success" class="button" v-if="isCreator || permissionAll" @click="handlePaper">完成阅卷</iep-button>
      <iep-button type="warning" plain class="button" @click="sendCertificate" v-if="isCreator|| permissionAll">放送证书</iep-button>

      <!-- <iep-button class="button" @click="sendResult">发送成绩</iep-button> -->
    </div>

  </el-form>
</template>
<script>
import { getPaperProcessById, rollingPaperById, overPapersById, sendResultById, sendCertificateAllById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  // mark: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData', 'isCreator', 'permissionAll'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        // mark: '',
      },
      resdata: {},
      rules: allRules,
      money: 5,
      inputVisible: false,
      inputValue: '',
      switchValue: true,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取阅卷进度列表分页数据
     */
    loadPage () {
      getPaperProcessById(this.formData.row.id).then(res => {
        const record = res.data.data
        this.resdata = record
      })
    },

    /**
     * 一键收卷
     */
    handleRollingPaper () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将一键试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        rollingPaperById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消收卷',
        })
      })
    },

    /**
     * 完成阅卷
     */
    handlePaper () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将完成阅卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        overPapersById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完成阅卷',
        })
      })
    },

    /**
     * 发送成绩
     */
    sendResult () {
      const param = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将发送成绩, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendResultById(param).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
    },

    /**
     * 发送证书
     */
    sendCertificate () {
      const params = {
        examinationmanagementId: this.formData.row.id,
      }
      this.$confirm('此操作将发送本场考试的证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendCertificateAllById(params).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  .tip {
    margin-top: -8px;
    margin-left: 50px;
    border: 0px solid #fff;
    &:hover {
      background-color: #fff;
    }
  }
  .award {
    margin-top: -7px;
  }
}
.card {
  text-align: left;
  padding: 0 18px 0;
  .answerSheet {
    font-size: 14px;
    color: #595959;
    .line {
      color: #409eff;
      font-size: 19px;
      margin-right: 5px;
    }
  }
  .answerSheetTop {
    padding-top: 6px;
  }
  .choices + .choices {
    margin: 2px;
  }
  .choices {
    width: 65px;
    margin-right: 3px;
    background-color: #f4f4f5;
  }
}
.bottom {
  text-align: center;
  .button {
    margin: 0 5px 10px 5px;
  }
}
</style>
<style scoped>
.switch-switch >>> .el-switch__label.is-active {
  color: #409eff !important;
}
</style>
