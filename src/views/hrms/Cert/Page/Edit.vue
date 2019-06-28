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
          <el-col :span="15">                                                            
          <el-form-item label="上传证书图片：" prop="certFile">
              <el-upload
                class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false"
                :on-success="handleAvatarSuccess" :headers="headers" accept="image/*">
                <img v-if="form.certFile" :src="form.certFile" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>    
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
import { detal, post, put} from '@/api/post/cert'
import { getUserInfo } from '@/api/login'
import { initForm, formToDto, rules, dictsMap } from '../options'
import store from '@/store'
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
      headers: {
          Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {
    certId () {
      return +this.$route.params.certId
    },
    methodName () {
      return this.certId ? '编辑' : '发布'
    },
  },
  created () {
    if (this.certId) {
      detal(this.certId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
  },
  methods: {
    onGoBack () {
      this.$router.push({
        path: '/cert_spa/cert_list',
      })     
    },
    handleSubmit (isPublish) {
      const submitFunction = this.certId ? put : post
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          getUserInfo().then(({data}) => {
            this.form.userId = data.data.sysUser.userId
          })
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `证书信息${this.methodName}成功`,
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