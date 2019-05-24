<template>
  <el-upload :action="action" :headers="headers" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" :on-error="handleError" :limit="limit" :on-exceed="handleExceed" :file-list="fileList" :drag="drag" v-bind="$attrs" v-on="$listeners">
    <iep-button v-if="!drag" type="primary" plain>点击上传</iep-button>
    <template v-else>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </template>
    <div slot="tip" class="el-upload__tip">
      <slot></slot>
    </div>
  </el-upload>
</template>
<script>
import store from '@/store'
import { downloadFile } from '@/api/common'
export default {
  name: 'IepUpload',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '/api/admin/file/upload',
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {
    fileList: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleError () {
      this.$message.error('错了哦，请检查文件服务器')
    },
    handleSuccess (res, file) {
      if (res.code) {
        if (!res.data) {
          this.$message.error('错了哦，请检查文件服务器')
        } else {
          this.$message.error(res.msg)
        }
        this.$emit('on-finish', [], false)
        this.$emit('input', [])
      } else {
        const formatFile = {
          name: file.name,
          url: res.data.bucketName + '-' + res.data.fileName,
          id: res.data.id,
        }
        this.fileList.push(formatFile)
        this.$message.success('上传成功')
        this.$emit('on-finish', this.fileList, true)
        this.$emit('input', this.fileList)
      }
    },
    handleRemove (file) {
      const newData = this.fileList.filter(item => item.url !== file.url)
      this.fileList = newData
    },
    handlePreview (file) {
      downloadFile(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>