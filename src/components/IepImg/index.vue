<template>
  <img :src="realSrc">
</template>
<script>
import { base64Url } from '@/config/env'

export default {
  name: 'IepImg',
  inheritAttrs: false,
  props: {
    src: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null || prop === undefined,
    },
  },
  computed: {
    realSrc () {
      if (!this.src) {
        return base64Url
      }
      return this.src
    },
  },
}
</script>
