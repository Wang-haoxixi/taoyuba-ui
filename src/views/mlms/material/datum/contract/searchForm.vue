<template>
  <operation-search @search-page="searchPage" :paramForm="paramForm" prop="contractName" advance-search>
    <el-form :model="paramForm" label-width="100px" size="small">
      <el-form-item label="合同名称">
        <el-input v-model="paramForm.contractName"></el-input>
      </el-form-item>
      <el-form-item label="市场经理">
        <el-input v-model="paramForm.directorRealName"></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <div class="business-type">
          <div class="half">
            <el-select v-model="paramForm.businessTypeFirst" placeholder="请选择" @change="changeBusinessType">
              <el-option v-for="(item, index) in dictGroup.prms_business_type" :key="item.value" :label="item.label" :value="index"></el-option>
            </el-select>
          </div>
          <div class="half">
            <el-select v-model="paramForm.businessType" placeholder="请选择">
              <el-option v-for="item in businessTypeChildren" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="合同级别">
        <iep-dict-select v-model="paramForm.contractLevel" dict-name="mlms_contract_level"></iep-dict-select>
      </el-form-item>
      <el-form-item label="合同状态">
        <iep-dict-select v-model="paramForm.contractStatus" dict-name="mlms_contract_status"></iep-dict-select>
      </el-form-item>
      <el-form-item label="签署组织">
        <el-input v-model="paramForm.signDeptName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="签订日期">
        <IepDatePicker v-model="paramForm.signTime"></IepDatePicker>
      </el-form-item> -->
      <el-form-item label="签署开始时间">
        <el-date-picker v-model="paramForm.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="签署结束时间">
        <el-date-picker v-model="paramForm.endTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="paramForm.contractType" placeholder="请选择">
          <el-option label="内部合同" value="0"></el-option>
          <el-option label="外部合同" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage()">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </operation-search>
</template>

<script>
import { initSearchForm } from './option'
import { mapGetters } from 'vuex'

export default {
  components: {  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  data () {
    return {
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
      businessTypeChildren: [],
    }
  },
  methods: {
    searchPage (val) {
      let obj = val ? val : this.paramForm
      this.$emit('searchPage', obj)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    changeBusinessType (val) {
      this.paramForm.businessType = ''
      if (val !== '') {
        this.businessTypeChildren = this.dictGroup.prms_business_type[val].children
      } else {
        this.businessTypeChildren = []
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.business-type {
  display: flex;
  justify-content: space-between;
  .half {
    width: 49%;
  }
}
</style>
