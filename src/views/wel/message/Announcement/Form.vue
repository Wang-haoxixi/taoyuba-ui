<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}公告`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small">
        <iep-form-item prop="name" label-name="主题" tip="主题请务必包含关于+事由+通知类型，如关于学习内网2.0相关功能操作的通知。">
          <el-input v-model="form.name" :disabled="disabled"></el-input>
        </iep-form-item>

        <iep-form-item prop="type" label-name="类型" tip="日常公告：关于学习、传达会议精神/要求、放假等日常的通知；<br/>公司制度：制度规范类征集意见或实施等公布的通知；<br/>培训通知：关于培训而发布的通知；<br/>人事调动：关于人事任免而发布的通知；<br/>其他通知：除上述提到的以外的通知。">
          <iep-dict-select :disabled="disabled" v-model="form.type" dict-name="ims_notify_type"></iep-dict-select>
        </iep-form-item>

        <iep-form-item prop="content" label-name="内容" tip="1、包含称呼、通知缘由、事项、要求和发文单位等内容；<br/>2、分段陈述，默认字体与字号，带格式的文字粘贴请使用“格式清除”工具；">
          <iep-froala-editor v-model="form.content"></iep-froala-editor>
        </iep-form-item>

        <iep-form-item prop="receivers" label-name="发布范围" tip="为该通知接收对象，一般以某个组织或群体为单位。">
          <iep-contact-multiple v-model="form.receivers" :disabled="disabled"></iep-contact-multiple>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">{{methodName}}</iep-button>
            <!-- <iep-button @click="handlePublish">保存并发布</iep-button> -->
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getAnnouncementById, postAnnouncement, putAnnouncement } from '@/api/ims/announcement'
import { initForm, formToDto, formToVo } from './options'

export default {
  data () {
    return {
      id: +this.$route.params.id,
      backOption: {
        isBack: true,
      },
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入主题', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 2000000, message: '内容必须超过 3 个字符，但不得超过 2000000 个字符', trigger: 'blur' },
        ],
        receivers: [
          { required: true, message: '请选择发布范围', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    disabled () {
      return !!this.id
    },
    formRequestFn () {
      if (this.id) {
        return putAnnouncement
      } else {
        return postAnnouncement
      }
    },
    methodName () {
      if (this.id) {
        return '修改'
      } else {
        return '发布'
      }
    },
  },
  created () {
    if (this.id) {
      getAnnouncementById(this.id).then(({ data }) => {
        this.form = formToVo(data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `通知公告${this.methodName}成功`,
                type: 'success',
              })
              this.$router.history.go(-1)
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
  },
}
</script>