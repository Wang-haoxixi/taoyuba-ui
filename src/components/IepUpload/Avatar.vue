<template>
  <el-upload class="avatar-uploader" action="/api/admin/file/upload/avatar" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" accept="image/*">
    <div class="no-avatar-wrapper">
      <a-avatar v-if="isShow" :size="64" shape="square" :src="value"></a-avatar>
      <a-avatar v-if="!isShow" shape="square" :size="64" icon="user"></a-avatar>
      <div class="intro-text">建议尺寸：300px * 300px 的等比图片</div>
    </div>
  </el-upload>
</template>
<script>
import store from '@/store'
export default {
  name: 'IepAvatar',
  props: {
    value: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null,
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
    isShow () {
      if (this.value.startsWith('//')) return true
      else return false
    },
  },
  methods: {
    handleAvatarSuccess (res) {
      this.$emit('input', res.data.url)
      // console.log(res.data.url, file)
    },
  },
}
</script>
<style scoped>
.avatar-uploader >>> .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.no-avatar-wrapper {
  display: flex;
  align-items: center;
  .intro-text {
    margin-left: 20px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
