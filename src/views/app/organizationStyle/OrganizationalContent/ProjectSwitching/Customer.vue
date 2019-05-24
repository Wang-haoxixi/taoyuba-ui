<template>
  <div class="reward-con">
    <div class="reward">
      <div v-for="(item,index) in reward" :key="index" class="piece" @click="handleDetail(item.clientId)">
        <span class="title">{{item.clientName}}</span>
        <span class="name">{{item.marketManagerName}}</span>
        <span class="percentage">{{item.followUpStatusName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getClientList } from '@/api/app/crms/'

export default {
  props: {
    orgId: {
      type: Number,
    },
  },
  data () {
    return {
      reward: [],
    }
  },
  methods: {
    handleDetail (id) {
      this.$router.push(`/crms_spa/customer_detail/${id}?type=2`)
    },
  },
  created () {
    getClientList(this.orgId).then(({data}) => {
      this.reward = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.reward {
  .piece {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .percentage {
      height: 30px;
      line-height: 30px;
      width: 60px;
    }
    .title {
      display: inline-block;
      flex: 3;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #cb3737;
        &:before {
          background-color: #cb3737;
        }
      }
    }
    .name {
      margin: 0 60px;
      height: 30px;
      line-height: 30px;
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.reward-con >>> .el-card__body {
  height: 270px;
}
</style>
