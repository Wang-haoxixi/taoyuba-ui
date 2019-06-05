<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>                                                           
      <el-form :disabled="type === 'view'" ref="form" :model="form" :rules="rules" label-width="150px" size="small">    
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="教材标题：" prop="title">
                <el-input maxlength="100" v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">         
            <el-form-item label="教材价格:" prop="price">       
              <el-input maxlength="6" v-model="form.price"></el-input>                    
            </el-form-item>
          </el-col>
        </el-row>   
        <el-row>                                          
          <el-col :span="12">                                    
            <el-form-item label="原价：" prop="origPrice">                                                                                                            
              <el-input maxlength="6" v-model="form.origPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关键字" prop="keyword">                                                                                                                                                                                         
              <el-input maxlength="50" v-model="form.keyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="教材简介：" prop="description">          
                <el-input   v-model="form.description"></el-input>
            </el-form-item>
          </el-col>                           
          <el-col :span="12">
            <el-form-item label="出版社" prop="press">                                            
              <el-input maxlength="100" v-model="form.press"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="作者：" prop="author">    
                <el-input   v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教材内容" prop="content">                                                                                          
              <el-input   type="textarea" v-model="form.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="" v-if="type !== 'view'">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>       
<script>        
import { getTextbookDetail, createTextbook, updateTextbook  } from '@/api/textbook/index'                   
import { initForm,rules } from '../options'                                 
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
    }
  },
  computed: {                                                                                       
    type () {
      return this.$route.params.type            
    },
    textBookId () {
      return this.$route.params.id        
    },
    getTitle () {   
      return `教材信息${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}`
    },
  },
  created () {        
    if (this.type !== 'create' && this.textBookId) {          
      this.getTextbookDetail()        
    } 
  },
  mounted () {      
  },
  methods: {                
    getTextbookDetail () {                    
      getTextbookDetail(this.textBookId).then(({data}) => {
        if (data.code === 0) {
          this.form = data.data
        }
      }, (error) => {           
        this.$message.error(error.message)
      })
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {                   
        if (valid) {
          if (this.type === 'create') {
            createTextbook(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.type === 'update') {
            updateTextbook(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('修改成功！')
                this.onGoBack()     
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          }
        } else {
          this.$message.error('请按规则输入填写表单！')
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
  watch: {

},
}
</script>