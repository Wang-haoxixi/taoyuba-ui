<template>
  <el-upload class="avatar-uploader" :action="`/api/admin/upload/uploadAvatar?userId=${userInfo.userId}`" :auto-upload="false" name="file" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-change="handleChange">
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'avatar-component',
  props: ['value'],
  data () {
    return {
      imageUrl: null,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    handleChange (file) {
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.imageUrl = reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
  watch: {
    value (n) {
      this.imageUrl = n
    },
    imageUrl (n) {
      this.$emit('input', n)
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
