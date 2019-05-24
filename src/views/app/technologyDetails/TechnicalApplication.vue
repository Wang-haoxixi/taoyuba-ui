
<template>
  <div class="technical-application">
    <div class="title">
      <div>相关技术应用</div>
    </div>
    <iep-no-data v-if="!form.technologyRelations.length"></iep-no-data>
    <div class="piece" v-for="(item) in form.technologyRelations" :key="item.id">
      <div>
        <img :src="item.imageUrl" :alt="item.name" class="img">
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['form'],
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
      width: 50px;
      height: 50px;
      text-align: center;
      border: 1px solid #dcdcdc;
      margin: 0 auto;
      > img {
        width: 100%;
        height: 100%;
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
