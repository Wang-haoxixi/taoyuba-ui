<template>
  <div class="team">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='TeamDemeanor'" v-slot:TeamDemeanor>
          <team-demeanor v-loading="activeTab !=='TeamDemeanor'"></team-demeanor>
        </template>
        <template v-if="activeTab ==='Honor'" v-slot:Honor>
          <honor v-loading="activeTab !=='Honor'"></honor>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import TeamDemeanor from './TeamDemeanor'
import Honor from './Honor'

export default {
  components: {
    TeamDemeanor,
    Honor,
  },
  data () {
    return {
      tabList: [{
        label: '团队风采',
        value: 'TeamDemeanor',
      }, {
        label: '荣誉',
        value: 'Honor',
      }],
      activeTab: 'TeamDemeanor',
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.team {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  margin: 30px 0;
}
</style>
<style scoped>
.team >>> .el-card__body {
  padding: 2px 0 30px;
}
</style>


