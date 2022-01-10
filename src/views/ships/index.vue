<template>
  <!-- 添加key用于防止频繁使用该组件导致created只能触发第一次 -->
  <component :record="record" :is="currentComponet" :key="$route.path"></component>
</template>
<script>
import List from './Page/List'

export default {
  name: 'TableListWrapper',
  components: { List },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {
  },
  methods: {
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
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