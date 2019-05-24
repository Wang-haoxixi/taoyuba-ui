<template>
  <div style="display: flex;">
    <div class="files-tag-wrapper">
      <el-tag v-if="!(value||[]).length" type="info" :size="size">{{remindText}}</el-tag>
      <el-tag v-for="file in (value||[])" class="file-tag" :key="file.id" type="info" :size="size" @close="handleClose(file)" :disable-transitions="false" @click.native="handleDownload(file)" :closable="!disabled">{{file.fileName}}</el-tag>
    </div>
    <div v-if="!disabled" class="btn-wrapper">
      <el-button icon="el-icon-close" @click="handleCleanAll" :size="size" circle></el-button>
    </div>
    <div v-if="!disabled" class="btn-wrapper">
      <el-button icon="el-icon-upload2" @click="handleOpenTable" :size="size" circle></el-button>
    </div>
    <form-dialog title="选择文件" :dialog-show="dialogShow" @close="dialogShow = false" width="500px" :is-need-confirm="false">
      <div class="upload-wrapper">
        <el-upload drag :headers="token" :action="action || `/api/cbs/file/upload?sampType=${sampType}`" :limit="1" :on-error="handleUploadError" :on-success="handleUploadSuccess" :before-upload="onBeforeUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传不超过30Mb的文件</div>
        </el-upload>
      </div>
    </form-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters, mapState } from 'vuex'
import dialogMixins from '@/mixins/dialog_mixins'
import { downloadFile } from '@/api/cbs/file'

export default {
  mixins: [dialogMixins],
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    remindText: {
      type: String,
      required: false,
      default: '暂无文件',
    },
    sampTypeName: {
      type: String,
      required: false,
      default: '网上办理流程',
    },
    size: {
      type: String,
      default: 'small',
    },
    value: {
      type: Array,
      required: true,
      default: ()=>{return []},
    },
    action: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      dialogShow: false,
      token: {},
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    ...mapState({
      access_token: state => state.user.access_token,
    }),
    sampType () {
      if (this.dicList['MAT_UPLOAD_FILE_TYPE'].length>0) {
        const nameMap = _.keyBy(this.dicList['MAT_UPLOAD_FILE_TYPE'], 'label')
        return nameMap[this.sampTypeName].value
      }
      return ''
    },
  },
  created () {
    this.token.Authorization = 'Bearer ' + this.access_token
  },
  methods: {
    onBeforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 30
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 30MB!')
      }
      return isLt1M
    },
    handleDownload (file) {
      downloadFile(file.nfileName)
    },
    handleUploadError () {
      this.$message.error('上传失败！')
    },
    handleUploadSuccess (response, file) {
      const { value } = this
      const newFiles = [...value]
      newFiles.push(...file.response.data.files)
      this.$emit('input', newFiles)
      this.dialogShow = false
    },
    handleOpenTable () {
      this.dialogShow = true
    },
    handleClose (row) {
      const { value } = this
      const files = [...value]
      const newFiles = _.filter(files, item => item.id !== row.id)
      this.$emit('input', newFiles)
    },
    handleCleanAll () {
      this.$emit('input', [])
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-wrapper {
  text-align: center;
}
.files-tag-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #eee;
  padding: 0 4px;
  .file-tag {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  /deep/ .el-tag {
    margin: 3px 0;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
