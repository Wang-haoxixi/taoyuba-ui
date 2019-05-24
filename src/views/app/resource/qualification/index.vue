<template>
  <div>
    <search @load-page="loadPage"></search>
    <qualification-content ref="content"></qualification-content> 
  </div>
</template>
<script>
import Search from './QualificationSearch'
import QualificationContent from './QualificationContent'

export default {
  data () {
    return {
    }
  },
  components:{
    Search,
    QualificationContent,
  },
  methods: {
    loadPage (val) {
      this.$refs['content'].loadPageSearch(val)
    },
  },
}
</script>
<style scoped>
</style>
