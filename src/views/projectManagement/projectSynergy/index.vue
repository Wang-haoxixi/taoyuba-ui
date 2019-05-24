<template>
    <gov-layout-main>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="projectDutyDept" placeholder="责任单位" filterable @change="getTaskSynergy" clearable>
            <el-option
              v-for="item in deptOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="projectName" placeholder="项目名称" @change="getTaskSynergy" clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="cut">
        <el-col :span="5">
          <p class="font">责任单位</p>
        </el-col>
        <el-col :span="5">
          <p class="font">项目名称</p>
        </el-col>
        <el-col :span="5">
          <p class="font">部门协同数量</p>
        </el-col>
        <el-col :span="5">
          <p class="font">协同任务数/任务总数</p>
        </el-col>
        <el-col :span="5">
          <p class="font">协同任务完成率</p>
        </el-col>
      </el-row>
      <synergy v-for="(item,index) in synergyData" :key="index" :tableDataAll="item"></synergy>
    </gov-layout-main>
</template>

<script>
import { getDept } from '@/util/dic'
import { getProjectParentForSelect } from '@/api/projectManagement/projectList'
import { taskSynergy } from '@/api/projectManagement/projectTask'
import synergy from './synergy'
export default {
  components:{ synergy },
  data (){
    return{
      projectName: '',
      projectDutyDept: '',
      deptOption: [],
      projectOption: [],
      synergyData: [],
    }
  },
  created () {
    this.getDeptOption()
    this.getTaskSynergy()
  },
  methods: {
    getDeptOption () {
      this.deptOption = getDept()
    },
    getProjectOption () {
      getProjectParentForSelect().then(({data}) =>{
        this.projectOption = data
      })
    },
    getTaskSynergy () {
      var params = {projectDutyDept:this.projectDutyDept,projectName:this.projectName}
      taskSynergy(params).then(({data}) => {
        this.synergyData = data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .font{
    width: 100%;
    text-align: center;
  }
  .cut{
    color: black;
    font-size: 14px;
    margin: 15px 0;
    padding: 5px 0;
    .el-col{
      width: 20%;
      border: 1px solid #9c9c9c;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
