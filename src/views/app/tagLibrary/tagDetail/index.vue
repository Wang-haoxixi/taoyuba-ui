<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="tag-detail">
      <tag-content :form="form"></tag-content>
      <about-tags :form="form"></about-tags>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import BreadCrumb from './BreadCrumb'
import AboutTags from './TagRight'
import TagContent from './TagContent'
import { getTagViewById } from '@/api/tms/tag'
import { initForm } from './options'
export default {
  components: {
    BreadCrumb,
    AboutTags,
    TagContent,
  },
  data () {
    return {
      form: initForm(),
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.loadPage()
    })
    next()
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getTagViewById(this.$route.params.id)
      this.form = data.data
    },
  },
}
</script>
<style scoped lang="scss">
.tag-detail {
  width: 1200px;
  padding: 10px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 320px) minmax(100px, 500px) minmax(
      100px,
      380px
    );
}
</style>
