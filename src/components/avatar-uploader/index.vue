<template>
  <el-upload class="avatar-uploader" :headers="token" :action="`/api/admin/upload/uploadAvatar`" name="file" multiple :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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
    handleAvatarSuccess (response) {
      this.imageUrl = response
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
