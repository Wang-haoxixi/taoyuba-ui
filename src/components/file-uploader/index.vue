<template>
  <el-upload class="upload-demo" :headers="token" :action="`/api/admin/upload/uploadAvatar`" :on-preview="handlePreview" :before-remove="beforeRemove" :on-success="handleSuccess" :file-list="fileList">
    <el-button size="small" type="primary">附件上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传不超过500MB</div>
  </el-upload>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['value'],
  data () {
    return {
      fileList: this.value ? this.value : [],
      token: {},
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      access_token: state => state.user.access_token,
    }),
  },
  created () {
    this.token.Authorization = 'Bearer ' + this.access_token
  },
  methods: {
    handleSuccess (response, file) {
      this.fileList = [
        {
          name: file.name,
          url: response,
        },
      ]
    },
    handlePreview (file) {
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      link.click()
      link.remove()
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
  watch: {
    fileList (n) {
      this.$emit('input', n[0])
    },
  },
}
</script>
