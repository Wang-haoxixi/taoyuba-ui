<template>
  <div class="news-right">
    <tags-hot></tags-hot>
    <important-news></important-news>
    <hot-news></hot-news>
  </div>
</template>
<script>
import HotNews from './HotNews'
import TagsHot from './TagsHot'
import ImportantNews from './ImportantNews'
export default {
  components: { TagsHot, ImportantNews, HotNews },
}
</script>
<style scoped>
.news-right >>> .sub-title {
  font-size: 16px;
}
.news-right >>> .el-card__header {
  padding-left: 0;
  padding-bottom: 10px;
}
</style>
