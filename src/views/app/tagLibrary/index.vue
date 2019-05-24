<template>
  <div>
    <tag-search></tag-search>
    <recommend></recommend>
    <all-tags></all-tags>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import TagSearch from './TagSearch'
import Recommend from './Recommend'
import AllTags from './AllTags'
export default {
  components: {
    TagSearch,
    Recommend,
    AllTags,
  },
}
</script>
