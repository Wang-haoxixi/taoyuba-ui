<template>
  <div class="basic-information">
    <div class="title">
      <div>基本信息</div>
    </div>
    <el-row>
      <el-col :span="12"><span>技术编号：</span>{{form.number}}</el-col>
      <el-col :span="12"><span>负责人：</span>{{form.userRelationCharges.map(m => m.name).join('、')}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><span>英文名称：</span>{{form.englishName}}</el-col>
      <el-col :span="12" style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;"><span>简单介绍：</span>{{form.synopsis}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><span>详情介绍：</span>{{form.description}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['form'],
}
</script>
<style lang="scss" scoped>
.basic-information {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
  .title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
  .el-col {
    line-height: 30px;
    > span {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
<style scoped>
</style>
