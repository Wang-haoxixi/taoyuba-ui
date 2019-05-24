<template>
  <div>
    <a-dropdown>
      <div class="user-info-wrapper">
        <a-avatar icon="user" :src="userInfo.avatar" />
        <span class="user-name">{{ userInfo.realName || '游客' }}</span>
        <a-icon type="down" />
      </div>
      <a-menu slot="overlay">
        <a-menu-item @click="$openPage('/')">
          工作台
        </a-menu-item>
        <a-menu-item @click="handleOrg(orgText.type)">
          {{orgText.tipText}}&nbsp;&nbsp;&nbsp;
          <a-icon type="swap" />
        </a-menu-item>
        <a-menu-item @click="$openPage('BaseSettings','name')">
          个人信息
        </a-menu-item>
        <a-menu-item @click="handleAbout">
          关于
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="handleLogout">
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
    <about-dialog ref="AboutDialog"></about-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AboutDialog from './AboutDialog'
import SelectOrgDialog from './SelectOrgDialog'
export default {
  components: {
    SelectOrgDialog,
    AboutDialog,
  },
  data () {
    return {
      confirmLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'noOrg',
    ]),
    orgText () {
      const noObj = {
        tipText: '无组织(加入/创建)',
        type: 0,
      }
      const haveObj = {
        tipText: `${this.userInfo.orgName}`,
        type: 1,
      }
      return this.noOrg ? noObj : haveObj
    },
  },
  methods: {
    ...mapActions(['LogOut']),
    handleOrg (type) {
      if (type === 0) {
        this.$router.push({ name: '选择组织' })
      } else {
        this.$refs['selectOrgDialog'].dialogShow = true
      }
    },
    handleAbout () {
      this.$refs['AboutDialog'].visible = true
    },
    handleLogout () {
      this.$antConfirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.LogOut().then(() => {
            this.$router.push({ path: '/login' })
          }).catch(err => {
            this.$message.error(err.message)
          })
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.user-info-wrapper {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-name {
    margin-left: 10px;
  }
}
</style>
