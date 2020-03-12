<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}资讯`" :backOption="backOption"></page-header>                                                         
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">  
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="资讯标题：" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">         
            <el-form-item label="分类：" prop="type">       
              <iep-dict-select v-model="form.type" dict-name="tyb_article_type"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>   
        <el-row>                                                                                                                                                
          <el-col :span="12">                                                                       
            <el-form-item label="来源：" prop="source">                                                                                                            
              <el-input v-model="form.source"></el-input>
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
            <el-form-item label="描述：" prop="description">        
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="是否跳转：" prop="isDispatch">                                
             <el-radio-group v-model="form.isDispatch"  @change="radioChange">      
                 <el-radio :label="0">不跳转链接</el-radio>
                 <el-radio :label="1">跳转链接</el-radio>
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
            <el-col :span="12">   
              <el-form-item label="资讯跳转链接：" prop="httpSrc" v-show="isShow">       
              <el-input maxlength="80" v-model="form.httpSrc">
                <template slot="prepend">http://</template>     
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <iep-form-item class="form-half" prop="articleContent" label-name="资讯内容">
          <iep-input-area v-model="form.articleContent"></iep-input-area>
        </iep-form-item> -->

        <el-form-item label="资讯内容：" prop="articleContent" v-show="isArticle">
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
      isShow:false,
      isArticle:true,
      methodName:'',
    }
  },
  computed: {                                                                                    
    articleId () {
      return  this.$route.params.articleId           
    },
  },
  mounted () {                  
     this.methodName =  this.articleId == 0  ? '发布' : '编辑'
  },
  created () {                     
    if (this.articleId != 0) {                                         
      getArticleDetail(this.articleId).then(({ data }) => {     
        this.form = this.$mergeByFirst(initForm(), data.data)
        let  isShow = this.form.isDispatch
        this.isShow = isShow == 1
        this.isArticle = isShow  == 0
        if(this.form.httpSrc) this.form.httpSrc = this.form.httpSrc.substring(7)
      })
    }
  },    
  methods: {
    handleSubmit (isPublish) {    
      const submitFunction = this.articleId == 0 ? createArticle : updateArticle
      this.$refs['form'].validate((valid) => {
        if (valid) {
           this.form.httpSrc = 'http://'  + this.form.httpSrc
          const publish = isPublish === true ? true : false
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
        path: '/article_spa/article_list',
      })   
    },
    handleAvatarSuccess (res) {
      // this.$emit('input', res.data.url)
      //console.log(res.data.url)   
      this.form.image = res.data.url
    },
    radioChange (val) {       
      if(val === 1){
          this.isShow = true
          this.isArticle = false
      }
      if(val === 0){
          this.isShow = false
          this.isArticle = true
      }
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