<template>
  <span>
    <span v-if="!value.length">
      <a-tag>无</a-tag>
    </span>
    <span v-else v-for="(item,index) in value" :key="index">
      <a-tag @click="handleOpen(item)" v-bind="$attrs" v-on="$listeners">{{item}}</a-tag>
    </span>
  </span>
</template>
<script>
export default {
  name: 'IepTagDetail',
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
    iepType: {
      type: String,
      default: 'tag',
    },
  },
  methods: {
    handleOpen (name) {
      switch (this.iepType) {
        case 'tag':
          this.$openTagDetail(name)
          break
        default:
          break
      }
    },
  },
}
</script>
