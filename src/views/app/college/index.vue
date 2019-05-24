<template>
  <div class="school">
    <school-top></school-top>
    <school-content></school-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import SchoolContent from './SchoolContent/'
import SchoolTop from './SchoolTop'
export default {
  name: 'School',
  components: { SchoolContent, SchoolTop },
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

