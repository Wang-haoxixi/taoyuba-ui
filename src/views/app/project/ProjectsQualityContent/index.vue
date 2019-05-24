<template>
  <div class="gov-person-content">
    <div class="top-content">
      <busines-system></busines-system>
      <institutional></institutional>
      <construction-project></construction-project>
      <recommendable></recommendable>
      <project-manager></project-manager>
      <manager-ranking></manager-ranking>
    </div>
    <div class="copies">
      <customer-rsources></customer-rsources>
      <market-opportunity></market-opportunity>
      <project-resources></project-resources>
      <internal-expert></internal-expert>
      <project-quality></project-quality>
      <quality-control></quality-control>
    </div>
    <div class="block">
      <team-style></team-style>
    </div>
    <div class="copies copies2">
      <experience-training></experience-training>
      <feedback></feedback>
      <reward></reward>
    </div>
  </div>
</template>
<script>
import BusinesSystem from './BusinesSystem'
import Institutional from './Institutional'
import ConstructionProject from './ConstructionProject'
import Recommendable from './Recommendable'
import ProjectManager from './ProjectManager'
import ManagerRanking from './ManagerRanking'
import CustomerRsources from './CustomerRsources'
import MarketOpportunity from './MarketOpportunity'
import ProjectResources from './ProjectResources'
import InternalExpert from './InternalExpert'
import ProjectQuality from './ProjectQuality'
import QualityControl from './QualityControl'
import TeamStyle from './TeamStyle'
import ExperienceTraining from './ExperienceTraining'
import Feedback from './Feedback'
import Reward from './Reward'
export default {
  components: { BusinesSystem, Institutional, ConstructionProject, Recommendable, ProjectManager, ManagerRanking, CustomerRsources, MarketOpportunity, ProjectResources, InternalExpert, ProjectQuality, QualityControl, TeamStyle, ExperienceTraining, Feedback, Reward },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.gov-person-content {
  margin: 0 auto;
  width: 1200px;
  .top-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  }
  .block {
    margin-top: 25px;
    width: 100%;
  }
  .copies {
    display: grid;
    margin-top: 25px;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 4fr) minmax(
        100px,
        2fr
      );
  }
  .copies2 {
    margin-bottom: 25px;
  }
}
</style>

