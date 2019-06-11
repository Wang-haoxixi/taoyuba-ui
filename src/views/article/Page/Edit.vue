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
            <el-form-item label="分类:" prop="type">       
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
            <el-form-item label="四小件上传：" prop="image">
              <iep-avatar v-model="form.image"></iep-avatar>
            </el-form-item>
          </el-col>
        </el-row>

        <iep-form-item class="form-half" prop="articleContent" label-name="资讯内容">
          <iep-input-area v-model="form.articleContent"></iep-input-area>
        </iep-form-item>

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
  },
  watch: {

},
}
</script>