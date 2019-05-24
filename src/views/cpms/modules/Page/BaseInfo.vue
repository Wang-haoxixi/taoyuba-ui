<template>
  <el-form size="small" label-width="100px">
    <el-row>
      <el-col :span='8'>
        <el-form-item label="模块编号：">
          <div>{{form.number}}</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="模块分类：">
          <iep-dict-detail :value="form.type" dict-name="cpms_module_type"></iep-dict-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="测试地址：">
          <div>{{form.website}}</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="模块指导价：">
          <div>{{form.guidePrice}}元</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="模块优惠价：">
          <div>{{form.preferentialPrice}}元</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="模块介绍：">
          <div>{{form.description}}</div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
    }
  },
}
</script>

