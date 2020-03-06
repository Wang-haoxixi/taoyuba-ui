<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <el-form :disabled="type === 'view'" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="视频标题：" prop="vedioName">
              <el-input maxlength="20" v-model="form.vedioName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频上传路径：" prop="videoSrc">
              <el-input maxlength="80" v-model="form.videoSrc">
                <template slot="prepend">http://</template>     
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>            
              <el-col :span="12">
              <el-form-item  label="视频照片：" prop="videoImg">
                <el-upload
                  class="avatar-uploader"
                  action="/api/admin/file/upload/avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessFront" :headers="headers"  accept="image/*">
                  <img v-if="form.videoImg" :src="form.videoImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>      
          <el-col :span="24">
            <el-form-item label="视频简介：" prop="videoDescript">
              <iep-input-area v-model="form.videoDescript"></iep-input-area>
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
import { getVideoDetail, createVideo, updateVideo} from '@/api/lessonVideo'
import { initForm , rules } from '../options'
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
      arr:[],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }                               
  },
  computed: {                                                                                                                                                               
    type () {
      return this.$route.params.type
    },
    videoId () {
      return this.$route.params.id
    },
    getTitle () {                                                                     
      return `在线视频${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}`
    },
  },
  created () {                                                        
    if (this.type !== 'create' && this.videoId) {                                      
      this.getVideoDetail()
    } else {        
          //
    }
  },
  methods: {                                                                                                                                                                                                                                                                                                                  
    getVideoDetail () {                                      
      getVideoDetail(this.videoId).then(({data}) => {
        if (data.code === 0)  this.form = data.data 
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    handleSubmit () {   
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.videoSrc  = 'http://' + this.form.videoSrc
          if (this.type === 'create') {
            createVideo(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.type === 'update') {
            updateVideo(this.form).then(({data}) => {
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
  handleAvatarSuccessFront (response) {
      this.form.videoImg = response.data.url
    },
  },
}
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px solid #CCC;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 356px;
    height: 178px;
    display: block;
  }
  .certAvatar {
    width: 80px;
    height: 30px;
    display: block;
  }
</style>