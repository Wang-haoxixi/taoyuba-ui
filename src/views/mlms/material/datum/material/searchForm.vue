<template>
  <operation-search @search-page="searchPage" :paramForm="paramForm" advance-search>
    <el-form :model="paramForm" label-width="80px" size="small">
      <el-form-item label="材料名称">
        <el-input v-model="paramForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <div class="Classes">
          <div class="first">
            <el-select v-model="paramForm.materialClsFirstClass" placeholder="请选择" @change="firstClassChange">
              <el-option v-for="item in firstClass" :key="item.id" :label="item.levelName" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="second">
            <el-select v-model="paramForm.materialClsSecondClass" placeholder="请选择">
              <el-option v-for="item in secondClass" :key="item.id" :label="item.levelName" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="材料类型">
        <iep-dict-select v-model="paramForm.materialType" dict-name="mlms_material_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="材料格式">
        <el-input v-model="paramForm.format"></el-input>
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="paramForm.downloadCost">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传人">
        <el-input v-model="paramForm.creatorRealName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage()">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </operation-search>
</template>

<script>
import { getConfigureTree } from '@/api/mlms/material/datum/configure'
import { initSearchForm } from './option'

export default {
  data () {
    return {
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
    }
  },
  methods: {
    searchPage (val) {
      let obj = val ? val : this.paramForm
      this.$emit('searchPage', obj)
    },
    // 分类配置
    firstClassChange (val) {
      this.paramForm.materialClsSecondClass = ''
      for (let item of this.firstClass) {
        if (item.id == val) {
          this.secondClass = item.childrens
          return
        }
      }
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
  },
  created () {
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.Classes {
  display: flex;
  justify-content: space-between;
  .first, .second {
    width: 49%;
  }
}
</style>
