<template>
  <div class="contract-box port-detail">
    <page-header title="电子台账栏目" :backOption="backOption"></page-header>
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row :gutter="80">
          <el-col :span="18">
              <el-form-item label="分类：" prop="columnId">
                  <el-select v-model="form.columnId" placeholder="请选择" style="width: 75%!important">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-tooltip class="item" effect="dark" :content="content()" placement="top">
                    <i class="el-icon-warning" style="margin-left: 10px;"></i>
                  </el-tooltip>
              </el-form-item>
          </el-col>
          <el-col :span="18">
              <el-form-item label="名称：" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="正文：" >
                <iep-froala-editor v-model="form.content" :value="form.content"></iep-froala-editor>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="附件：" class="is-required">
                <el-upload
                  :multiple="true"
                  :on-preview="onPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  class="upload-demo"
                  action="/api/admin/file/upload/avatar?type=1"
                  :on-success="handleAvatarSuccess"
                  :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">附件支持word文档、excel表格、PPT、PDF扫描件、图片等格式，大小限制在10M以内</div>
                </el-upload>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { addColumnNew,getDetail,getColumnPage } from '@/api/admin/ad.js'
export default {
  mixins: [],
  data () {
    return {
      form: {
        content: '',
      },
      options: [],
      loading: false,
      rules: {
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        columnId: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
      },
      fileList: [],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
    }
  },
  methods: {
    getDetail (id) {
      if( id ){
        getDetail(id).then(res=>{
          this.form = res.data.data
          // console.log(this.form)
          this.form.files.forEach(element => {
            this.fileList.push({...element,name: element.originalName})
          })
        })
      }else{
        this.form = {}
      }
    },
    back () {
      this.$emit('back')
    },
    // 提交
    sumbit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form))
          // console.log(this.fileList)
          form.files = []
          this.fileList.forEach(element => {
            if( element.response ){
              form.files.push(element.response.data)
            }else{
              form.files.push(element)
            }
          })
            addColumnNew(form).then(res=>{
              console.log(res)
              if(res.data.code === 0){
                this.$message.success('操作成功!')
                this.$emit('back')
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    content () {
      let data = ''
      this.options.forEach(element => {
        if( element.id === this.form.columnId ){
          data = element.description
        }
      })
      return data
    },
    handleAvatarSuccess (res, file,fileList) {
      // let data = ''
      this.fileList = fileList
      // this.fileList.forEach(element => {
      //   data = element.response.data.originalNamePreFix + ';' + data
      // })
      // this.$set(this.form,'name',data)
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    onPreview (file) {
        if( file.response ){
          window.open(file.response.data.url)
        }else{
          window.open(file.url)
        }
    },
    beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
            this.$message.error('上传大小不能超过 10MB!')
        }
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1) 
        const extension = testmsg === 'txt' 
        if (extension) {
            this.$message.error('无法上传txt文件!')
        }
        return isLt2M && !extension
    },
  },
  computed: {
  },
  created () {
      getColumnPage({size: 500}).then(res=>{
        this.options = res.data.data.records
      })
  },
  mounted () {
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
#container {
  width: 500px;
  height: 500px;
}
.contract-box {
  padding: 20px;
}
.time-consultation {
  display: flex;
  align-items: center;
  height: 45px;
  ::v-deep .el-date-editor.el-input {
    margin: 10px;
  }
  ::v-deep .el-switch {
    margin: 10px;
  }
}
.span-consultation {
  display: inline-block;
  width: 105px;
}
</style>
