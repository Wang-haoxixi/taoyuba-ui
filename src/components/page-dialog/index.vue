<template>
  <div>
    <basic-container v-if="!pageShow">
      <slot name="page"></slot>
    </basic-container>
    <el-card class="box-card" v-if="pageShow">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleClose">关闭</el-button>
      </div>
      <slot name="form"></slot>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['pageShow', 'title'],
  data () {
    return {
      parent: null,
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.box-card {
  margin: 20px;
  border-radius: 6px;
}
</style>
