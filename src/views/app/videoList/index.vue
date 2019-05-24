<template>
  <div class="video-list">
    <video-list-top></video-list-top>
    <video-list-content></video-list-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import VideoListContent from './VideoListContent'
import VideoListTop from './VideoListTop'
export default {
  name: 'video-list',
  components: { VideoListContent, VideoListTop },
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

