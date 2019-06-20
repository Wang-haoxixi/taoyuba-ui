<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <div class="top">
      <p>阅卷完毕人数</p>
      <p style="margin-left: 50px;"><span style="color:#409eff">{{number}}</span>/<span>{{total}}</span></p>
      <el-button icon="el-icon-warning" class="tip"></el-button>
      <p class="award">每位阅卷老师阅卷一题，奖励<el-button style="margin:0px 10px;border-radius:0px;">{{money}}</el-button>贝</p>
    </div>

    <div class="container">
      <div class="title">
        <p class="line"></p>
        <p>填空题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{number}}</span>/<span>{{total}}</span></p>
      </div>
      <div class="details" v-for="(item, idx) in fillList" :key="idx">
        <ul>
          <li>{{idx+1}}<span>{{item.question}}</span>
            <el-tag size="mini" type="info" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="add" size="small" @click="showInput">添加+</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="title">
        <p class="line"></p>
        <p>简答题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{number}}</span>/<span>{{total}}</span></p>
      </div>
      <div class="details" v-for="(item, idx) in chapterList" :key="idx">
        <ul>
          <li>{{idx+1}}<span>{{item.question}}</span>
            <el-tag size="mini" type="info" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="add" size="small" @click="showInput">添加+</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="title">
        <p class="line"></p>
        <p>实操题</p>
        <p style="margin-left: 50px;"><span style="color:#409eff">{{number}}</span>/<span>{{total}}</span></p>
        <P style="margin-left: 50px;">
          <el-switch class="switch-switch" v-model="switchValue" active-text="多选1模式" active-color="#409eff"> </el-switch>
        </P>
      </div>
      <div class="details" v-for="(item, idx) in operationList" :key="idx">
        <ul>
          <li>{{idx+1}}<span>{{item.question}}</span>
            <el-tag size="mini" type="info" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="add" size="small" @click="showInput">添加+</el-button>
          </li>
        </ul>
      </div>
    </div>

    <!-- <el-form-item label="面试成绩" prop="mark">
      <el-input v-model="ruleForm.mark" maxlength="255" placeholder="请输入面试成绩" clearable></el-input>
    </el-form-item> -->

    <div class="bottom">
      <el-form-item style="margin-bottom:5px">
        <el-button class="button" @click="handleSubmit('ruleForm')">一键收卷</el-button>
        <el-button class="button" @click="handlePaper">完成阅卷</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="sendResult">发送成绩</el-button>
        <el-button class="button" @click="sendCertificate">放送证书</el-button>
      </el-form-item>
    </div>

  </el-form>
