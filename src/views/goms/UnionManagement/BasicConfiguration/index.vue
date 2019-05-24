<template>
  <div>
    <basic-container>
      <page-header title="联盟基本信息"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='UnionInformation'" v-slot:UnionInformation>
          <union-information v-loading="activeTab !=='UnionInformation'"></union-information>
        </template>
        <template v-if="activeTab ==='UnionModule'" v-slot:UnionModule>
          <union-module v-loading="activeTab !=='UnionModule'"></union-module>
        </template>
        <template v-if="activeTab ==='UnionSettings'" v-slot:UnionSettings>
          <union-settings v-loading="activeTab !=='UnionSettings'"></union-settings>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import UnionInformation from './UnionInformation/'
import UnionModule from './UnionModule/'
import UnionSettings from './UnionSettings/'
export default {
  components: { UnionInformation, UnionModule, UnionSettings },
  data () {
    return {
      tabList: [{
        label: '联盟信息',
        value: 'UnionInformation',
      }, {
        label: '联盟模块',
        value: 'UnionModule',
      }, {
        label: '联盟设置',
        value: 'UnionSettings',
      }],
      activeTab: 'UnionInformation',
    }
  },
}
</script>
