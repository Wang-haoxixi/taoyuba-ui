<template>
  <svg class="iep2-icon" aria-hidden="true">
    <use :xlink:href="formatIcon"></use>
    <title>{{title}}</title>
  </svg>
</template>
<script>
export default {
  name: 'IepIdentityMark',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    formatIcon () {
      return `#${this.icon}`
    },
  },
}
</script>
<style lang="css" scoped>
.iep2-icon {
  font-size: 20px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
