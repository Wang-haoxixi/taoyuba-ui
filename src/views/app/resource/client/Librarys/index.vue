<template>
  <div class="most">
    <librarys-header @load-page="loadPage"></librarys-header>
    <librarys-content ref="librarys"></librarys-content>
  </div>
</template>
<script>
import LibrarysHeader from './LibrarysHeader'
import LibrarysContent from './LibrarysContent'
export default {
  components: { LibrarysHeader, LibrarysContent },
  data () {
    return {
    }
  },
  methods: {
    loadPage (val) {
      this.$refs['librarys'].searchData(val)
    },
  },
}
</script>
