<template>
  <div>
    <!-- <img class="top-userImg" :src="userInfo.avatar" @error.once="imageLoadError" width="50px"> -->
    <el-dropdown placement="bottom-start">
      <span class="el-dropdown-link">
        {{ userInfo.username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/" class="block">首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/info/password" class="block">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/info/info" class="block">修改资料</router-link>
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout" divided class="block">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { initMenu } from '@/util/util'
export default {
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          initMenu(this.$router, [])
          this.$router.push({ path: '/login' })
        })
      })
    },
  },
}
</script>
<style scoped>
  .block {
    display: block;
  }
</style>
