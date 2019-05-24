<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList" class="up">
        <template v-if="activeTab ==='News'" v-slot:News>
          <news v-loading="activeTab !=='News'"></news>
        </template>
        <template v-if="activeTab ==='System'" v-slot:System>
          <system v-loading="activeTab !=='System'"></system>
        </template>
        <template v-if="activeTab ==='Task'" v-slot:Task>
          <task v-loading="activeTab !=='Task'"></task>
        </template>
      </iep-tabs>
      <div class="todyInfo">
        <span>今日公告：</span>
        <span>2019第十三届湖南连锁加盟</span>
      </div>
    </IepAppTabsCard>
  </div>
</template>
<script>
import News from './News'
import System from './System'
import Task from './Task'
export default {
  components: {
    News,
    System,
    Task,
  },
  data () {
    return {
      tabList: [{
        label: '要闻',
        value: 'News',
      }, {
        label: '制度',
        value: 'System',
      }, {
        label: '悬赏任务',
        value: 'Task',
      }],
      activeTab: 'News',
    }
  },
}
</script>
<style scoped>
.iep-tabs >>> .el-tabs__content {
  padding-bottom:20px;
}
</style>

<style lang="scss" scoped>
.up{
  position: relative;
}
.todyInfo {
  position:absolute;
  width:312px;
  height: 32px;
  line-height: 32px;
  left: -20px;
  bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #eee;
  text-align: center;
  &:span:nth-child(1){
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
}
</style>

