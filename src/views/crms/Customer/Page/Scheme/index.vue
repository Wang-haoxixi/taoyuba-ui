<template>
  <component ref="component" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" @load-page="loadPage" :is="currentComponet" :data="data"></component>
</template>

<script>
// 动态切换组件
import List from './List'
import Edit from './Edit'
export default {
  components: {
    List,
    Edit,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      data: '',
      currentComponet: 'List',
    }
  },
  methods: {
    handleEdit (val) {
      this.data = val
      this.currentComponet = 'Edit'
    },
    handleGoBack () {
      this.currentComponet = 'List'
    },
    loadPage () {
      this.$emit('load-page')
    },
  },
}
</script>
