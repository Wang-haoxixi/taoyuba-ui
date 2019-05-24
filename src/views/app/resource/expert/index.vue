<template>
  <div class="gird-expert">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Person'" v-slot:Person>
            <person v-loading="activeTab !=='Person'"></person>
          </template>
          <template v-if="activeTab ==='Expert'" v-slot:Expert style="letter-spacing:18px;">
            <expert v-loading="activeTab !=='Expert'"></expert>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import Person from './Person'
import Expert from './Expert'
export default {
  components: {
    Person,
    Expert,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '国脉人',
        value: 'Person',
      }, {
        label: '专家',
        value: 'Expert',
      }],
      activeTab: 'Expert',
    }
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-expert {
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
.gird-expert >>> .el-card {
  border: 0;
}
.gird-expert >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.gird-expert >>> .el-tabs__item {
  font-size: 18px;
}
.gird-expert >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>

