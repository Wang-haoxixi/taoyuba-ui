<template>
  <div class="optimal">
    <iepAppTabCard :title="title1">
      <div class="technology-list">
        <div v-for="(item,index) in technologyList" :key="index" class="piece">
          <img :src="item.img" alt="">
          <div class="text">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
            <span class="label">{{item.label}}</span>
          </div>
        </div>
      </div>
    </iepAppTabCard>
    <IepAppTabCard :title="title2" :linkName="linkName" class="last-card">
      <div class="last-month">
        <div v-for="(item,index) in lastMonth" :key="index" class="piece">
          <img :src="item.img" alt="">
          <div class="text">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
            <span class="label">{{item.label}}</span>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title1: '技术之星',
      title2: '上月最佳',
      linkName: '',
      technologyList: [
        { img: require('./img/optimal1.jpg'), name: '钟乙乔', department: '集团研发中心', label: '需求分析/原型设计/知识图谱' },
        { img: require('./img/optimal2.jpg'), name: '张灵', department: '国脉集团研发中心运维组', label: 'DNA运维/环境配置/服务器部署' },
      ],
      lastMonth: [{ img: require('./img/optimal3.jpg'), name: '丁斌', department: '产品与技术委员会', label: '微服务/需求梳理/数据门户' }],
    }
  },
}
</script>
<style lang="scss" scoped>
.technology-list,
.last-month {
  .piece {
    width: 100%;
    margin-bottom: 16px;
    overflow: hidden;
    img {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 18px;
    }
    .text {
      width: 270px;
      height: 50px;
      float: left;
      .title {
        height: 25px;
        line-height: 25px;
        .department {
          margin-left: 4px;
          color: #999;
        }
      }
      .label {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
.last-card {
  margin-top: -4px;
  border-top-color: #fff;
  .last-month {
    .piece {
      overflow: hidden;
      margin-top: 20px;
    }
  }
}
</style>
<style scoped>
.last-card >>> .el-card__body {
  padding-top: 0;
}
.last-card >>> .el-card__header {
  padding-top: 0;
}
</style>
