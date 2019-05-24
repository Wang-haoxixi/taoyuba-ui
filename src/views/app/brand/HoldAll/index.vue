<template>
  <div class="grid-content">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Tools'" v-slot:Tools>
          <tools v-loading="activeTab !=='Tools'"></tools>
        </template>
        <template v-if="activeTab ==='Resource'" v-slot:Resource>
          <resource v-loading="activeTab !=='Resource'"></resource>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Tools from './Tools'
import Resource from './Resource'
export default {
  components: {
    Tools,
    Resource,
  },
  data () {
    return {
      tabList: [{
        label: '工具箱',
        value: 'Tools',
      }, {
        label: '文献渠道',
        value: 'Resource',
      }],
      activeTab: 'Tools',
    }
  },
}
</script>
<style scoped>
.grid-content {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>

