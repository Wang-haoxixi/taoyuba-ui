<template>
  <div class="resources">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Recourses'" v-slot:Recourses>
          <recourses v-loading="activeTab !=='Recourses'"></recourses>
        </template>
        <template v-if="activeTab ==='Products'" v-slot:Products>
          <products v-loading="activeTab !=='Products'"></products>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Recourses from './Recourses'
import Products from './Products'
export default {
  components: {
    Recourses,
    Products,
  },
  data () {
    return {
      tabList: [{
        label: '国脉资源',
        value: 'Recourses',
      }, {
        label: '国脉产品',
        value: 'Products',
      }],
      activeTab: 'Recourses',
    }
  },
}
</script>

