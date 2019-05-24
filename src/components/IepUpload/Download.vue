<template>
  <div>
    <a-tag v-for="file in value" :key="file.url" @click="handleDownload(file)">
      <a-icon type="paper-clip" />{{file.name}}</a-tag>
  </div>
</template>
<script>
import { downloadFile } from '@/api/common'
export default {
  name: 'IepDownload',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleDownload (file) {
      downloadFile(file)
    },
  },
}
</script>
