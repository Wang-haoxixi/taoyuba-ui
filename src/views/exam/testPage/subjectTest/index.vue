<template>
  <component @onStart="handleStart" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import Show from './Page/examShow'
import Start from './Page/examStart'

export default {
  name: 'TableListWrapper',
  components: {
    Show,
    Start,
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
      console.log('record => ',record)
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'Show'
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
