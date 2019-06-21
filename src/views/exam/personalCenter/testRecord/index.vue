<template>
  <component @onShowResult="handleGoResult" @onStartExam="handleGoExam" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>
<script>
import List from './List'
import Result from '@/views/exam/testPage/subjectTest/Page/examExamine'
import Exam from '@/views/exam/testPage/subjectTest/Page/examStart'
export default {
  name: 'titleRecord',
  components: {
    List,
    Result,
    Exam,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleGoExam (record) {
      this.record = record
      this.currentComponet = 'Exam'
    },
    handleGoResult (record) {
      this.record = record
      this.currentComponet = 'Result'
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

