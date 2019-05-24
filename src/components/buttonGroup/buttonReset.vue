<template>
  <el-button :type="type" size="small" @click="click" class="btn-default">重置</el-button>
</template>
<script>
  export default {
    name: 'reset-btn',
    methods: {
      click () {
        this.$emit('click')
      },
    },
    props: {
      type: {
        type: String,
        default: 'default',
      },
    },
  }
</script>