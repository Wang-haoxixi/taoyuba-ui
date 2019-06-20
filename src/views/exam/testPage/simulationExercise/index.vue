<template>
  <component @onStart="handleStart" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import Show from './Page/parctiseShow'
import Start from './Page/parctiseStart'

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
    handleStart () {
      this.record = ''
      this.currentComponet = 'Start'
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
