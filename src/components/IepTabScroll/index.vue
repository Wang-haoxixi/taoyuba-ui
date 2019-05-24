<template>
  <div>
    <iep-tabs v-model="type" :tab-list="tabList" @tab-click="changeType"></iep-tabs>
    <el-scrollbar :style="styleOption">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'IepTabScroll',
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      type: this.tabList[0].value,
    }
  },
  computed: {
    styleOption () {
      return {
        height: `calc(100vh - ${this.height}px)`,
      }
    },
  },
  methods: {
    changeType (a) {
      window.location.hash = `#${a.name}`
    },
  },
}
</script>
