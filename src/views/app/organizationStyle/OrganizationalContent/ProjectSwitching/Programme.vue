<template>
  <div class="reward-con">
    <div class="reward">
      <div v-for="(item,index) in reward" :key="index" class="piece" @click="handleDetail(item.id)">
        <span class="title">{{item.materialName}}</span>
        <span class="name">{{item.uploader}}</span>
        <span class="percentage">{{item.views}} 人浏览</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrgMaterialList } from '@/api/app/mlms/'

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
      this.$router.push(`/app/resource/material/material_detail/${id}`)
    },
  },
  created () {
    getOrgMaterialList(this.orgId).then(({data}) => {
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
      text-align: right;
      height: 30px;
      line-height: 30px;
      width: 120px;
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
        color: #0185d8;
        &:before {
          background-color: #0185d8;
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
