<template>
  <div class="contract">
    <div class="contract-nav">
      <div>我的合同</div>
    </div>
    <div class="contract-content">
      <iep-no-data v-if="!dataList.length" message="暂无合同"></iep-no-data>
      <el-row class="item" v-for="(item,index) in dataList" :key="index">
        <el-col :span="12">
          <div class="iep-ellipsis name" @click="handleDetail(item)">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="iep-ellipsis" style="text-align: left;">{{item.businessContractType!=''?item.businessContractType:'无'}}</div>
        </el-col>
        <el-col :span="3">
          <div class="iep-ellipsis" style="text-align: right;">{{item.contractAmount.toLocaleString('en-US')}}</div>
        </el-col>
        <el-col :span="3">
          <div class="iep-ellipsis" style="text-align: right;">{{item.status}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getContractList } from '@/api/wel/index'
export default {
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    getContractList().then((res) => {
      this.dataList = res.data.data
    })
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/mlms_spa/contract/detail/${row.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.contract {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .contract-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #000;
  }
  .contract-content {
    padding: 10px 0;
    font-size: 14px;
    .item {
      padding: 5px 0;
      cursor: pointer;
    }
  }
}
.grid-content {
  min-height: 24px;
}
.el-row:hover .el-col .name {
  color: #cb3737;
}
</style>
