<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in weeklyList" :key="index" :title="`${item.projectName} （${formatYear(item.updateTime)}）`" :name="index">
        <div class="content">
          <div class="form">
            <div class="title">项目预计签订时间</div>
              <pre>{{formatYear(item.estimateSignTime)}}</pre>
            <div class="title">合同签订时间</div>
              <pre>{{formatYear(item.contractSignTime)}}</pre>
            <div class="title">预计回款时间</div>
              <el-table :data="item.paymentRelations">
                <el-table-column prop="projectPaymentTime" label="月份"></el-table-column>
                <el-table-column prop="paymentAmount" label="回款金额"></el-table-column>
              </el-table>
            <div class="title">客户需求</div>
              <pre>{{item.clientRqmt}}</pre>
            <div class="title">本周工作总结</div>
              <pre>{{item.workSummary}}</pre>
            <div class="title">下周工作计划</div>
              <pre>{{item.workPlan}}</pre>
            <div class="title">备注</div>
              <pre>{{item.remark}}</pre>
          </div>
          <div class="edit">
            <i class="el-icon-edit" @click="update"></i>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <iep-button type="primary" class="iep-button" @click="handleCreate"><i class="el-icon-plus"></i>创建项目周报</iep-button>
  </div>
</template>

<script>
import { formatYear } from '../util'

export default {
  components: {  },
  data () {
    return {
      activeName: '-1',
      weeklyList: [],
      formatYear,
    }
  },
  methods: {
    update () {
      this.$emit('handleUpdate', this.weeklyList[this.activeName])
    },
    handleCreate () {
      this.$emit('handleCreate', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .form {
    width: calc(100% - 30px);
    .title {
      margin-bottom: 20px;
    }
    pre {
      padding-left: 20px;
      line-height: 20px;
      margin: 0;
      min-height: 50px;
    }
    .title {
      font-weight: 700;
      margin-top: 10px;
    }
  }
  .edit {
    width: 30px;
    text-align: center;
    font-size: 18px;
    i {
      cursor: pointer;
    }
  }
}
.iep-button {
  margin-top: 20px;
}
</style>
