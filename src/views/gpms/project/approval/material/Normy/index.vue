<template>
  <div>
    
    <div class="plate">
      <div class="head">
        <p class="title">会议纪要</p>
        <div class="button">
          <iep-button size="small" type="primary" @click="createSummary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small" @click="relateSummary"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div v-if="summaryList.length == 0" style="color: #999;">暂无数据</div>
        <div v-else>
          <div class="item" v-for="(item, index) in summaryList" :key="index">
            <i class="icon-guanlian"></i>{{item.name}} <i class="close el-icon-close" @click="deleteRelations(item, 1)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="plate">
      <div class="head">
        <p class="title">项目周报</p>
        <div class="button">
          <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div v-if="weeklyList.length == 0" style="color: #999;">暂无数据</div>
        <div v-else>
          <div class="item" v-for="(item, index) in weeklyList" :key="index">
            <i class="icon-guanlian"></i>{{item.name}} <i class="close el-icon-close" @click="deleteRelations(item, 2)"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getMeetingList, deleteSummarys } from '@/api/gpms/material'

export default {
  name: 'index',
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data (){
    return {
      summaryList: [],
      weeklyList: [],
    }
  },
  methods: {
    // 新增会议纪要
    createSummary () {
      this.$emit('createSummary')
    },
    getsummaryList () {
      getMeetingList({
        projectId: this.projectId,
        materialType: 1,
      }).then(({data}) => {
        this.summaryList = data.data
      })
    },
    relateSummary () {
      this.$emit('relateSummary', this.projectId)
    },
    getPorjectWeekList () {
      getMeetingList({
        projectId: this.projectId,
        materialType: 2,
      }).then(({data}) => {
        this.weeklyList = data.data
      })
    },
    // 删除关联
    deleteRelations (item, type) {
      deleteSummarys({
        materialChartId: item.id,
        materialType: type,
        projectId: this.projectId,
      }).then(({data}) => {
        console.log('data: ', data)
      })
    },
  },
  created () {
    this.getsummaryList()
    this.getPorjectWeekList()
  },
}
</script>

<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    .title {
      font-size: 18px;
      margin: 0;
    }
    .button {
      padding-bottom: 10px;
      .el-button {
        margin-right: 10px;
      }
      i {
        font-size: 16px !important;
      }
    }
  }
  .content {
    padding: 15px 0;
    .item {
      margin-bottom: 15px;
      i {
        margin-right: 10px;
      }
      .close {
        cursor: pointer;
      }
    }
  }
}
.plate:first-of-type {
  margin-bottom: 20px;
}
</style>