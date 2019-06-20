<template>
  <keep-alive include="list">
    <component ref="component" @onEdit="handleEdit" @onGoBack="handleGoBack" @onGoPage="handleGoPage"
      @showDrawer="showDarwer" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import Exam from './examination/'
import Page from './Page'
export default {
  name: 'ExamLibraryComponents',
  components: {
    Exam,
    Page,
  },
  data () {
    return {
      currentComponet: 'Exam',
      record: '',
    }
  },
  created () {
  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Page'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'Exam'
      // this.$nextTick(() => {
      //   this.$refs['component'].loadPage()
      // })
    },
    handleGoPage (record) {
      this.record = record
      this.currentComponet = 'Page'
    },
    showDarwer (val) {
      this.$nextTick(() => {
        this.$refs['component'].showDrawer(val)
      })
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'Exam'
    },
  },
}
</script>
