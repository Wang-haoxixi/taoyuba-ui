<template>
  <div class="organization-left">
    <histogram></histogram>
    <project :counts="data.counts"></project>
    <project-switching :orgId="data.orgId"></project-switching>
    <team></team>
    <talent-demand :orgId="data.orgId"></talent-demand>
    <texture-score></texture-score>
  </div>
</template>
<script>
import Histogram from './Histogram'
import Project from './Project'
import ProjectSwitching from './ProjectSwitching/'
import Team from './Team'
import TalentDemand from './TalentDemand'
import TextureScore from './TextureScore'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { Histogram, Project, ProjectSwitching, Team, TalentDemand,TextureScore },
}
</script>
