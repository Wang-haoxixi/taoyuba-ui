<template>
  <div>
    <basic-container>
      <page-header title="我的审批" :data="[10 ,5]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ExaminApproval'" v-slot:ExaminApproval>
          <examin-approval v-loading="activeTab !=='ExaminApproval'"></examin-approval>
        </template>
        <template v-if="activeTab ==='AlreadyApproval'" v-slot:AlreadyApproval>
          <already-approval v-loading="activeTab !=='AlreadyApproval'"></already-approval>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import ExaminApproval from './ExaminApproval/'
import AlreadyApproval from './AlreadyApproval/'
export default {
  components: { ExaminApproval, AlreadyApproval },
  data () {
    return {
      tabList: [{
        label: '待我审批',
        value: 'ExaminApproval',
      }, {
        label: '我已审批',
        value: 'AlreadyApproval',
      }],
      activeTab: 'ExaminApproval',
    }
  },
}
</script>
