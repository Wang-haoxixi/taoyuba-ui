<template>
  <div class="fr-view">
    <div v-html="value"></div>
  </div>
</template>
<script>
export default {
  name: 'IepHtml',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.fr-view {
  word-break: break-all;
}
</style>
