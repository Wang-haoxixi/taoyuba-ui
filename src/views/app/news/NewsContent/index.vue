<template>
  <div class="news-content">
    <news-left></news-left>
    <news-right></news-right>
  </div>
</template>
<script>
import NewsRight from './NewsRight'
import NewsLeft from './NewsLeft'
export default {
  components: { NewsLeft, NewsRight },
}
</script>
<style lang="scss" scoped>
.news-content {
  display: grid;
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
</style>
