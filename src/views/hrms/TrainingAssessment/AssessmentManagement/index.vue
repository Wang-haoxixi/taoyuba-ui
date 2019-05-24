<template>
  <iep-to-dev></iep-to-dev>
  <!-- <div>
    <basic-container>
      <page-header title="绩效考核" :replaceText="replaceText" :data="[120]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AssessManagement'" v-slot:AssessManagement>
          <assess-management v-loading="activeTab !=='AssessManagement'"></assess-management>
        </template>
        <template v-if="activeTab ==='AssessModule'" v-slot:AssessModule>
          <assess-module v-loading="activeTab !=='AssessModule'"></assess-module>
        </template>
      </iep-tabs>
    </basic-container>
  </div> -->
</template>
<script>
// import AssessManagement from './AssessManagement/'
// import AssessModule from './AssessModule/'
export default {
  // components: { AssessManagement, AssessModule },
  data () {
    return {
      replaceText: (data) => `（共有${data[0]}条绩效考核记录）`,
      tabList: [{
        label: '考核管理',
        value: 'AssessManagement',
      }, {
        label: '考核模块',
        value: 'AssessModule',
      }],
      activeTab: 'AssessManagement',
    }
  },
}
</script>
