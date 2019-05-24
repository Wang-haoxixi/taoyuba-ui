<template>
  <el-card class="box-card" :body-style="bodyStyle">
    <iep-no-data v-if="!messageList.length" message="暂无内容"></iep-no-data>
    <el-scrollbar wrap-class="message-box-wrapper">
      <template v-for="(item,idx) in messageList">
        <div :key="item.id" class="text">
          <div class="list-item-content">
            <h4 class="list-item-title" @click="handleDetail(item)">{{ item.name }}</h4>
            <div class="list-item-description">
              <span class="time">{{ item.time | formatTime }}</span>
            </div>
          </div>
        </div>
        <a-divider v-if="messageList.length-1 !== idx" :key="-item.id" />
      </template>
    </el-scrollbar>
    <a-divider />
    <div class="msg-footer">
      <a-button type="dashed" @click="handleOpen()" block>查看更多</a-button>
    </div>
  </el-card>
</template>
<script>
const MessageTypeMap = [
  {
    name: '公告',
    onePath: '/ims_spa/announcement_detail',
    morePath: '/wel/message/announcement',
  },
  {
    name: '消息',
    onePath: '/ims_spa/system_message_detail',
    morePath: '/wel/message/system_message',
  },
  {
    name: '邮件',
    onePath: '/mlms_spa/email/detail',
    morePath: '/wel/mail/inbox',
  },
]
export default {
  name: 'IepTopMessageBox',
  props: {
    messageList: {
      type: Array,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      bodyStyle: {
        padding: 0,
      },
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `${MessageTypeMap[this.type].onePath}/${row.id}`,
      })
      this.$emit('visible', false)
    },
    handleOpen () {
      this.$openPage(MessageTypeMap[this.type].morePath)
      this.$emit('visible', false)
    },
  },
}
</script>
<style scoped>
.msg-footer >>> button {
  border: none;
}
.box-card >>> .ant-divider {
  margin: 12px 0;
}
.box-card >>> .message-box-wrapper {
  max-height: 350px;
}
</style>

<style lang="scss" scoped>
.message-box-wrapper {
  max-height: 400px;
}
h4 {
  margin: 0;
  padding: 0;
  font-weight: 400;
}
.box-card {
  border: 0;
  .text {
    display: flex;
    flex: 1 1;
    align-items: flex-start;
    padding: 0 20px;
    &:first-child {
      padding-top: 20px;
    }
    .list-item-content {
      flex: 1 0;
      .list-item-title {
        cursor: pointer;
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;
      }
      .list-item-description {
        color: #999;
        font-size: 12px;
        line-height: 22px;
      }
    }
  }
}
.msg-footer {
  text-align: center;
}
</style>