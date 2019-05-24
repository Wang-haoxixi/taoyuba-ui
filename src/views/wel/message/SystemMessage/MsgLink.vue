<template>
  <div>
    {{link.content}}
    <a href="#" v-if="isCommon" @click.prevent="handleOpen">进入</a>
  </div>
</template>
<script>
export default {
  name: 'MsgLink',
  props: {
    link: {
      type: Object,
      required: true,
    },
    imsPathType: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isCommon () {
      if (this.link.pathId) {
        return this.link.pathType !== '3' ? `${this.imsPathType.label}/${this.link.pathId}` : undefined
      } else {
        return this.link.pathType !== '3' ? `${this.imsPathType.label}` : undefined
      }
    },
  },
  methods: {
    handleOpen () {
      this.$openPage(this.isCommon)
    },
  },
}
</script>
