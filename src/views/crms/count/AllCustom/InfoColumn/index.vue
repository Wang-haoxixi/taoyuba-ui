<template>
  <el-row class="info">
    <el-col class="title">
      <h2 class="user">基本情况展示</h2>
    </el-col>
    <el-col class="tab">
      <div class="head">
        <span>{{data.clientQuantity}}</span>
      </div>
      <div class="content">客户</div>
    </el-col>
    <el-col class="tab">
      <div class="head">
        <span>{{data.contactQuantity}}</span>
      </div>
      <div class="content">联系人</div>
    </el-col>
    <el-col class="tab">
      <div class="head">
        <span>{{data.contractQuantity}}</span>
      </div>
      <div class="content">合同</div>
    </el-col>
    <el-col class="tab">
      <div class="head">
        <span>{{data.contractAmount}}</span>
      </div>
      <div class="content">合同金额</div>
    </el-col>
    <el-col class="tab">
      <div class="head">
        <span>{{data.softwareQuantity}}</span>
      </div>
      <div class="content">软件</div>
    </el-col>
  </el-row>
</template>

<script>
import { getAllClientNum } from '@/api/crms/count'
export default {
  data () {
    return {
      data: {
        clientQuantity: 0,
        contactQuantity: 0,
        contractQuantity: 0,
        contractAmount: 0,
        softwareQuantity: 0,
      },
    }
  },
  created () {
    getAllClientNum().then((res) => {
      res.data.data.contractAmount = '￥ ' + parseFloat(res.data.data.contractAmount).toLocaleString()
      this.data = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.info {
  margin: 10px 2px;
  border: 1px solid #f9f9f9;
  box-shadow: 0 0 10px #dcdcdc;
  border-radius: 5px;
  .title {
    line-height: 40px;
    padding: 15px;
    padding-bottom: 0;
    display: flex;
    .user {
      margin: 0 15px 0 0;
      font-size: 18px;
    }
  }
  .tab {
    padding: 5px 15px;
    width: 20%;
    border-left: 1px dashed #ddd;
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
    span {
      color: #000;
      font-size: 20px;
    }
  }
  .tab:nth-of-type(2) {
    border: 0;
  }
}
</style>
