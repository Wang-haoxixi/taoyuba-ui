<template>
  <div class="project-switching">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Projects'" v-slot:Projects>
          <projects v-loading="activeTab !=='Projects'" :orgId="orgId"></projects>
        </template>
        <template v-if="activeTab ==='Customer'" v-slot:Customer>
          <customer v-loading="activeTab !=='Customer'" :orgId="orgId"></customer>
        </template>
        <template v-if="activeTab ==='Programme'" v-slot:Programme>
          <programme v-loading="activeTab !=='Programme'" :orgId="orgId"></programme>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Projects from './Projects'
import Customer from './Customer'
import Programme from './Programme'

export default {
  props: {
    orgId: {
      type: Number,
    },
  },
  components: {
    Projects,
    Customer,
    Programme,
  },
  data () {
    return {
      tabList: [{
        label: '项目',
        value: 'Projects',
      }, {
        label: '客户',
        value: 'Customer',
      }, {
        label: '方案',
        value: 'Programme',
      }],
      activeTab: '',
      linkName: '',
    }
  },
  watch: {
    orgId (newVal) {
      if (newVal) this.activeTab = 'Projects'
    },
  },
}
</script>
<style lang="scss" scoped>
.project-switching {
  margin-bottom: 30px;
}
</style>