</template>
<script>
import { rollingPaperById, overPapersById, sendResultById, sendCertificateById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  // mark: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        // mark: '',
      },
      rules: allRules,
      number: 18,
      total: 35,
      money: 5,
      fillList: [
        { question: '以下不属于内部智慧平台个人资料标签的是（ ）' },
        { question: '以下不属于内部智慧平台个人资料标签的是（ ）' },
        { question: '以下哪项工作可由部门助理来完成。（ ）' },
        { question: '题目四四四斤斤计发发发发发发付付付付付++较' },
        { question: '题目咔咔咔咔咔咔扩扩扩扩扩扩扩扩快快快快快快快快快' },
        { question: '题目四四四呀呀呀呀呀呀晕晕晕晕晕晕晕晕晕晕晕' },
        { question: '滚滚滚广告过过过过过过过过过过过过过++较' },
      ],
      chapterList: [
        { question: '请列举影响你参加内网建设最重要的十个方面？' },
        { question: '结合部门及自身岗位希望在内网中体现哪些数据服务' },
        { question: '财富管理是内网模块的重要组成部分，请提出您对财富系统的意见和建议。' },
        { question: '标签功能覆盖了内网各个版块，为何要使用标签功能，它在我们工作中起到了什么作用?' },
        { question: '在目前工作中，你对内网应用还有哪些需求（如表单、功能、赋能方向等）。' },
        { question: '请简述现阶段个人与组织的关系面临的挑战，并谈谈内网能给组织关系带来什么改进与提升。' },
        { question: '国脉人主页为展示部门、员工风采的重要窗口，请从自身理解提出十个以上意见建议。' },
        { question: '请列举至少10条内网给予员工赋能的价值点，最终实现个人财富增值。（请结合日常工作至少提10点）' },
        { question: '谈谈你对数据思维的理解，以及如何应用到目前的工作中。' },
      ],
      operationList: [
        { question: '请列出内网存在的20个不足之处，并提出10个优化建议，（建议在内网建议栏提交给缪巧巧，答案栏中附上相应截图）。' },
        { question: '搜索材料库找到你需要的一份材料，下载该材料，对材料进行评论/纠错，最后将材料通过私信的形式分享给需要的同事。（请将操作步骤截图附上答案）' },
        { question: '围绕内网实现赋能共益组织建设，遵循“越分享越拥有，越奉献越获得”的原则，请将个人所有相关信息上传至内网并体现于个人风采页。（信息包括个人资料，培训、材料，项目、客户、客户联系人等关联）' },
      ],
      dynamicTags: ['李小红', '李小明', '赵小四'],
      inputVisible: false,
      inputValue: '',
      switchValue: true,
    }
  },
  methods: {
    /**
     * 关闭tag标签
     */
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    /**
     * 添加tag标签的按钮
     */
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    /**
     * 添加tag标签，添加内容后回车键自动在tag队列后增加
     */
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    /**
     * 一键收卷
     */
    handleSubmit (formName) {
      this.ruleForm.id = this.formData.id
      this.ruleForm.deptId = this.formData.deptId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          rollingPaperById(this.ruleForm).then(() => {
            this.$emit('close', false)
            this.$message({
              showClose: true,
              message: '成功添加',
              type: 'success',
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 完成阅卷
     */
    handlePaper () {
      this.$confirm('此操作将完成阅卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        overPapersById().then(res => {
          console.log(res)
          this.$emit('close', false)
          this.$message({
            showClose: true,
            message: '已成功完成阅卷',
            type: 'success',
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完成阅卷',
        })
      })
      // this._handleComfirm([row.id], overPapersById, '完成阅卷')
    },

    /**
     * 发送成绩
     */
    sendResult () {
      this.$confirm('此操作将发送成绩, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendResultById().then(res => {
          console.log(res)
          this.$emit('close', false)
          this.$message({
            showClose: true,
            message: '发送成功',
            type: 'success',
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
      //this._handleComfirm([row.id], sendResultById, '发送成绩')
    },

    /**
     * 发送证书
     */
    sendCertificate () {
      this.$confirm('此操作将发送证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        sendCertificateById().then(res => {
          console.log(res)
          this.$emit('close', false)
          this.$message({
            showClose: true,
            message: '发送成功',
            type: 'success',
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送',
        })
      })
      //this._handleComfirm([row.id], sendCertificateById, '发送证书')
    },
  },
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  .tip {
    margin-top: -8px;
    margin-left: 250px;
    border: 0px solid #fff;
    &:hover {
      background-color: #fff;
    }
  }
  .award {
    margin-top: -7px;
  }
}
.container {
  margin-top: 10px;
  margin-bottom: 30px;
  .title {
    display: flex;
    .line {
      height: 26px;
      width: 4px;
      background-color: #409eff;
      margin-right: 10px;
    }
  }
  .details {
    ul {
      margin-left: -40px;
      li {
        list-style: none;
        font-size: 14px;
        color: rgb(119, 117, 117);
        margin-bottom: -10px;
      }
    }
    span {
      margin-left: 20px;
      margin-right: 10px;
    }
    span[data-v-7128ae36] {
      margin-left: -2px !important;
    }
    .el-tag + .el-tag {
      margin-left: -4px;
      margin-right: 5px;
    }
    .add {
      height: 21px;
      text-align: center;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      vertical-align: bottom;
    }
  }
}
.bottom {
  padding-top: 20px !important;
  margin-left: 200px;
  .button {
    color: #fff;
    background-color: #d4d4d4;
    border: 0px solid #d4d4d4;
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
.switch-switch {
  .el-switch__label.is-active {
    color: #409eff !important;
  }
}
</style>
