<template>
  <div class="myCustom">
    <el-row>
      <info-column></info-column>
    </el-row>
    <el-row class="info-middle">
      <el-col :span="12">
        <survey-column></survey-column>
        <remind-column></remind-column>
      </el-col>
      <el-col :span="12">
        <contract-colmun></contract-colmun>
      </el-col>
    </el-row>
    <el-row>
      <custom-column></custom-column>
    </el-row>
  </div>
</template>

<script>
import InfoColumn from './Components/InfoColumn'
import SurveyColumn from './Components/SurveyColumn'
import RemindColumn from './Components/RemindColumn'
import ContractColmun from './Components/ContractColumn'
import CustomColumn from './Components/CustomColumn'
export default {
  name: 'myCustom',
  components: { InfoColumn, SurveyColumn, RemindColumn, ContractColmun, CustomColumn },
  data () {
    return {
    }
  },
}
</script>
<style scoped>
.myCustom .el-row {
  margin-bottom: 20px;
}
</style>

