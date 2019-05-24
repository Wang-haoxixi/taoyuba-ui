<template>
  <div class="wonderful">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Organization'" v-slot:Organization>
          <organization v-loading="activeTab !=='Organization'"></organization>
        </template>
        <template v-if="activeTab ==='Empolyee'" v-slot:Empolyee>
          <empolyee v-loading="activeTab !=='Empolyee'"></empolyee>
        </template>
        <template v-if="activeTab ==='Specialist'" v-slot:Specialist>
          <specialist v-loading="activeTab !=='Specialist'"></specialist>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Organization from './Organization'
import Empolyee from './Empolyee'
import Specialist from './Specialist'

export default {
  components: {
    Organization,
    Empolyee,
    Specialist,
  },
  data () {
    return {
      tabList: [{
        label: '组织风采(35)',
        value: 'Organization',
      }, {
        label: '员工风采(519)',
        value: 'Empolyee',
      }, {
        label: '专家风采(75)',
        value: 'Specialist',
      }],
      activeTab: 'Organization',
      linkName: '/app/organization_style',
    }
  },
}
</script>
<style lang="scss" scoped>
.wonderful {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
}
</style>


