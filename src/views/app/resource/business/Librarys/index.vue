<template>
  <div class="most">
    <librarys-header :total="total" @load_page="loadPage"></librarys-header>
    <librarys-content ref="content"></librarys-content>
  </div>
</template>
<script>
import LibrarysHeader from './LibrarysHeader'
import LibrarysContent from './LibrarysContent'

export default {
  components: { LibrarysHeader, LibrarysContent },
  data () {
    return {
      total: 0,
      list: [],
    }
  },
  methods: {
    loadPage (val) {
      this.$refs['content'].searchData(val)
    },
  },
}
</script>
