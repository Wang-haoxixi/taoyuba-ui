<template>
  <component @onDetail="handleDetail" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Detail from './Page/Detail'
export default {
  name: 'TableListWrapper',
  components: {
    List,
    Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleDetail (row) {
      if (row.type == 'material') {
        this.$router.push(`/mlms_spa/material/detail/${row.targetId}`)
      } else if (row.type == 'meeting') {
        this.$router.push(`/mlms_spa/summary/detail/${row.targetId}`)
      }
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>
