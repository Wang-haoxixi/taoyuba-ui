<template>
  <component @onEdit="handleEdit" @onChange='handleChange' @onGoBack="handleGoBack" :record="record"
    :is="currentComponet"></component>
</template>

<script>
//动态切换组件
import List from './List'
import Edit from './Edit'
import Page from '../Page'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
    Page,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
    },
    handleChange (record) {
      this.record = record
      this.currentComponet = 'Page'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleGoPage (record) {
      this.$emit('onGoPage', record)
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

