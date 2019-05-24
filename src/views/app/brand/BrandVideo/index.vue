<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Govmade'" v-slot:Govmade>
          <govmade v-loading="activeTab !=='Govmade'"></govmade>
        </template>
        <template v-if="activeTab ==='Componey'" v-slot:Componey>
          <componey v-loading="activeTab !=='Componey'"></componey>
        </template>
        <template v-if="activeTab ==='Products'" v-slot:Products>
          <products v-loading="activeTab !=='Products'"></products>
        </template>
        <template v-if="activeTab ==='ActivityVideo'" v-slot:ActivityVideo>
          <activity-video v-loading="activeTab !=='ActivityVideo'"></activity-video>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Govmade from './Govmade'
import Componey from './Componey'
import Products from './Products'
import ActivityVideo from './ActivityVideo'
export default {
  components: {
    Govmade,
    Componey,
    Products,
    ActivityVideo,
  },
  data () {
    return {
      tabList: [{
        label: '视说国脉',
        value: 'Govmade',
      }, {
        label: '企业风采',
        value: 'Componey',
      }, {
        label: '产品亮相',
        value: 'Products',
      }, {
        label: '活动视频',
        value: 'ActivityVideo',
      }],
      activeTab: 'Govmade',
    }
  },
}
</script>
<style scoped>
.leaderBoard {
  grid-column-start: 1;
  grid-column-end: 4;
}
</style>
<style lang="scss" scoped>
.el-carousel {
  overflow: hidden;
}
.department-con {
  margin: 18px 0;
  padding: 0 80px;
  white-space: nowrap;
  overflow: hidden;
  .department-list {
    display: inline-block;
    margin: 0 15px;
    width: 22%;
    overflow: hidden;
    height: 200px;
    text-align: center;
    cursor: pointer;
    &:hover .sub-title {
      color: #cb3737;
    }
    .img {
      width: 100%;
      height: 140px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .sub-title {
      display: block;
      margin: 10px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}
</style>
