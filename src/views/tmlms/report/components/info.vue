<template>
  <div>
    <el-form label-width="120px" disabled>
      <el-row>
        <el-col :span="12">
          <el-form-item label="船名号">
          <el-input v-model="value.shipName"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渔船编码">
            <el-input v-model="value.shipNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="船体材质">
            <el-select v-model="value.hullMaterial" placeholder="">
              <el-option :label="item.label" :value="item.value" v-for="item in mapHullMaterial" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作业方式">
            <el-select v-model="value.workMode" placeholder="">
              <el-option :label="item.label" :value="item.value" v-for="item in mapWorkMode" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="船长">
            <el-input v-model="value.hullLength"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="型深">
            <el-input v-model="value.mouldedDepth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="型宽">
            <el-input v-model="value.mouldedBreadth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="双控功率（KW)">
            <el-input v-model="value.dualPower"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主机型号">
            <el-input v-model="value.mainEngineModel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建造完工日期">
            <el-input v-model="value.buildDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: Object,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['dictGroup']),
    mapHullMaterial () {
      let result = []
      if (this.dictGroup && this.dictGroup['tyb_ship_material']) {
        result = this.dictGroup['tyb_ship_material']
      }
      return result
    },
    mapWorkMode () {
      let result = []
      if (this.dictGroup && this.dictGroup['tyb_resume_worktype']) {
        result = this.dictGroup['tyb_resume_worktype']
      }
      return result
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>