<template>
  <div class="upload-select-wrapper">
    <el-tooltip :content="fileName" placement="top">
      <template v-if="fileName.length > 20" slot="title">
        <span>{{fileName}}</span>
      </template>
      <el-tag class="file-tag" type="info" :size="size" @click="handleDownload" :closable="!disabled && closable" @close="clearFile">
        {{`${fileName.slice(0, 15)}${fileName.length > 20 ? '...' : ''}`}}
      </el-tag>
    </el-tooltip>
    <el-tag class="file-tag" v-if="!disabled" :size="size" type="info" @click="handleUpload()">
      <a-icon type="upload" />
    </el-tag>
    <iep-dialog :dialog-show="dialogShow" title="文件" width="440px" @close="dialogShow=false">
      <div class="upload-wrapper">
        <iep-upload v-model="fileList" drag :limit="1" @on-finish="handleFinish" v-if="!type"></iep-upload>
        <avatar :value="null" @input="handleFinishAvatar" v-if="type"></avatar>
      </div>
    </iep-dialog>
    <iep-dialog :dialog-show="dialogShow1" title="图片" width="440px" @close="dialogShow1=false">
      <div class="upload-wrapper">
        <img :src="src" alt="" style="width:100%">
      </div>
    </iep-dialog>
  </div>
</template>
<script>
import { downloadUrl } from '@/api/common'
import Avatar from './Avatar'
export default {
  name: 'IepUploadSelect',
  components: {Avatar},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'mini',
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      dialogShow1: false,
      fileList: [],
      src: '',
    }
  },
  computed: {
    closable () {
      if (this.value === '') {
        return false
      }
      return true
    },
    fileName () {
      if (this.value === '') {
        return '无文件'
      }
      return this.value
    },
  },
  methods: {
    handleDownload () {
      if (this.type) {
        this.dialogShow1 = true
      }
      if (this.closable && !this.type) {
        downloadUrl(this.value)
      }
    },
    clearFile () {
      this.$emit('input', '')
    },
    handleFinish (files) {
      this.fileList = []
      this.$emit('input', files[0].url)
      this.dialogShow = false
    },
    handleFinishAvatar (files) {
      // console.log(files)
      this.src = files
      this.$emit('input', files)
      this.dialogShow = false
    },
    handleUpload () {
      this.dialogShow = true
    },
  },
  created () {
    this.src = this.fileName
    // console.log(this.fileName)
  },
}
</script>
<style lang="scss" scoped>
.upload-select-wrapper {
  display: flex;
  align-items: center;
}
.upload-wrapper {
  display: flex;
  justify-content: center;
}
.file-tag {
  margin-right: 5px;
  cursor: pointer;
}
</style>
