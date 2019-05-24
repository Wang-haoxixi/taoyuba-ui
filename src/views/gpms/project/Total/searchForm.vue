<template>
  <el-form :model="paramForm" label-width="120px" size="mini">
    <!--项目名称-->
    <el-form-item label="项目名称:">
      <el-input v-model="paramForm.name" placeholder="请输入项目名称"></el-input>
    </el-form-item>
    <!--项目阶段-->
    <el-form-item label="项目阶段:">
      <el-select v-model="paramForm.stage" placeholder="请选择项目阶段">
        <el-option
          v-for="item in stageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--项目类型-->
    <el-form-item label="项目类型:">
      <el-select v-model="paramForm.protype" placeholder="请选择项目类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--业务类型-->
    <el-form-item label="业务类型:">
      <el-select v-model="paramForm.bustype" placeholder="请选择业务类型">
        <el-option
          v-for="item in bustypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--项目预算（万元）-->
    <el-form-item label="项目预算(万元):">
      <el-input v-model="paramForm.budget.num1" placeholder="请输入数字" class="num"></el-input>-
      <el-input v-model="paramForm.budget.num2" placeholder="请输入数字" class="num"></el-input>
    </el-form-item>
    <!--合同金额(元)-->
    <el-form-item label="合同金额(元):">
      <el-input v-model="paramForm.pact.num1" placeholder="请输入数字" class="num"></el-input>-
      <el-input v-model="paramForm.pact.num2" placeholder="请输入数字" class="num"></el-input>
    </el-form-item>
    <!--市场经理-->
    <el-form-item label="市场经理:">
      <el-input v-model="paramForm.manager" placeholder="请输入市场经理姓名"></el-input>
    </el-form-item>
    <!--项目指导人-->
    <el-form-item label="项目指导人:">
      <el-input v-model="paramForm.guide" placeholder="请输入项目指导人姓名"></el-input>
    </el-form-item>
    <!--是否关联产品-->
    <el-form-item label="是否关联产品:">
      <el-select v-model="paramForm.relevancy" placeholder="请选择是否关联产品">
        <el-option
          v-for="item in isRelevOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--承接部门-->
    <el-form-item label="承接部门:">
      <el-select v-model="paramForm.carry" filterable placeholder="请选择承接部门">
        <el-option
          v-for="item in undertakeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--合作部门-->
    <el-form-item label="合作部门:">
      <el-select v-model="paramForm.join" filterable placeholder="请选择合作部门">
        <el-option
          v-for="item in undertakeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--发布时间-->
    <el-form-item label="发布时间:">
      <el-row>
        <el-col :span="12" class="smallcol">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="paramForm.time.opentime"></el-date-picker>
        </el-col>
        <el-col :span="1">
          -
        </el-col>
        <el-col :span="11" class="smallcol">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="paramForm.time.closetime"></el-date-picker>
        </el-col>
      </el-row>
    </el-form-item>
    <!--发布人-->
    <el-form-item label="发布人:">
      <el-input v-model="paramForm.issue" placeholder="请输入发布人姓名"></el-input>
    </el-form-item>
    <!--按钮组-->
    <el-form-item>
      <el-button-group>
        <el-button size="small" class="searchbot" type="primary" @click="searchPage">搜索</el-button>
        <el-button size="small" @click="closeDialog">取消</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'search',
  methods: {
    
  },
}
</script>
