<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}试题`" :backOption="backOption"></page-header>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="单题输入" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="题型" prop="type">
                  <el-select v-model="form.type" placeholder="请选择" size="medium">
                    <el-option
                      v-for="item in typeList"
                      :key="item.index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> 
            <el-row>
              <el-col :span="12">
                <el-form-item label="考试分类" prop="kind">
                    <el-select v-model="form.kind" placeholder="请选择" @change="getLevel" size="medium">
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
                <el-form-item label="职务等级" prop="level">
                    <el-select v-model="form.level" placeholder="请选择" size="medium">
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
            <!-- <el-row>
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
            </el-row> -->
            <!-- <iep-form-item class="form-half" prop="articleContent" label-name="资讯内容">
              <iep-input-area v-model="form.articleContent"></iep-input-area>
            </iep-form-item> -->
            <el-row>
            <el-form-item label="题目：" prop="title">
              <el-input  type="textarea" v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            </el-row>
            <el-row>
            <!-- <el-row :gutter="10">
              <el-col :span="22">
                <el-form-item label="选项A:">
                  <el-input size="medium" v-model="firstOption.value"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <div v-for="(item,index) in testOptions" :key='index'>
              <el-row :gutter="10">
              <el-col :span="22">
                <el-form-item :label="'选项'+testOptions[index].key">
                  <el-input size="medium"  v-model="testOptions[index].value"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button size="medium" @click="deleteItem(item, index)">删除</el-button>
              </el-col>
            </el-row>
            </div>
            <el-row>
              <el-form-item >
                <el-button @click="addItem" v-if="form.type!='GAPFILLING' && form.type!='ESSAYQUESTION'">添加选项</el-button>
              </el-form-item>
            </el-row>
            <el-form-item label="答案：" prop="answer">
              <el-input  type="textarea" v-model="form.answer" maxlength="500" show-word-limit placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="上传图片：">
              <el-upload
                class="avatar-uploader"
                action="/api/admin/file/upload/avatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="demo-image__preview">
                  <template v-for="(url,index) in imgList">
                    <span class="demo-image__preview-boss" :key="index">
                      <div class="chacha" @click="deleteImg(index)">
                        <i class="el-icon-error"></i>
                      </div>
                        <el-image
                          style="width: 100px; height: 100px;"
                          :src="url" 
                          :preview-src-list="imgList">
                        </el-image>
                      </span>
                  </template>
              </div>
            </el-form-item>
            </el-row>
            <el-form-item label="">
              <operation-wrapper>
                <iep-button type="primary" @click="handleSubmit('form')">保存</iep-button>
              </operation-wrapper>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量导入" name="second">
          <el-upload
            class="avatar-uploader"
            :headers = 'headers'
            action="/api/tmlms/word/import"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleImport"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">批量导入题目</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <!-- <el-button type="primary" size="medium" @click="handleImport">批量导入题目</el-button> -->
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>
<script>
import { examKind,examLevel,createTest,updateTest,getTestById } from '@/api/exam/examManagement'
import { rules} from './options'
import store from '@/store'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      // backOption: {
      //   isBack: true,
      //   backPath: null,
      //   backFunction: () => { this.onGoBack() },
      // },
      rules,
      testFrom: {
        examQuestionList: [],
      },
      // firstOption:{
      //   key:'A',
      //   value:'',
      // },
      testOptions:[],
      form:{
          title:'',
          kind:'',//类型
          level:'',//等级
          options:'',
          answer:'',
          tag: '1',
          type: 'RADIO',
      },
      typeList:[
        {
          label:'单选题',
          value:'RADIO',
        },
        {
          label:'判断题',
          value:'CHECKED',
        },
        {
          label:'复选题',
          value:'CHECKBOX',
        },
        {
          label:'填空题',
          value:'GAPFILLING',
        },
        {
          label:'简答题',
          value:'ESSAYQUESTION',
        },
      ],
      activeName: 'second',
      init: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isShow:false,
      methodName:'',
      trainList:'',
      isTrain:false,

      kindList:[],
      levelList:[],
      fileList: [],
      imgList: [],
    }
  },
  computed: {
  },
  mounted () {
    this.methodName = this.$route.query.edit  ? '编辑' : '发布'
  },
  created () {
    if(this.$route.query.edit){
      this.activeName = 'first'
      this.getDetail()
    }
    this.getKindLevel()
  },
  methods: {
    handleAvatarSuccess (res) {
      this.imgList.push(res.data.url)
    },
    addItem () {
      let str
      if(this.testOptions.length){
        str = this.testOptions[this.testOptions.length-1].key
        this.testOptions.push({
        key: String.fromCharCode(str.charCodeAt()+1),
        value: '',
        })
      }else{
        str = 'A'
        this.testOptions.push({
        key: String.fromCharCode(str.charCodeAt()),
        value: '',
        })
      }
    },
    handleError (error) {
      const result = JSON.parse(error.message)
      this.$message({
        showClose: true,
        message: result.msg,
        type: 'error',
        duration: 6000,
      })
    },
    deleteImg (index) {
      this.imgList.splice(index,1)
    },
    deleteItem (item, index) {
      this.testOptions.splice(index, 1)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleImport (file){
      this.$confirm('上传成功，是否继续上传', '提示', {
          confirmButtonText: '否',
          cancelButtonText: '是',
          type: 'warning',
      }).then(()=>{
        this.$router.go(-1)
      })
      console.log('handleImport', file)
      // importWord(response).then(res=>{
      //   console.log(res)
      // })
    },
    getKindLevel () {
      examKind().then(res=>{
        this.kindList = res.data.data
      })
    },
    getDetail (){
      getTestById(this.$route.query.edit).then(item=>{
        this.getLevel(item.data.data.kind)
        this.form = item.data.data
        if(item.data.data.url){
          this.imgList = JSON.parse(item.data.data.url)
        }
        console.log(this.form.options)
        this.testOptions = JSON.parse(this.form.options)
      })
    },
    getLevel (kind){
      this.form.level = ''
      examLevel(kind).then(res=>{
        this.levelList = res.data.data
      })
    },
    handleSubmit (formName){
      this.$refs[formName].validate(valid=>{
        this.form.options = JSON.stringify(this.testOptions)
        if(valid){
          if(this.$route.query.edit){
            updateTest({...this.form,url: JSON.stringify(this.imgList)}).then(res=>{
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
            }).catch((error)=>{
              this.$message({
                message: error,
                type: 'error',
              })
            })
          }else{
            this.testFrom.examQuestionList = []
            let data = {...this.form,url: JSON.stringify(this.imgList)}
            this.testFrom.examQuestionList.push(data)
            createTest({...this.testFrom}).then(res=>{
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

<style scoped lang="scss">
 ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
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
  .demo-image__preview-boss {
    position: relative;
    width: 100px;
    height: 100px;
    display: inline-block;
    margin-right: 20px;
    .chacha {
      position: absolute;
      z-index: 2;
      right: 0;
      top: -6px;
      color: red;
      font-size: 20px;
    }
  }
</style>