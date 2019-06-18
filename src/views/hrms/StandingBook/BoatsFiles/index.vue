<template>
  <component :record="record" :is="currentComponet"></component>
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