<template>
  <div>
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div>
        <p class="about-text">国脉集团是中国领先的大数据治理和数据服务专业机构。创新提出“软件+咨询+平台+数据+创新...</p>
        <div class="about-list">
          <div v-for="item in dataList" :key="item" class="piece">
            {{item}}
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '关于国脉',
      dataList: ['集团概况', '企业文化', '组织机构', '专家团队', '发展历程', '业务领域'],
      // 更多的跳转地址
      linkName: '/app/alliance_details',
    }
  },
}
</script>
<style lang="scss" scoped>
.about-text {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.about-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    color: #333;
    &:hover {
      background-color: #cb3737;
      color: #fff;
    }
  }
}
</style>
