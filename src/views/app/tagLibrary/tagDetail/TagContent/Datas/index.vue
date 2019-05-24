<template>
  <div class="gird-all">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <!-- <template v-if="activeTab ==='News'" v-slot:News>
            <news v-loading="activeTab !=='News'"></news>
          </template> -->
          <template v-if="activeTab ==='Material'" v-slot:Material>
            <material v-loading="activeTab !=='Material'" :data="data.mlms_materialInfo"></material>
          </template>
          <template v-if="activeTab ==='Meeting'" v-slot:Meeting>
            <meeting v-loading="activeTab !=='Meeting'" :data="data.mlms_meetingSummary"></meeting>
          </template>
          <template v-if="activeTab ==='Project'" v-slot:Project>
            <project v-loading="activeTab !=='Project'" :data="data.iepProjectDetail"></project>
          </template>
          <template v-if="activeTab ==='Organization'" v-slot:Organization>
            <organization v-loading="activeTab !=='Organization'" :data="data.upms_org_tag"></organization>
          </template>
          <!-- <template v-if="activeTab ==='Business'" v-slot:Business>
            <business v-loading="activeTab !=='Business'"></business>
          </template> -->
          <template v-if="activeTab ==='Product'" v-slot:Product>
            <product v-loading="activeTab !=='Product'" :data="data.productDetails"></product>
          </template>
          <!-- <template v-if="activeTab ==='Platform'" v-slot:Platform>
            <platform v-loading="activeTab !=='Platform'"></platform>
          </template> -->
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
// import News from './News'
import Material from './Material'
import Meeting from './Meeting'
import Project from './Project'
import Organization from './Organization'
// import Business from './Business'
import Product from './Product'
// import Platform from './Platform'
import { getRelationsById } from '@/api/tms/tag'
export default {
  components: {
    // News,
    Material,
    Meeting,
    Project,
    Organization,
    // Business,
    Product,
    // Platform,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '材料(30)',
        value: 'Material',
      }, {
        label: '会议(30)',
        value: 'Meeting',
      }, {
        label: '项目(30)',
        value: 'Project',
      }, {
        label: '组织(30)',
        value: 'Organization',
      }, {
        label: '产品(30)',
        value: 'Product',
      }],
      activeTab: 'Material',
      data: {
        mlms_materialInfo: [],
        mlms_meetingSummary: [],
        iepProjectDetail: [],
        upms_org_tag: [],
        productDetails: [],
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      try {
        const { data } = await getRelationsById(this.$route.params.id)
        this.data = this.$mergeByFirst(this.data, data.data)
        this.tabList[0].label = `材料(${this.data.mlms_materialInfo.length})`
        this.tabList[1].label = `会议(${this.data.mlms_meetingSummary.length})`
        this.tabList[2].label = `项目(${this.data.iepProjectDetail.length})`
        this.tabList[3].label = `组织(${this.data.upms_org_tag.length})`
        this.tabList[4].label = `产品(${this.data.productDetails.length})`
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>
<style scoped lang="scss">
</style>
<style scoped>
.gird-all >>> .el-card {
  border: 0;
  padding: 0;
}
.gird-all >>> .el-tabs__item {
  font-size: 18px;
  padding: 0 13px;
}
.gird-all >>> .el-tabs__header {
  margin-bottom: 20px;
}
</style>

