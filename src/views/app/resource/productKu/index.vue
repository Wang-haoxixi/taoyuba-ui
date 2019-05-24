<template>
  <div class="gird-product">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Module'" v-slot:Module>
            <module v-loading="activeTab !=='Module'"></module>
          </template>
          <template v-if="activeTab ==='Customized'" v-slot:Customized>
            <customized v-loading="activeTab !=='Customized'"></customized>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import Module from './Module'
import Customized from './Customized'
export default {
  components: {
    Module,
    Customized,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '按模块',
        value: 'Module',
      }, {
        label: '按产品',
        value: 'Customized',
      }],
      activeTab: 'Module',
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
  padding: 0 0 25px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
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
.gird-product >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.gird-product >>> .el-tabs__item {
  font-size: 18px;
}
.gird-product >>> .el-tabs__header {
  margin-bottom: 30px;
}
.gird-product >>> .el-card {
  border: 0;
}
</style>

