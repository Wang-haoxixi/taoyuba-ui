<template>
  <!-- 政务信息系统清单 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>

    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
export default {
  components: {},
  mixins: [allMixin],
  data () {
    return {

    }
  },
  methods: {
    getList () {

    },
  },
}
</script>
