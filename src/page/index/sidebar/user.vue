<template>
  <div class="user-box">
    <transition name="fade">
      <el-tooltip class="item" effect="dark" key="1" content="点击修改资料" placement="top">
        <img v-if="isCollapse" key="0" class="avatar user-avatar-small" :src="userInfo.avatar" @click="open('/info/info');" @error.once="imageLoadError" />
      </el-tooltip>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <el-tooltip class="item" effect="dark" key="1" content="点击修改资料" placement="top">
          <img class="avatar user-avatar" :src="userInfo.avatar" @click="open('/info/info');" @error.once="imageLoadError" />
        </el-tooltip>
        <el-dropdown placement="bottom-start" key="2" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/password">修改密码</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/info">修改资料</router-link>
            </el-dropdown-item>
            <el-dropdown-item command="about"> 关于 </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </transition-group>
    <form-dialog :dialogShow="isAbout" title="关于" width="40%" @close="handleClose" :isNeedConfirm="false">
      <div class="about">
        <h3>项目名: {{ BUILD_PRO_NAME }}({{ BUILD_VER_TAG }})</h3>
        <p>版本: {{ BUILD_GIT_HASH }}</p>
        <p v-html="BUILD_PRO_DESC"></p>
        <p>构建于: {{ BUILD_TIME | dateFormatLLLL }}</p>
      </div>
    </form-dialog>
  </div>
</template>
<script>
import formDialog from '@/components/form-dialog'
import { mapState } from 'vuex'
import { initMenu } from '@/util/util'
export default {
  props: ['isCollapse'],
  components: { formDialog },
  data () {
    return {
      isAbout: false,
      // eslint-disable-next-line
      BUILD_PRO_NAME: BUILD_PRO_NAME,
      // eslint-disable-next-line
      BUILD_VER_TAG: BUILD_VER_TAG,
      // eslint-disable-next-line
      BUILD_PRO_DESC: BUILD_PRO_DESC,
      // eslint-disable-next-line
      BUILD_GIT_HASH: BUILD_GIT_HASH,
      // eslint-disable-next-line
      BUILD_TIME: BUILD_TIME,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    open (url) {
      this.$router.push({
        path: url,
      })
    },
    imageLoadError (thisImg) {
      this.$message({
        showClose: true,
        message: '头像加载失败, 使用默认头像',
        type: 'warning',
      })
      thisImg.target.src = '/img/onerror-avatar.png'
    },
    handleClose () {
      this.isAbout = false
    },
    handleCommand (command) {
      if (command === 'about') {
        this.isAbout = true
      }
    },
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

<style lang="scss" scoped>
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-active {
  transition: all 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.user-box {
  padding: 15px;
  .el-dropdown-link {
    margin-left: 10px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
  }
  .avatar {
    cursor: pointer;
    margin-right: 10px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .user-avatar-small {
    border: 1px solid rgb(223, 223, 223);
    width: 30px;
    height: 30px;
  }
  .user-avatar {
    border: 2px solid rgb(223, 223, 223);
    width: 70px;
    height: 70px;
  }
}
.about {
  text-align: left;
  padding-left: 20px;
  line-height: 26px;
  font-size: 16px;
  p {
    margin-left: 5px;
    margin-top: 5px;
  }
}
</style>
