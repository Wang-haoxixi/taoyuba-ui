<template>
  <div>
    <basic-container>
      <div class="container-grid">
        <financial-assets></financial-assets>
        <processing></processing>
        <project-accounting></project-accounting>
        <org-in-out></org-in-out>
        <distribution-funds></distribution-funds>
      </div>
    </basic-container>
  </div>
</template>
<script>
import FinancialAssets from './FinancialAssets'
import Processing from './Processing'
import ProjectAccounting from './ProjectAccounting'
import OrgInOut from './OrgInOut'
import DistributionFunds from './DistributionFunds'
export default {
  components: {
    FinancialAssets,
    Processing,
    ProjectAccounting,
    OrgInOut,
    DistributionFunds,
  },
}
</script>
<style lang="scss" scoped>
.container-grid {
  display: grid;
  grid-row-gap: 20px;
}
</style>
