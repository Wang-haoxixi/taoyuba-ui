<template>
  <div class="tasks">
    <basic-container>
      <page-header title="我的任务"></page-header>
      <div class="tasks-info">
        <span>我的任务模块与内网中的项目、财务、人力、会议纪要等其他模块和功能相关联，成为内网使用频率最高且功能强大的模块。</span>
        <span>我的任务模块亦可成为用户自主填写的效率清单</span>
        <span>用户自主收到来自其他模块的任务安排，未来的日报、周报、月报可以从我的任务中截取。</span>
        <span class="red">我的任务模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AllTasks'" v-slot:AllTasks>
          <all-tasks v-loading="activeTab !=='AllTasks'"></all-tasks>
        </template>
        <template v-if="activeTab ==='NotBegin'" v-slot:NotBegin>
          <not-begin v-loading="activeTab !=='NotBegin'"></not-begin>
        </template>
        <template v-if="activeTab ==='OnGoing'" v-slot:OnGoing>
          <on-going v-loading="activeTab !=='OnGoing'"></on-going>
        </template>
        <template v-if="activeTab ==='Completed'" v-slot:Completed>
          <completed v-loading="activeTab !=='Completed'"></completed>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import AllTasks from './AllTasks'
import NotBegin from './NotBegin'
import OnGoing from './OnGoing'
import Completed from './Completed'
export default {
  components: { AllTasks, NotBegin, OnGoing, Completed },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '全部',
        value: 'AllTasks',
      }, {
        label: '尚未开始',
        value: 'NotBegin',
      }, {
        label: '进行中',
        value: 'OnGoing',
      }, {
        label: '已完成',
        value: 'Completed',
      }],
      activeTab: 'AllTasks',
    }
  },
}
</script>
<style scoped lang="scss">
.tasks-info {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;
  span {
    display: block;
    line-height: 28px;
    color: #333;
  }
}
.red {
  color: #ba1b21 !important;
}
.block-right {
  line-height: 48px;
  position: absolute;
  right: 0;
  top: 7px;
  color: #333;
  z-index: 3;
  cursor: pointer;
  span {
    display: inline-block;
    margin-right: 20px;
    &:hover {
      color: #ba1b21;
    }
  }
}
</style>

<style scoped>
.iep-tabs >>> .el-tabs__nav {
  width: 100%;
}
.iep-tabs >>> .el-card__body {
  position: relative;
}
.tasks >>> .el-card {
  border: 0;
  padding: 0;
}
</style>
