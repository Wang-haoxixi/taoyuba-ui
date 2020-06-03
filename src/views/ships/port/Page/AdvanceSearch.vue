<template>
  <el-form :model="form" label-width="120px" size="mini">
    <el-form-item label="港口名称：">
      <el-input v-model="form.portName"></el-input>
    </el-form-item>
    <el-form-item label="港口地址:">
        <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="港口区域：">
      <el-select 
            v-model="form.provinceId"
            @change="choseProvince(form.provinceId)"
            style="width: 33%!important" 
            size="small" 
            placeholder="省">
              <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.areaCode" prop="provinceId"
              >
              </el-option>
            </el-select>
            <el-select
                v-model="form.cityId"
                @change="choseCity(form.cityId)"
                placeholder="市" style="width: 33%!important" size="small" >
                <el-option
                v-for="item in city"
                :key="item.id"
                :label="item.name"
                :value="item.areaCode" prop="cityId">
                </el-option>
            </el-select>
            <el-select
                v-model="form.districtId"
                placeholder="区" style="width: 33%!important" size="small" >
                <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="item.areaCode" prop="districtId">
                </el-option>
            </el-select>
    </el-form-item>
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm, toDtoSearchForm } from '../options'
export default {
  data () {
    return {
      form: initSearchForm(),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
      // this.$emit('clear-search-param')
    },
  },
}
</script>
