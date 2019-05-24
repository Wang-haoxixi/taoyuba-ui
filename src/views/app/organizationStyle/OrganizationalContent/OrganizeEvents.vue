<template>
  <div class="organiz-events">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='OrganizeDynamic'" v-slot:OrganizeDynamic>
          <organize-dynamic v-loading="activeTab !=='OrganizeDynamic'"></organize-dynamic>
        </template>
        <template v-if="activeTab ==='Events'" v-slot:Events>
          <events v-loading="activeTab !=='Events'"></events>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import OrganizeDynamic from './OrganizeDynamic'
import Events from './Events'

export default {
  components: {
    OrganizeDynamic,
    Events,
  },
  data () {
    return {
      tabList: [{
        label: '组织动态',
        value: 'OrganizeDynamic',
      }, {
        label: '大事记',
        value: 'Events',
      }],
      activeTab: 'OrganizeDynamic',
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.organiz-events {
  margin-bottom: 30px;
}
</style>
<style scoped>
.organiz-events >>> .el-card__body {
  height: 279px;
}
</style>


