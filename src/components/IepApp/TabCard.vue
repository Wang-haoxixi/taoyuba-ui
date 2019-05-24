<template>
  <el-card class="index-card" shadow="never">
    <div slot="header" class="clearfix">
      <span class="title">{{title}}<span class="datas">{{data}}</span><i class="iconfont icon-wenhao" v-if="icon"></i></span>
      <slot name="statistics"></slot>
      <el-button class="btn" type="text" v-if="isMore" @click="getMore">更多></el-button>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'IepAppTabCard',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: '/app/index',
    },
    data: {
      type: String,
      default: '',
    },
  },
  data () {
    return {

    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: this.linkName,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  color: #303133;
  margin: 0 4px;
}
.btn {
  float: right;
  padding: 5px 0;
  color: #999;
}
.datas {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.iconfont {
  margin-left: 5px;
  color: #999;
  cursor: pointer;
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 18px 0 10px;
}
.index-card >>> .el-card__body {
  padding: 16px 0;
}
.el-card {
  padding: 0 20px;
}
</style>



