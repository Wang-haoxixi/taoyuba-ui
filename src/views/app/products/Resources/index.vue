<template>
  <div class="resources">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Learning'" v-slot:Learning>
          <learning v-loading="activeTab !=='Learning'"></learning>
        </template>
        <template v-if="activeTab ==='Tool'" v-slot:Tool>
          <tool v-loading="activeTab !=='Tool'"></tool>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Learning from './Learning'
import Tool from './Tool'
export default {
  components: {
    Learning,
    Tool,
  },
  data () {
    return {
      tabList: [{
        label: '学习资源',
        value: 'Learning',
      }, {
        label: '工具箱',
        value: 'Tool',
      }],
      activeTab: 'Learning',
    }
  },
}
</script>

