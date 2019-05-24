<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}建议`">
        <iep-button @click="back">返回建议列表</iep-button>
      </page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <iep-form-item class="form-half" label-name="建议主题" prop="theme">
          <el-input v-model="form.theme"></el-input>
        </iep-form-item>

        <iep-form-item class="form-half" prop="proposeContent" label-name="建议内容">
          <iep-input-area v-model="form.proposeContent"></iep-input-area>
        </iep-form-item>

        <iep-form-item prop="attendeeId" label-name="接收对象">
          <iep-select v-model="form.attendeeId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
        </iep-form-item>

        <iep-form-item class="form-half" prop="annexList" label-name="附件">
          <iep-upload v-model="form.annexList" :limit="limit"></iep-upload>
        </iep-form-item>
        
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
            <!-- <iep-button type="primary" @click="saveDraft('form')" v-if="formData.status == 1 || methodName == '创建'" :loading="loadState">保存草稿</iep-button>
            <iep-button type="primary" @click="saveForm('form')" :loading="loadState">{{formData.isSend == 0 ? '保存' : '保存并发送'}}</iep-button> -->
            <iep-button @click="onGoBack">取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getSuggestionById, postSuggestion, putSuggestion } from '@/api/hrms/suggestion'
import { downloadFile } from '@/api/common'
import { initForm, formToDto, rules } from './options'
export default {
  data () {
    return {
      limit: 1,
      back: () => {
        this.$router.push('/hrms_spa/suggestion_list')
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
  },
  created () {
    if (this.id) {
      getSuggestionById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePublish () {
      this.form.status='1'
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const submitFunction = this.id ? putSuggestion : postSuggestion
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          if (this.form.annexList.length > 0) {
            this.form.annex = this.form.annexList[0].url
          }
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `${this.methodName}建议成功`,
                type: 'success',
              })
              this.back()
            }
          })
        }
      })

    },
    handleDownload (file) {
      downloadFile(file)
    },
  },
}
</script>
