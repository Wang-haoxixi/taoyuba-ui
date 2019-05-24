<template>
  <div>
    <news-top></news-top>
    <news-content></news-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import NewsContent from './NewsContent/'
import NewsTop from './NewsTop/'
export default {
  name: 'News',
  components: { NewsContent, NewsTop },
}
</script>
