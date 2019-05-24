<template>
  <el-card shadow="hover" :body-style="{padding:'20px 20px 0 20px'}">
    <el-row class="survey">
      <el-col class="head">本周跟进情况<span class="sub">（新增）</span></el-col>
      <el-col :span='6' class="tab">
        <span class="num">{{data.increasedClient}}</span> 客户
      </el-col>
      <el-col :span='6' class="tab">
        <span class="num">{{data.increasedContact}}</span> 联系人
      </el-col>
      <el-col :span='6' class="tab">
        <span class="num">{{data.increasedVisitTheLog}}</span> 拜访日志
      </el-col>
      <el-col :span='6' class="tab">
        <span class="num">{{data.increasedOpportunity}}</span> 商机
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getWeekList } from '@/api/crms/count'
export default {
  data () {
    return {
      data: '',
    }
  },
  created () {
    getWeekList().then((res) => {
      this.data = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.survey {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .sub {
      font-weight: 500;
      font-size: 14px;
      color: #666;
    }
  }
  .tab {
    padding: 15px;
    border-left: 1px dashed #ddd;
    font-size: 14px;
    color: #666;
    .num {
      font-size: 20px;
      color: #000;
    }
  }
  .tab:nth-of-type(2) {
    border: 0;
  }
}
.el-card {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>

