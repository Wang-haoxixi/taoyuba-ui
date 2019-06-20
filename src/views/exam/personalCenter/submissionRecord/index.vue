<template>
  <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>
<script>
import List from './List'
import report from '@/views/exam/reviewCenter/testQuestionsLibrary/Page/Edit'
export default {
  name: 'titleRecord',
  components: {
    List,
    report,
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
      this.currentComponet = 'report'
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

