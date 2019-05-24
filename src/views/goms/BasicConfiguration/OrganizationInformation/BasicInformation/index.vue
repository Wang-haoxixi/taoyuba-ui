<template>
  <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import Edit from './Edit'
import Detail from './Detail'

export default {
  name: 'OrganizationInformation',
  components: {
    Edit,
    Detail,
  },
  data () {
    return {
      currentComponet: 'Detail',
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
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'Detail'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'Detail'
    },
  },
}
</script>
