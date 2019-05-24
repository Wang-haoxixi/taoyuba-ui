<template>
  <div class="librarys-header">
    <div class="left">
      <div :label="title" name="first">{{title}}</div><span class="data">（今日上传{{total}}个）</span>
    </div>
    <div class="right">
      <operation-search @search-page="searchPage" prop="keyWord">
      </operation-search>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      title: '商机库',
    }
  },
  methods: {
    searchPage (val) {
      this.$emit('load_page', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.librarys-header{
  height: 53px;
  padding-top: 12px;
  border-bottom: solid 1px #e6e6e6;
  .left{
    float: left;
    > div{
      display: inline-block;
      font-size: 16px;
      line-height: 40px;
      padding:0 10px;
      border-bottom: 2px solid #ba1b21;
    }
    .data{
      font-size: 14px;
      color: #9b9b9b;
    }
  }
  .right{
    float: right;
  }
}
</style>
