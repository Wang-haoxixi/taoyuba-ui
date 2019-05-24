<template>
  <div class="collaborative-record">
    <iepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="collaborative-record-notice">
        <div v-for="(item,index) in collaborativeRecord" :key="index" class="piece">
          <div class="con">
            <span class="name">{{item.name}}</span>
            <span class="time">{{item.time}}</span>
          </div>
          <span class="department">{{item.department}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '协作记录',
      collaborativeRecord: [
        { name: '中免公司官方网站建设项目', department: '海南办事处', time: '2019-04-02' },
        { name: '德州一次办信息系统建设项目', department: '湖南国脉原道数据科技有限公司（衡阳办事处、长沙）', time: '2019-03-03' },
        { name: '最高检政务资源目录梳理', department: '湖南国脉原道数据科技有限公司（衡阳办事处、长沙）', time: '2019-03-11' },
        { name: '营商通培训', department: '北方业务一部', time: '2019-04-03' },
        { name: '浙江系统数据基因项目管理系统', department: '国脉基因研发中心', time: '2019-04-03' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.collaborative-record {
  .piece {
    margin-bottom: 14px;
    cursor: pointer;
    .con {
      position: relative;
    }
    .name {
      display: inline-block;
      width: 200px;
      height: 16px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .department {
      display: block;
      font-size: 12px;
      color: #666;
    }
    .time {
      float: right;
      height: 16px;
      line-height: 16px;
      color: #666;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
  }
}
</style>
<style scoped>
.collaborative-record-con >>> .el-card__body {
  height: 270px;
}
</style>
