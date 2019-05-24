<template>
  <el-button :type="type" size="small" @click="click" icon="el-icon-plus" class="btn-default">新增</el-button>
</template>
<script>
  export default {
    name: 'add-btn',
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
<style>
  button.btn-default {
    font-size: 14px;
    padding: 8px 15px;
  }
</style>