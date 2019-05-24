<template>
  <div class="allCustom">
    <info-column></info-column>
    <register-column></register-column>
    <visit-column></visit-column>
    <money-column></money-column>
    <analyse-column></analyse-column>
  </div>
</template>

<script>
import InfoColumn from './InfoColumn/'
import RegisterColumn from './RegisterColumn/'
import VisitColumn from './VisitColumn/'
import MoneyColumn from './MoneyColumn/'
import AnalyseColumn from './AnalyseColumn/'
export default {
  name: 'allCustom',
  components: { InfoColumn, RegisterColumn, VisitColumn, MoneyColumn, AnalyseColumn },
}
</script>
<style scoped>
.allCustom > div {
  margin-bottom: 20px;
}
</style>

