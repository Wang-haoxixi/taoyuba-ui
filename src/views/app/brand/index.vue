<template>
  <div>
    <brand-header></brand-header>
    <brand-info></brand-info>
    <div class="gird-brand">
      <brand-banner></brand-banner>
      <brand-ten></brand-ten>
      <focus-news></focus-news>
      <about-gov></about-gov>
      <brand-meeting></brand-meeting>
      <brand-introduce></brand-introduce>
      <adver-resources></adver-resources>
      <user-resources></user-resources>
      <brand-ranking></brand-ranking>
      <brand-logo></brand-logo>
      <research-institute></research-institute>
      <brand-expert></brand-expert>
      <brand-result></brand-result>
      <brand-video></brand-video>
      <brand-certificates></brand-certificates>
      <hold-all></hold-all>
      <data-base></data-base>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import BrandHeader from './BrandHeader'
import BrandInfo from './BrandInfo'
import BrandBanner from './BrandBanner'
import BrandTen from './BrandTenLinkOne'
import FocusNews from './FocusNews'
import AboutGov from './AboutGov'
import BrandIntroduce from './BrandIntroduce'
import BrandMeeting from './BrandMeeting'
import AdverResources from './AdverResources'
import UserResources from './UserResources'
import BrandRanking from './BrandRanking'
import BrandLogo from './BrandLogo'
import ResearchInstitute from './ResearchInstitute'
import BrandExpert from './BrandExpert'
import BrandResult from './BrandResult'
import BrandVideo from './BrandVideo'
import BrandCertificates from './BrandCertificates'
import HoldAll from './HoldAll'
import DataBase from './DataBase'
export default {
  components: {
    BrandHeader,
    BrandInfo,
    BrandBanner,
    BrandTen,
    FocusNews,
    AboutGov,
    BrandIntroduce,
    BrandMeeting,
    AdverResources,
    UserResources,
    BrandRanking,
    BrandLogo,
    ResearchInstitute,
    BrandExpert,
    BrandResult,
    BrandVideo,
    BrandCertificates,
    HoldAll,
    DataBase,
  },
  data () {
    return {
    }
  },
  created () {
    this.$notify({
      title: '注意',
      message: '此页面正在开发中，当前数据仅供参考。',
      offset: 60,
    })
  },
}
</script>
<style lang="scss" scoped>
.gird-brand {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 32fr) minmax(100px, 55fr) minmax(
      100px,
      32fr
    );
}
.el-tabs__item {
  padding: 0 15px;
  line-height: 18px;
}
</style>
