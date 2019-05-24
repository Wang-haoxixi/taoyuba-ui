<template>
  <el-form size="small" label-width="100px">
    <el-row>
      <el-col :span='8'>
        <el-form-item label="产品编号：">
          <div>{{form.number}}</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="产品官网：">
          <iep-div-detail :value="form.website"></iep-div-detail>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="是否带库：">
          <div>否</div>
        </el-form-item>
      </el-col>
      <el-col :span='8'>
        <el-form-item label="产品估值：">
          <div>{{form.valuation}}元</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="估值说明：">
          <div>{{form.instructions}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="产品介绍：">
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

