<template>
  <gov-dialog
    ref="dialog"
    width="70%"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption">
            <template slot="teamLogo" slot-scope="scope" >
              <div class="stdDocFileList" v-for="item in scope.row.teamLogo" :key="item.url">
                {{item.name}}
                <i
                  v-if="item.name"
                  element-loading-background="rgba(0, 0, 0, 0.6)"
                  element-loading-text="正在导出数据..."
                  class="el-icon-download icon-download"
                  @click="downloadFile(item)"
                  v-loading.fullscreen.lock="fullscreenLoading"></i>
              </div>
            </template>
          </gov-detail-form>
        </div>
        
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form" :option="projectTeamFormOption" v-model="form">
            <template slot="teamLogo">
              <el-upload
                v-model="form.attachmentMapList"
                class="avatar-uploader"
                :headers="httpHeaders"
                action="/api/proj/dnaprojectteam/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>  
          </avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>    
</template>

<script>
import { headers } from '../projectWeekly/const/header'
import mixin from "@/mixins/mixin"
import mainMixin from './const/mixin'
import { downloadFile } from '@/api/projectManagement/projectList'
import { getLogo } from '@/api/projectManagement/projectTeam'
export default {
  mixins: [mixin,mainMixin],
  name: "mainDialog",
  data () {
    return {
      form: {},
      imageUrl: '',
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  created () {
  },
  computed: {
    httpHeaders () {
      return headers
    },
    detailOption () {
      return {
        option: [
          {
            column: this.projectTeamFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    //获取图片的base64
    getLogo (id) {
      getLogo({id: id}).then(({data}) => {
        this.imageUrl = data.data
      })
    },
    //上传成功方法
    handleAvatarSuccess (response, file) {
      let arr = []
      arr.push(response)
      this.form.teamLogo = arr
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message.success('上传成功')
    },
    //上传前的方法
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type ==='image/png') || (file.type ==='image/jpg')
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPEG,PNG,JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    },
    //打开弹窗
    openDialog (formData) {
      this.form = formData || {}
      this.id = this.form.id
      if (this.id) {
        this.getLogo(this.id)
      }
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ""
        this.imageUrl = ''
        this.$refs['dialog'].close()
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        if (typeof(this.form.teamLogo) == 'string') {
          this.form.teamLogo = []
        }
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    // 下载上传的文件
    downloadFile (data) {
      let params = {
        fileAddress: data.url,
      }
      this.fullscreenLoading = true
      downloadFile({params,title:data.name.split('.')[0]}).then(()=>{
        this.fullscreenLoading = false
        this.$message.info('正在导出数据...')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.stdDocFileList {
  position: relative;
  .icon-download {
    position: absolute;
    top: 12px;
    right: 0;
    cursor: pointer;
    color: #999;
    :hover {
      color: #333;
    }
  }
}

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>