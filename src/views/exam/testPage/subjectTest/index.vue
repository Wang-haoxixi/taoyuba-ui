<template>
  <component @onStart="handleStart" @onGoBack="handleGoBack" @onExamine="handleExamine" :record="record"
    :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import Show from './Page/examShow'
import Start from './Page/examStart'
import Examine from './Page/examExamine'

export default {
  name: 'TableListWrapper',
  components: {
    Show,
    Start,
    Examine,
  },
  data () {
    return {
      currentComponet: 'Show',
      record: '',
    }
  },
  methods: {
    handleStart (record) {
      this.record = record
      this.currentComponet = 'Start'
      console.log('record => ', record)
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'Show'
    },
    handleExamine (record) {
      this.record = record
      this.currentComponet = 'Examine'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'Show'
    },
  },
}
</script>
