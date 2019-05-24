
<template>
  <div class="technical-application">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <div class="piece" v-for="(item,index) in form.technologyRelations" :key="index">
      <div>
        <iep-img :src="item.imageUrl" style="width:40px;height:40px;"></iep-img>
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      title: '相关技术应用',
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.technical-application {
  overflow: hidden;
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
  .piece {
    float: left;
    width: 100px;
    margin-right: 30px;
    > div {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border: 1px solid #dcdcdc;
      margin: 0 auto;
      > i {
        font-size: 40px;
        color: #999;
      }
    }
    span {
      width: 1005;
      height: 36px;
      line-height: 36px;
      text-align: center;
      display: block;
    }
  }
}
</style>
<style scoped>
</style>
