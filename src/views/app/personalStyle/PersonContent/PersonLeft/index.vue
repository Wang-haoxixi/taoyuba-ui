<template>
  <div>
    <div class="person-list">
      <IepAppTabsCard>
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Newest'" v-slot:Newest>
            <newest v-loading="activeTab !=='Newest'"></newest>
          </template>
          <template v-if="activeTab ==='Project'" v-slot:Project>
            <project v-loading="activeTab !=='Project'"></project>
          </template>
          <template v-if="activeTab ==='Material'" v-slot:Material>
            <material v-loading="activeTab !=='Material'"></material>
          </template>
          <template v-if="activeTab ==='Train'" v-slot:Train>
            <train v-loading="activeTab !=='Train'"></train>
          </template>
          <template v-if="activeTab ==='News'" v-slot:News>
            <news v-loading="activeTab !=='News'"></news>
          </template>
          <template v-if="activeTab ==='Customer'" v-slot:Customer>
            <customer v-loading="activeTab !=='Customer'"></customer>
          </template>
          <template v-if="activeTab ==='Business'" v-slot:Business>
            <business v-loading="activeTab !=='Business'"></business>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
    <new-down></new-down>
  </div>
</template>
<script>
import Newest from './Newest'
import Project from './Project'
import Material from './Material'
import Train from './Train'
import News from './News'
import Customer from './Customer'
import Business from './Business'
import NewDown from './NewDown'
export default {
  components: {
    Newest,
    Project,
    Material,
    Train,
    News,
    Customer,
    Business,
    NewDown,
  },
  data () {
    return {
      tabList: [{
        label: '最新(344)',
        value: 'Newest',
      },
      {
        label: '项目(32)',
        value: 'Project',
      },
      {
        label: '材料(85)',
        value: 'Material',
      },
      {
        label: '培训(15)',
        value: 'Train',
      },
      {
        label: '新闻(25)',
        value: 'News',
      },
      {
        label: '客户(59)',
        value: 'Customer',
      },
      {
        label: '商机(15)',
        value: 'Business',
      },
      ],
      activeTab: 'Newest',
    }
  },
}
</script>
<style lang="scss" scoped>
.person-list {
  margin-bottom: 30px;
}
</style>
