<template>
  <div class="gird-product">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Newest'" v-slot:Newest>
            <newest v-loading="activeTab !=='Newest'">
            </newest>
          </template>
          <template v-if="activeTab ==='Hotest'" v-slot:Hotest>
            <hotest v-loading="activeTab !=='Hotest'"></hotest>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import Newest from './Newest'
import Hotest from './Hotest'
export default {
  components: {
    Newest,
    Hotest,
  },
  data () {
    return {
      showClass: 0,
      linkName: '',
      tabList: [{
        label: '最新',
        value: 'Newest',
      }, {
        label: '最热',
        value: 'Hotest',
      }],
      activeTab: 'Newest',
    }
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-product {
  width: 1200px;
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
</style>
<style scoped>
.gird-product >>> .el-tabs__item {
  font-size: 18px;
}
.gird-product >>> .el-tabs__header {
  margin-bottom: 30px;
}
.gird-product >>> .el-card {
  border: 0;
  padding: 0;
}
.gird-product >>> .el-tabs__content {
  overflow: inherit;
}
</style>

