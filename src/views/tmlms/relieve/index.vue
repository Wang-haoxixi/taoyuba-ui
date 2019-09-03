<template>
  <component @onGoBack="handleGoBack" :record="record" :type="type" :is="currentComponet"></component>
</template>
<script>
import List from './Page/List'

export default {
  name: 'TableListWrapper',
  components: { List },
  data () {
    return {
      currentComponet: 'List',
      record: '',
      type: '',
    }
  },
  methods: {
    handleGoBack () {
      this.record = ''
      this.type = ''
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