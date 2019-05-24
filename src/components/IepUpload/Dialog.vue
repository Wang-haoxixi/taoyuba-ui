<template>
  <iep-dialog :dialog-show="dialogShow" title="文件" width="440px" @close="dialogShow=false">
    <div class="upload-wrapper">
      <iep-upload v-model="fileList" :action="action" drag :limit="1" @on-finish="handleFinish"></iep-upload>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  name: 'IepUploadDialog',
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      fileList: [],
    }
  },
  methods: {
    handleFinish (files, isSuccess) {
      if (isSuccess) {
        this.fileList = []
        this.$emit('on-finish', files[0].url)
        this.dialogShow = false
      } else {
        this.fileList = []
      }
    },
  },
}
</script>
<style scoped>
.upload-wrapper {
  display: flex;
  justify-content: center;
}
</style>
