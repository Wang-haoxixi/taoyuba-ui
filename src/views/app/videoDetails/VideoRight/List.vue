<template>
  <div class="video-con">
    <iepAppTabCard :title="title">
      <div class="video-notice">
        <div v-for="(item,index) in videoNotice" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '相关视频',
      videoNotice: [
        { name: '营商通宣传片' },
        { name: '国策数据宣传片' },
        { name: '数据基因系统产品介绍' },
        { name: 'DIPS产品推荐' },
        { name: '国策数据宣传片' }],
    }
  },
}
</script>
<style lang="scss" scoped>
.video-notice {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.video-con >>> .el-card {
  padding: 0;
  border: 0;
  background: none;
}
.video-con >>> .el-card__header {
  border: 0;
  padding: 18px 0 0;
}
</style>
