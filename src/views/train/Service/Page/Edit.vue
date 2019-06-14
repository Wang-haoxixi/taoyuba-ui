<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}培训服务`" :backOption="backOption"></page-header>                                                         
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">  
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="资讯标题：" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">                                                                       
            <el-form-item label="来源：" prop="source">                                                                                                            
              <el-input v-model="form.source"></el-input>
            </el-form-item>
          </el-col>
        </el-row>   
        <el-row> 
          <el-col :span="12">            
            <el-form-item label="描述：" prop="description">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>                                                                                                                                  
          <el-col :span="12">
            <el-form-item label="是否推荐：" prop="isRcmd">
              <el-radio-group v-model="form.isRcmd">
                <el-radio v-for="(item,i) in dictsMap.isRcmd" :key="i" :label="+i">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片：" prop="image">
              <el-upload
                class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false"
                :on-success="handleAvatarSuccess" :headers="headers" accept="image/*">
                <img v-if="form.image" :src="form.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <iep-form-item class="form-half" prop="articleContent" label-name="资讯内容">
          <iep-input-area v-model="form.articleContent"></iep-input-area>
        </iep-form-item> -->

        <el-form-item label="资讯内容：" prop="articleContent">
          <iep-froala-editor v-model="form.articleContent"></iep-froala-editor>
        </el-form-item>

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
import { getArticleDetail, createArticle, updateArticle  } from '@/api/article/index'                          
import { initForm,rules, dictsMap, formToDto } from '../options'
import store from '@/store'
export default {         
  data () {  
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },    
      },
      rules,
      form: initForm(),                                  
      init: false,
      dictsMap,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {                                                                                    
    articleId () {
      return +this.$route.params.articleId        
    },
    methodName () {
      return this.articleId ? '编辑' : '发布'
    },
  },
  created () {        
    if (this.articleId) {
      getArticleDetail(this.articleId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
  },
  methods: {
    handleSubmit (isPublish) {
      const submitFunction = this.articleId ? updateArticle : createArticle
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          this.form.type = 3
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `资讯信息${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })
    },
    onGoBack () {
      this.$router.push({
        path: '/article_spa/service_list',
      })   
    },
    handleAvatarSuccess (res) {
      // this.$emit('input', res.data.url)
      console.log(res.data.url)
      // this.form.image = res.data.url
    },
  },
  watch: {

  },
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>