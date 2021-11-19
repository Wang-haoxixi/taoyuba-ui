<template>
  <div class="iep-ellipsis" :title="content">
    {{content}}
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  name: 'IepTableDetail',
  props: ['value'],
  computed: {
    content () {
      if (validatenull(this.value)) {
        return '--'
      } else {
        return this.value
      }
    },
  },
}
</script>
