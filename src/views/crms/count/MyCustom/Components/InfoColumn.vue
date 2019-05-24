<template>
  <el-card shadow="always" :body-style="{padding:'15px'}">
    <el-row class="info">
      <el-col :span='24' class="title">
        <h2 class="user">hello，{{userInfo.realName}}！</h2>
        <div class="msg">
          您累计签订合同
          <span class="red">{{data.contractQuantity}}</span>
          份 / 排名
          <span class="red">{{data.contractQuantitySort}}</span>
          位
        </div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>{{data.clientQuantity}}</span> 名客户
        </div>
        <div class="content">超过了 {{data.clientBeyond}}% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>{{data.contactQuantity}}</span> 位联系人
        </div>
        <div class="content">超过了 {{data.contactBeyond}}% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>{{data.contractQuantity}}</span> 份合同
        </div>
        <div class="content">超过了 {{data.contractBeyond}}% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>{{data.contractAmount}}w</span> 合同金额
        </div>
        <div class="content">超过了 {{data.contractAmountBeyond}}% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>{{data.softwareQuantity}}</span> 个软件
        </div>
        <div class="content">超过了{{data.softwareBeyond}}% 的同事</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getMyClientNum } from '@/api/crms/count'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: {
        contractQuantity: 0,
        contractQuantitySort: 0,
        clientQuantity: 0,
        clientBeyond: 0,
        contactQuantity: 0,
        contactBeyond: 0,
        contractBeyond: 0,
        contractAmount: 0,
        contractAmountBeyond: 0,
        softwareQuantity: 0,
        softwareBeyond: 0,
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    getMyClientNum().then((res) => {
      if (res.data.data.contractAmount !== 0) {
        var num = 10000
        res.data.data.contractAmount = (res.data.data.contractAmount / num).toFixed(2)
        this.data = res.data.data
      }

    })
  },
}
</script>

<style lang="scss" scoped>
.info {
  .title {
    line-height: 40px;
    padding: 0 15px;
    display: flex;
    .user {
      margin: 0 15px 0 0;
      font-size: 22px;
    }
    .msg {
      height: 40px;
      line-height: 50px;
      .red {
        color: #f00;
      }
    }
  }
  .tab {
    padding: 5px 15px;
    width: 20%;
    border-left: 1px dashed #ddd;
    text-align: center;
    color: #666;
    font-size: 14px;
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
