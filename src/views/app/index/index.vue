<template>
  <div>
    <div class="index">
      <about></about>
      <baner></baner>
      <dynamic></dynamic>
      <honor></honor>
      <product-resources></product-resources>
      <leader-board></leader-board>
      <wonderful></wonderful>
      <video-center></video-center>
      <cultural-system></cultural-system>
      <feedback></feedback>
      <learning-resources></learning-resources>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import About from './About'
import Baner from './Baner'
import Dynamic from './Dynamic'
import Honor from './Honor'
import ProductResources from './ProductResources/'
import LeaderBoard from './LeaderBoard/'
import Wonderful from './Wonderful/'
import VideoCenter from './VideoCenter'
import CulturalSystem from './CulturalSystem'
import Feedback from './Feedback'
import LearningResources from './LearningResources'
export default {
  components: { About, Baner, Dynamic, Honor, ProductResources, LeaderBoard, Wonderful, VideoCenter, CulturalSystem, Feedback, LearningResources },
  data () {
    return {

    }
  },
  created () {
    this.$notify({
      title: '注意',
      message: '此页面正在开发中，当前数据仅供参考。',
      offset: 60,
    })
  },
}
</script>
<style lang="scss" scoped>
.index {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .index-card {
    font-size: 14px;
    border: 1px solid #f0f0f0;
    padding: 15px 20px;
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>
