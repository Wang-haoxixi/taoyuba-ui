<template>
  <el-button :type="type" size="small" @click="click" class="btn-default">导入</el-button>
</template>
<script>
  export default {
    name: 'import-btn',
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