<template>
  <component @onDetail="handleDetail" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Detail from './Page/Detail'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
    Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {

  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
    },
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
    },
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
