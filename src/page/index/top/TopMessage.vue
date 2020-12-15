<template>
  <!-- <el-popover popper-class="msg-popover" placement="bottom" width="336" v-model="visible" trigger="click">
    <a-spin :spinning="pageLoading">
      <el-tabs class="msg-tabs" v-model="activeName">
        <el-tab-pane :label="`公告 (${announcementNum})`" name="first">
          <iep-top-message-box :message-list="announcementList" :type="0" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
        <el-tab-pane :label="`消息 (${systemMessageNum})`" name="second">
          <iep-top-message-box :message-list="systemMessageList" :type="1" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
        <el-tab-pane :label="`邮件 (${emailNum})`" name="third">
          <iep-top-message-box :message-list="emailList" :type="2" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
      </el-tabs>
    </a-spin>
    <div class="list-clear">清空 通知</div>
    <el-badge :hidden="!totalNum" :value="totalNum" slot="reference" class="item">
      <iep-button><i class="el-icon-bell"></i></iep-button>
    </el-badge>
  </el-popover> -->
  <el-badge class="item" :is-dot="isDot">
    <iep-button @click="onTo"><i class="el-icon-bell"></i></iep-button>
  </el-badge>
</template>
<script>
// import { getImsWel } from '@/api/ims/email'
// import IepTopMessageBox from './Components/MessageBox'
import { getCount } from '@/api/tmlms/message/information'
export default {
  // components: { IepTopMessageBox },
  data () {
    return {
      pageLoading: true,
      isDot: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.pageLoading = true
      getCount({unread: 0}).then(({ data }) => {
        if (data.code === 0) {
          this.isDot = !!data.data
        }
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      })
      // getImsWel().then(({ data }) => {
      //   this.totalNum = data.totalNum
      //   this.announcementList = data.announcementList
      //   this.announcementNum = data.announcementNum
      //   this.emailList = data.emailList
      //   this.emailNum = data.emailNum
      //   this.systemMessageList = data.systemMessageList
      //   this.systemMessageNum = data.systemMessageNum
      //   this.pageLoading = false
      // })
    },
    onTo () {
      this.isDot = false
      let tabObj = {
        label: '我的消息',
        id: 4630,
        path: '/wel/message/information',
      }
      this.$emit('tabList', tabObj)
      // this.isDot = false
      this.$router.push('/wel/message/information')
    },
  },
}
</script>
<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  top: 20px;
  right: 22px;
}
.msg-popover >>> .el-popover {
  right: 0;
}
.msg-tabs >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.msg-tabs >>> .el-tabs__active-bar {
  left: 30px;
  width: 70px !important;
}
.msg-tabs >>> .el-tabs__header {
  margin-bottom: 0;
}
.msg-tabs >>> .el-card__body {
  overflow: auto;
}
.msg-tabs >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 8px;
  background-color: #fff;
}
.msg-tabs >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.msg-tabs >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
</style>
<style lang="scss" scoped>
.item {
  position: relative;
  margin-right: 20px;
  button {
    border: 0;
    height: 60px;
    i {
      font-size: 20px;
    }
    &:focus,
    &:hover {
      background-color: #eee;
      color: #333;
    }
  }
}
.list-clear {
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid #eceef5;
  color: #999;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #666;
  }
}
</style>
