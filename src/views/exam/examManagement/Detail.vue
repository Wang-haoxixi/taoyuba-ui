<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}考试`" :backOption="backOption"></page-header>                                                         
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">            
            <el-form-item label="考试名称" prop="examName">
              <el-input v-model="form.examName"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="考试分类" prop="kind">
                <el-select v-model="form.kind" placeholder="请选择" @change="getLevel">
                <el-option
                  v-for="item in kindList"
                  :key="item.kind"
                  :label="item.kind"
                  :value="item.kind">
                </el-option>
              </el-select>
              <!-- <el-radio-group v-model="form.train">      
                <el-radio v-for="(item,i) in trainList" :key="i" :label="item.userId">{{item.deptName}}</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </el-col>       
          <el-col :span="12">
            <el-form-item label="考试难度" prop="level">
                <el-select v-model="form.level" placeholder="请选择">
                <el-option
                  v-for="item in levelList"
                  :key="item.level"
                  :value="item.level">
                </el-option>
              </el-select>
              <!-- <el-radio-group v-model="form.train">      
                <el-radio v-for="(item,i) in trainList" :key="i" :label="item.userId">{{item.deptName}}</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">         
            <el-form-item label="分类：" prop="type">
              <iep-dict-select v-model="form.type" dict-name="tyb_article_type" @change = 'changType'></iep-dict-select>
            </el-form-item>
          </el-col> -->
        </el-row>   
        <el-row>                                                                                                                                                
          <el-col :span="8">                                                                       
            <el-form-item label="答卷时长" prop="answerTime">                                                                                                            
              <el-input v-model="form.answerTime" type='number' oninput="if(value.length>3)value=value.slice(0,3)">
                <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">                                                                       
            <el-form-item label="及格分数" prop="passScore">                                                                                                            
              <el-input v-model="form.passScore" type='number' oninput="if(value.length>3)value=value.slice(0,3)">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">                                                                       
            <el-form-item label="优秀分数" prop="goodScore">                                                                                                            
              <el-input v-model="form.goodScore" type='number' oninput="if(value.length>3)value=value.slice(0,3)">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <iep-form-item class="form-half" prop="articleContent" label-name="资讯内容">
          <iep-input-area v-model="form.articleContent"></iep-input-area>
        </iep-form-item> -->
        <el-row>
        <el-form-item label="考试说明：" prop="examExplain" v-show="isArticle">
          <iep-froala-editor v-model="form.examExplain"></iep-froala-editor>
        </el-form-item>
        </el-row>
        <el-form-item label="">         
          <operation-wrapper> 
            <iep-button type="primary" @click="handleSubmit('form')">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>             
<script>
import { examKind,examLevel,getExamById,createExam,updateExam } from '@/api/exam/examManagement'          
import { rules} from './options'
// import store from '@/store'
export default {         
  data () {  
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      rules,
      form:{
        examName:'',
        kind:'',//类型
        level:'',//等级
        answerTime:'',
        passScore:'',
        goodScore:'',
        examExplain:'',
        openScope:'1',
        testPaperId:0,
        chargeStatus:'1',
        rewardStatus:'1',
      },             
      init: false,
      // headers: {
      //   Authorization: 'Bearer ' + store.getters.access_token,
      // },
      isShow:false,
      isArticle:true,
      methodName:'',
      trainList:'',
      isTrain:false,

      kindList:[],
      levelList:[],
    }
  },
  computed: {                                                                                    
  },
  mounted () {                  
    this.methodName = this.$route.query.edit  ? '编辑' : '发布'
  },
  created () {
    if(this.$route.query.edit){
      this.getDetail()
    }                  
    this.getKindLevel()
  },    
  methods: {
    getKindLevel () {
      examKind().then(res=>{
        this.kindList = res.data.data
      })
    },
    getDetail (){
      getExamById(this.$route.query.edit).then(item=>{
        this.form = item.data.data
      })
    },
    getLevel (kind){
      this.form.level = ''
      examLevel(kind).then(res=>{
        this.levelList = res.data.data
      })
    },
    handleSubmit (formName){
      this.form.answerTime= parseInt(this.form.answerTime)
      this.form.passScore= parseInt(this.form.passScore)
      this.form.goodScore= parseInt(this.form.goodScore)
      // parseInt()
      this.$refs[formName].validate(valid=>{
        console.log(this.form)
        if(valid){
          if(this.$route.query.edit){
            updateExam(this.form).then(res=>{
              if(res.data.data){
                this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
                })
                this.$router.go(-1)
              }else{
                this.$message({
                message: `${this.methodName}失败`,
                type: 'error',
                })
              }
              
            })
          }else{
            createExam(this.form).then(res=>{
            console.log(res)
            if(res.data.data){
              this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
              })
              this.$router.go(-1)
            }else{
              this.$message({
              message: `${this.methodName}失败`,
              type: 'error',
              })
            }
            })
          }
          console.log('aaa')
        }else{
          return false
        }
      })
    },
    
  },
  watch: {

  },
}
</script>

<style>
  /* .avatar-uploader .el-upload {
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
  } */
</style>