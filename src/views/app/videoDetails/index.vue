<template>
  <div>
    <div class="video">
      <div class="video-con">
        <video-left></video-left>
        <video-right></video-right>
      </div>
      <video-operate></video-operate>
      <IepAppEvaluationReview></IepAppEvaluationReview>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import VideoLeft from './VideoLeft'
import VideoRight from './VideoRight/'
import VideoOperate from './VideoOperate'
export default {
  components: { VideoLeft, VideoRight, VideoOperate },
  data () {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.video {
  margin: 0 auto;
  width: 1200px;
}
.video-con {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
</style>
