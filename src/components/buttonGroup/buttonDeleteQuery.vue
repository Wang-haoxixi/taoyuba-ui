<template>
  <el-button size="small" @click="click" class="btn-default" :type="type">批量删除</el-button>
</template>
<script>
  export default {
    name: 'delete-query-btn',
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
<style>
  button.btn-default {
    font-size: 14px;
    padding: 8px 15px;
  }
</style>