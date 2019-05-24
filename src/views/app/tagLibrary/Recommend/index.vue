<template>
  <div class="gird-recommend">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <span class="btn" @click="handleChangeBatch">换一批</span>
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='RecommendTags'" v-slot:RecommendTags>
            <recommend-tags ref="recommendTags" v-loading="activeTab !=='RecommendTags'"></recommend-tags>
          </template>
          <template v-if="activeTab ==='AddTags'" v-slot:AddTags>
            <add-tags v-loading="activeTab !=='AddTags'"></add-tags>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import AddTags from './AddTags'
import RecommendTags from './RecommendTags'
export default {
  components: {
    RecommendTags,
    AddTags,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '推荐标签',
        value: 'RecommendTags',
      }, {
        label: '本周新增(430)',
        value: 'AddTags',
      }],
      activeTab: 'RecommendTags',
    }
  },
  methods: {
    handleChangeBatch () {
      this.$refs['recommendTags'].selectIdx = 1 - this.$refs['recommendTags'].selectIdx
    },
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-recommend {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    grid-column-start: 1;
    grid-column-end: 4;
  }
}
.btn {
  cursor: pointer;
  line-height: 48px;
  position: absolute;
  right: 20px;
  top: 12px;
  color: #999;
  z-index: 3;
}
</style>
<style scoped>
.gird-recommend >>> .el-card {
  border: 0;
}
.gird-recommend >>> .el-tabs__item {
  font-size: 18px;
}
.gird-recommend >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>

