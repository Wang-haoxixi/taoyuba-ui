<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}证书`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="证书种类：" prop="certType">
              <iep-dict-select v-model="form.certType" dict-name="tyb_crew_cert_type"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书等级：" prop="certLevel">
              <iep-dict-select v-model="form.certLevel" dict-name="tyb_crew_cert_level"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证书职务：" prop="certTitle">
              <iep-dict-select v-model="form.certTitle" dict-name="tyb_crew_cert_title"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书编号：" prop="certNo">
              <el-input v-model="form.certNo"></el-input>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="certDateIssue" label-name="有效起始日期">
              <iep-date-picker v-model="form.certDateIssue" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="certDateExpire" label-name="有效终止日期">
              <iep-date-picker v-model="form.certDateExpire" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item prop="certFile" label-name="附件" tip="请上传详细的船员证书">
                <iep-upload v-model="form.certFile">请上传附件</iep-upload>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getCertPage, post, put} from '@/api/post/cert'
import { initForm, formToDto, rules, dictsMap } from '../options'
export default {
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    cretId () {
      return +this.$route.params.cretId
    },
    methodName () {
      return this.cretId ? '编辑' : '发布'
    },
  },
  created () {
    if (this.cretId) {
      getCertPage(this.cretId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
  },
  methods: {
    onGoBack () {
      this.$router.push({
        path: '/hrms_spa/recruit_list',
      })     
    },
    handleSubmit (isPublish) {
      const submitFunction = this.cretId ? put : post
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `招聘信息${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>