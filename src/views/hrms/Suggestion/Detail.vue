<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="建议详情">
        <iep-button @click="onGoBack()">返回建议列表</iep-button>
      </page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <iep-form-item prop="theme" label-name="建议主题">
          <div class="content">{{form.theme}}</div>
        </iep-form-item>

        <iep-form-item prop="proposeContent" label-name="建议内容">
          <div class="content">{{form.proposeContent}}</div>
        </iep-form-item>

        <iep-form-item prop="attendeeList" label-name="接收对象">
          <div class="content" v-for="(item,index) in form.attendeeList" :key="index" style="margin-right:5px;">{{item}}</div>
        </iep-form-item>
        <hr>
        <iep-form-item prop="status" label-name="处理意见">
          <el-radio :disabled="isEdit" v-model="form.status" label="2">采纳</el-radio>
          <el-radio :disabled="isEdit" v-model="form.status" label="3">驳回</el-radio>
        </iep-form-item>

        <iep-form-item prop="proposeRelatioList[0].feedbackOpinion" label-name="反馈意见">
          <iep-input-area :disabled="isEdit" v-model="form.proposeRelatioList[0].feedbackOpinion"></iep-input-area>
        </iep-form-item>
        <iep-form-item prop="proposeRelatioList[0].gratuity" label-name="打赏">
          <el-input :disabled="isEdit" v-model.number="form.proposeRelatioList[0].gratuity" :value="val" maxlength=4 size="small">
            <template slot="append">贝</template>
          </el-input>
        </iep-form-item>
        <hr>
        <iep-form-item label-name="附件">
          <div v-if="form.annexList.length > 0">
            <a-tag v-for="file in form.annexList" :key="file.url" @click="handleDownload(file)">
            <a-icon type="paper-clip" />{{file.name}}</a-tag>
          </div>
          <span v-else>无附件</span>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handlePublish" :disabled="isEdit">确定</iep-button>
            <iep-button @click="onGoBack">取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getSuggestionById, putfeedback } from '@/api/hrms/suggestion'
import { initForm, formToDto, rules } from './options'
import { downloadFile } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rules,
      id: this.$route.params.id,
      pageLoading: true,
      disabled: false,
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    isEdit () {
      return this.userInfo.userId === this.form.userId || this.disabled
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePublish () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.annexList.length > 0) {
            this.form.annex = this.form.annexList[0].url
          }
          if (this.form.proposeRelatioList.length > 0) {
            this.form.feedbackOpinion = this.form.proposeRelatioList[0].feedbackOpinion
            this.form.gratuity = this.form.proposeRelatioList[0].gratuity
          }
          putfeedback(formToDto(this.form), true).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '回复建议成功',
                type: 'success',
              })
              this.onGoBack()
            }
            else{
              this.$message({
                message: data.msg,
              })
            }
          })
        }
      })

    },
    // handleInput(e){
    //   this.val=e.target.value.replace(/[^\d]/g,'')
    // },
    handleDownload (file) {
      downloadFile(file)
    },
    loadPage () {
      this.pageLoading = true
      getSuggestionById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.disabled = this.form.status === '2' || this.form.status === '3'
        this.pageLoading = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>

<style scoped>
.iep-page-form >>> .el-form-item__content .el-input-group {
  width: 250px;
}
</style>

