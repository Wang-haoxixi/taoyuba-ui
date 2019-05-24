<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">拜访情况</span>
    </div>
    <div>
      <el-row>
        <el-col :span='12'>
          <div class="echarts odd">
            <visitNumber></visitNumber>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="top">客户出单拜访记录</div>
          <div class="echarts">
            <record></record>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import visitNumber from './Components/VisitNumber'
import Record from './Components/Record'
export default {
  components: { visitNumber, Record },
  data () {
    return {
    }
  },
  methods: {
    changeType () {
      this.$message.success('功能开发中')
    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
  }
}
.inline {
  float: right;
}
.top {
  padding: 10px 30px 20px 10px;
}
.echarts {
  height: 300px;
}
.odd {
  margin-right: 20px;
}
</style>
