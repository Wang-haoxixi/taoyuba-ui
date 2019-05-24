<template>
  <keep-alive include="List">
    <component @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>
<script>
import List from './Page/List'

export default {
  name: 'OrganizationReward',
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