<template>
  <div class="training-list">
    <training-list-top></training-list-top>
    <training-list-content></training-list-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import TrainingListContent from './TrainingListContent'
import TrainingListTop from './TrainingListTop'
export default {
  name: 'training-list',
  components: { TrainingListContent, TrainingListTop },
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

