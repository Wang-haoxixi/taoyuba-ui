<template>
  <div class="reward-con">
    <div class="reward">
      <div v-for="(item,index) in reward" :key="index" class="piece" @click="handleDetail(item.id)">
        <span class="title">{{item.projectName}}</span>
        <span class="name">{{item.authorizations[0]}}</span>
        <!-- <div class="percentage">
          <el-progress :percentage="item.integrity" color="#68C769"></el-progress>
        </div> -->
        <span class="percentage">{{dictList[item.projectStage]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/api/app/prms/'

export default {
  props: {
    orgId: {
      type: Number,
    },
  },
  data () {
    return {
      reward: [],
      dictList: {
        1: '立项阶段',
        2: '实施阶段',
        3: '收尾阶段',
        4: '完结阶段',
        5: '失败阶段',
      },
    }
  },
  methods: {
    handleDetail (id) {
      this.$router.push(`/gpms_spa/project/detail/${id}`)
    },
  },
  created () {
    getProjectList(this.orgId).then(({data}) => {
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
