<template>
  <div class="gird-all">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <el-radio-group v-model="descs" size="small" class="btn">
          <el-radio-button label="views">按热度</el-radio-button>
          <el-radio-button label="refers">按应用</el-radio-button>
        </el-radio-group>
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='All'" v-slot:All>
            <all v-loading="activeTab !=='All'" :descs="descs"></all>
          </template>
          <template v-if="activeTab ==='OrgTags'" v-slot:OrgTags>
            <org-tags v-loading="activeTab !=='OrgTags'"></org-tags>
          </template>
          <template v-if="activeTab ==='IndustryTag'" v-slot:IndustryTag>
            <industry-tag v-loading="activeTab !=='IndustryTag'"></industry-tag>
          </template>
          <template v-if="activeTab ==='BusinessTags'" v-slot:BusinessTags>
            <business-tags v-loading="activeTab !=='BusinessTags'"></business-tags>
          </template>
          <template v-if="activeTab ==='SkillTags'" v-slot:SkillTags>
            <skill-tags v-loading="activeTab !=='SkillTags'"></skill-tags>
          </template>
          <template v-if="activeTab ==='CompreTags'" v-slot:CompreTags>
            <compre-tags v-loading="activeTab !=='CompreTags'"></compre-tags>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import All from './All'
import OrgTags from './OrgTags'
import IndustryTag from './IndustryTag'
import BusinessTags from './BusinessTags'
import SkillTags from './SkillTags'
import CompreTags from './CompreTags'
export default {
  components: {
    All,
    OrgTags,
    IndustryTag,
    BusinessTags,
    SkillTags,
    CompreTags,
  },
  data () {
    return {
      linkName: '',
      descs: '',
      tabList: [{
        label: '所有标签(430)',
        value: 'All',
      }, {
        label: '组织运维类(30)',
        value: 'OrgTags',
      }, {
        label: '行业知识类(30)',
        value: 'IndustryTag',
      }, {
        label: '业务技能类(30)',
        value: 'BusinessTags',
      }, {
        label: '技术能力类(30)',
        value: 'SkillTags',
      }, {
        label: '综合类(30)',
        value: 'CompreTags',
      }],
      activeTab: 'All',
    }
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-all {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    grid-column-start: 1;
    grid-column-end: 4;
  }
}
.btn {
  line-height: 48px;
  position: absolute;
  right: 20px;
  top: 4px;
  color: #333;
  z-index: 3;
}
</style>
<style scoped>
.gird-all >>> .el-card {
  border: 0;
}
.gird-all >>> .el-tabs__item {
  font-size: 18px;
}
.gird-all >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>

