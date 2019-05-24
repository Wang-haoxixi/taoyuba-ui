<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Shadow'" v-slot:Shadow>
          <shadows v-loading="activeTab !=='Shadow'"></shadows>
        </template>
        <template v-if="activeTab ==='Leader'" v-slot:Leader>
          <leader v-loading="activeTab !=='Leader'"></leader>
        </template>
        <template v-if="activeTab ==='Metting'" v-slot:Metting>
          <metting v-loading="activeTab !=='Metting'"></metting>
        </template>
        <template v-if="activeTab ==='Honour'" v-slot:Honour>
          <honour v-loading="activeTab !=='Honour'"></honour>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Shadows from './Shadow'
import Leader from './Leader'
import Metting from './Metting'
import Honour from './Honour'
export default {
  components: {
    Shadows,
    Leader,
    Metting,
    Honour,
  },
  data () {
    return {
      tabList: [{
        label: '光影见证',
        value: 'Shadow',
      }, {
        label: '领导关怀',
        value: 'Leader',
      }, {
        label: '会场直击',
        value: 'Metting',
      }, {
        label: '荣誉资质',
        value: 'Honour',
      }],
      activeTab: 'Shadow',
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
.el-carousel__container {
  height: 200px;
}
</style>
