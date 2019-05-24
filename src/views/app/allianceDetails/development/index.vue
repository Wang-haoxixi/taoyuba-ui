<template>
  <div class="events">
    <i class="el-icon-time"></i>
    <span class="line"></span>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="events.time" :name="index" class="item" v-for="(events,index) in eventsList" :key="index">
        <el-timeline>
          <el-timeline-item v-for="activity in events.activities" :key="activity.id" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: [0, 1],
      eventsList: [
        {
          time: '2019年',
          activities: [{
            content: '职称由助理咨询师变为初级咨询师',
            timestamp: '04-03',
          }, {
            content: '部门有平台运营中心变为产品中心',
            timestamp: '03-12',
          }, {
            content: '获得“专业员工”称号',
            timestamp: '02-03',
          }, {
            content: '获被同事评为“热情敬业”',
            timestamp: '01-03',
          }],
        },
        {
          time: '2018年',
          activities: [{
            content: '成功中标《眉山大数据产业发展规划》项目。',
            timestamp: '12-03',
          }, {
            content: '成功中标《眉山大数据产业发展规划》项目。',
            timestamp: '10-12',
          }, {
            content: '获得“专业员工”称号',
            timestamp: '09-03',
          }, {
            content: '国脉智慧产业城正式建成，是舟山海洋科学城海洋大数据产业园重要组成部分、舟山智慧城市的示范基地、中国大数据基因研发中心、国家信息化专家重点工程实验室。舟山海洋电子信息产业服务综合实验室挂牌。',
            timestamp: '08-03',
          }, {
            content: '成功中标《眉山大数据产业发展规划》项目。',
            timestamp: '07-03',
          }, {
            content: '国脉智慧产业城正式建成，是舟山海洋科学城海洋大数据产业园重要组成部分、舟山智慧城市的示范基地、中国大数据基因研发中心、国家信息化专家重点工程实验室。舟山海洋电子信息产业服务综合实验室挂牌。',
            timestamp: '05-03',
          }],
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.events {
  position: relative;
  margin: 20px 80px;
  .item {
    position: relative;
  }
  .line {
    position: absolute;
    top: 10px;
    left: 84px;
    display: block;
    width: 2px;
    height: 100%;
    background-color: #ddd;
    z-index: 1;
  }
  .el-icon-time {
    position: absolute;
    top: 10px;
    left: 70px;
    font-size: 32px;
    color: #ddd;
    background: #fff;
    z-index: 2;
  }
}
</style>
<style scoped>
.events >>> .el-timeline-item__node {
  border: 1px solid #ddd;
  border-radius: 50%;
  z-index: 3;
}
.events >>> .el-timeline-item:nth-child(1) .el-timeline-item__node {
  border: 0;
}
.events >>> .el-timeline {
  margin-left: 40px;
}
.events >>> .el-timeline-item__timestamp {
  position: absolute;
  top: 4px;
  left: -40px;
  margin: 0;
}
.events >>> .el-collapse-item__arrow {
  margin: 0 auto 0 8px;
}
.events >>> .el-collapse-item__header,
.events >>> .el-collapse,
.events >>> .el-collapse-item__wrap {
  border: 0;
}
.events >>> .el-collapse-item__wrap {
  overflow: inherit;
}
.events >>> .el-timeline-item:hover .el-timeline-item__content {
  color: #cb3737;
  transition: all 0.5s;
}
.events >>> .el-timeline-item:hover .el-timeline-item__node {
  border-color: #cb3737;
  background-color: #cb3737;
  color: #cb3737;
  transition: all 0.5s;
}
</style>
