<template>
  <div>
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='BasicInformation'" v-slot:BasicInformation>
          <basic-information v-loading="activeTab !=='BasicInformation'"></basic-information>
        </template>
        <template v-if="activeTab ==='Memorabilia'" v-slot:Memorabilia>
          <memorabilia v-loading="activeTab !=='Memorabilia'"></memorabilia>
        </template>
        <template v-if="activeTab ==='Album'" v-slot:Album>
          <album v-loading="activeTab !=='Album'"></album>
        </template>
        <template v-if="activeTab ==='EvaluationManagement'" v-slot:EvaluationManagement>
          <evaluation-management v-loading="activeTab !=='EvaluationManagement'"></evaluation-management>
        </template>
        <template v-if="activeTab ==='Suggest'" v-slot:Suggest>
          <suggest v-loading="activeTab !=='Suggest'"></suggest>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import BasicInformation from './BasicInformation/'
import Memorabilia from './Memorabilia/'
import Album from './Album/'
import EvaluationManagement from './EvaluationManagement/'
import Suggest from './Suggest/'
export default {
  components: { BasicInformation, Memorabilia, Album, EvaluationManagement, Suggest },
  data () {
    return {
      tabList: [{
        label: '组织基本信息',
        value: 'BasicInformation',
      }, {
        label: '组织大事记',
        value: 'Memorabilia',
      }, {
        label: '组织相册',
        value: 'Album',
      }, {
        label: '评价管理',
        value: 'EvaluationManagement',
      }, {
        label: '建议',
        value: 'Suggest',
      }],
      activeTab: 'BasicInformation',
    }
  },
}
</script>
