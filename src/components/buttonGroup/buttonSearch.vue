<template>
  <el-button :type="type" size="small" @click="click" class="btn-default">搜索</el-button>
</template>
<script>
  export default {
    name: 'search-btn',
    methods: {
      click () {
        this.$emit('click')
      },
    },
    props: {
      type: {
        type: String,
        default: 'primary',
      },
    },
  }
</script>