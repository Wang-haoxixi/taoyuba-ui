<template>
  <div class="basic-information">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <el-row>
      <el-col :span="8"><span>模块编号：</span>{{form.number}}</el-col>
      <el-col :span="8"><span>模块分类：</span>
        <iep-dict-detail :value="form.type" dict-name="cpms_module_type"></iep-dict-detail>
      </el-col>
      <el-col :span="8"><span>模块指导价：</span>{{form.guidePrice}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><span>模块优惠价：</span>{{form.preferentialPrice}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><span>详情介绍：</span>{{form.description}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      title: '基础信息',
      number: 'AU8979626',
    }
  },
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
