<template>
  <component @onDetail="handleDetail" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>
<script>
import List from './Page/List'
// import Edit from './Page/Edit'
// import Detail from './Page/Detail'

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
    handleEdit () {
      // this.record = record
      // this.currentComponet = 'Edit'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleDetail () {
      // this.record = record
      // this.currentComponet = 'Detail'
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