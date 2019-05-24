<template>
  <gov-dialog
    ref="dialog"
    title="导入"
    width="70%"
    @handleClose="close"
    :btnGroup="btnGroup"
    @closed="close"
    @handleSubmit="handleSubmit">
    <div class="import-container">
      <div class="import-text">
        <p>1、点击<a href="javascript:void(0);" @click="downLoadDemo" class="download-text">{{name}}</a>将要导入的数据填充到数据导入模板文件中</p>
        <p class="import-content">注意事项：</p>
        <p class="import-content">1）模板中的表头不可更改，表头不可删除；</p>
        <p class="import-content">2）部分数据名称需要与系统已有库内一致，否则无法导入。详情请见数据模板；</p>
        <p>2、选择导入的数据文件</p>
      </div>
      <p class="error-content" v-if="errorContent">错误提示：{{errorContent}}</p>
      <div class="upload-wrapper">
        <el-upload
          ref="upload"
          :auto-upload="autoUpload"
          class="upload"
          :with-credentials="true"
          name="file"
          drag
          :headers="headers"
          :data="data"
          :file-list="fileList"
          :on-success="importSuccess"
          :on-error="importFaild"
          :action="`/api${action}`"
          :show-file-list="showFileList"
          :before-upload="fullLoading"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
  </gov-dialog>
</template>
<script>
export default {
  name: 'GovDialogImport',
  props: {
    // 是否自定上传
    autoUpload: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '下载导入数据模板',
    },
    link: {
      type: String,
      default: 'javascript:void(0);',
    },
    action: {
      type: String,
      default: '',
    },
    tokenName: {
      type: String,
      default: 'access_token',
    },
    data: {
      type: Object,
      default: () => {},
    },
    btnGroup: {
      type: Array,
      default: () => [{
        label: '开始导入',
        type: 'primary',
        fn: 'handleSubmit',
      },{
        label: '取消',
        fn: 'handleClose',
      }],
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      // 弹框状态
      dialogStatus: '',
      // 弹窗
      dialog: {
        visible: false,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem(this.tokenName)).content}`,
      },
      loading: false,
      errorContent: '',
      fileList: [],
    }
  },
  methods: {
    // 打开弹窗
    open () {
      this.$refs['dialog'].open()
    },
    // 关闭弹窗
    close () {
      this.errorContent = ''
      this.fileList = []
      this.$refs['dialog'].close()
    },
    handleOpenDialog () {
      this.$emit('openDialog')
      this.open()
    },
    handleCloseDialog () {
      this.$emit('closeDialog')
      this.close()
    },
    handleSubmit () {
      new Promise(() => {
        this.$refs.upload.submit()
      }).then(() => {
        this.$emit('submit')
      })
    },
    fullLoading () {
      this.loading = this.$loading({
          lock: true,
          text: '正在导入...',
          spinner: 'el-icon-loading',
        })
    },
    importFaild () {
      setTimeout(()=>{
        this.loading.close()
        this.$message.warning('导入失败，请检查导入数据！')
      },500)
    },
    importSuccess (response) {
      this.loading.close()
      this.errorContent = ''
      if (response.code === 0) {
        let msg = '导入成功！'
        response.msg ? msg = response.msg : ''
        this.$message.success(msg)
        this.$emit('importSuccess', response)
        this.close()
      } else {
        this.$message.warning('导入失败！')
        this.errorContent = response.msg
      }
    },
    downLoadDemo () {
      this.$emit('downLoadDemo')
    },
  },
}
</script>
<style lang="scss" scoped>
.import-container {
  .import-text {
    padding-left: 30px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.8;
    a {
      text-decoration: none;
      color: #409EFF;
    }
    a:hover {
      text-decoration: underline;
      color: #409EFF;
    }
    .import-content {
      text-indent: 23px;
    }
  }
  .error-content {
    color: #ff0000;
    padding-left: 30px;
    margin: 20px 0;
  }
  .upload {
    text-align: center;
  }
  .wrong-file {
    color: #f00;
  }
}
</style>
