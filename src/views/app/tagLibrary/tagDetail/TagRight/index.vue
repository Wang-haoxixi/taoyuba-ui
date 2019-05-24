<template>
  <div class="piece">
    <IepAppTabCard title="相关标签">
      <iep-no-data v-if="!form.tagList.length"></iep-no-data>
      <IepAppLabelCard :dataList="form.tagList.map(m => m.commonName)"></IepAppLabelCard>
    </IepAppTabCard>
    <IepAppTabCard title="标签统计">
      <div class="piece-item">
        <span class="name">浏览次数:</span>
        <span class="frequency" v-text="form.views"></span>
      </div>
      <div class="piece-item">
        <span class="name">应用次数:</span>
        <span class="frequency" v-text="form.refers"></span>
      </div>
      <div class="piece-item">
        <span class="name">最近更新:</span>
        <span class="frequency" v-text="form.updateTime"></span>
      </div>
      <div class="piece-item">
        <span class="name">创建者:</span>
        <span class="frequency" v-text="form.creatorRealName"></span>
      </div>
      <div class="icon-item">
        <div class="icon-box" v-for="(item,index) in iconList" :key="index">
          <i :class="item.icon"></i>
          <span v-text="item.iconName"></span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      iconList: [
        { icon: 'icon-shoucang1', iconName: '收藏' },
        { icon: 'icon-share', iconName: '分享' },
        { icon: 'icon-chakantiezigengduojubao', iconName: '纠错' },
        { icon: 'icon-yuanbao', iconName: '打赏' },
        { icon: 'icon-xiaoxi', iconName: '评论' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.piece {
  border-top: 1px solid #eee;
  grid-column-start: 3;
  grid-column-end: 4;
}
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
.piece-item {
  padding: 0 10px;
  color: #888;
  font-size: 14px;
  line-height: 28px;
  .name {
    margin-right: 15px;
  }
  .frequency {
    font-size: 16px;
  }
}
.icon-item {
  display: inline-block;
  margin-top: 20px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  .icon-box:nth-last-child(1) {
    margin-right: 0;
  }
  .icon-box {
    display: inline-block;
    margin-right: 10px;
    padding: 10px;
    i {
      display: block;
      text-align: center;
      font-size: 22px !important;
      color: #333;
    }
    span {
      display: block;
      color: #333;
      font-size: 16px;
    }
  }
}
</style>
<style scoped>
.el-card >>> .title {
  font-size: 18px;
}
</style>