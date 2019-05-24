<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search
          @search="searchPage"
          @closed="dialogIsShow = true"
          advanceSearch
          place-holder="请输入项目名称"
          :dialogIsShow="dialogIsShow"
        >
          <!--title-->
          <el-row class="search">
            <el-col :span="23">
              <strong>高级搜索</strong>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <el-col :span="23" :pull="2">
            <el-form :model="paramForm" label-width="120px" size="mini">
              <el-form-item label="项目名称:">
                <el-input v-model="paramForm.name" placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="编号:">
                <el-input v-model="paramForm.num" placeholder="请输入编号"></el-input>
              </el-form-item>
              <el-form-item label="申请类别:">
                <el-select v-model="paramForm.ApplicationCategory" filterable placeholder="请选择申请类别">
                  <el-option
                    v-for="item in undertakeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请人:">
                <el-input v-model="paramForm.Applicant" placeholder="请输入申请人"></el-input>
              </el-form-item>
              <el-form-item label="审批人:">
                <el-input v-model="paramForm.Approver" placeholder="请输入审批人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-col :span="12">
                  <el-button type="info" @click="onSubmit">搜索</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button>取消</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
        </operation-search>
      </template>
    </operation-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { undertakeOptions,paramForm } from './const.js'
export default {
  mixins:[mixins],
  data (){
    return{
      undertakeOptions,
      paramForm,
      dialogIsShow: true,
    }
  },
  methods:{
    searchPage (name) {
      if (name) {
        this.paramForm.name = name
      }
      console.log(this.paramForm)
      // console.log(this.paramForm)
      // 搜索完成后
      // this.paramForm.name = ''
    },
    onSubmit (){
      
    },
  },
}
</script>


<style scoped>
.search {
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
}
</style>
