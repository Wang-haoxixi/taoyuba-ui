<template>
  <div class="training-top-right">
    <el-row>
      <el-col>
        <el-card :body-style=" { padding: '0px' }" shadow="never">
          <div class="sub-title clearfix" slot="header">
            <span class="cardTitle">{{title}}</span>
            <el-button class="more" type="text" @click="getMore">更多></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size">
          <div class="timeline-item" @click="handleOpen(activity)">
            <div><span class="item-title">{{activity.title}}</span><strong>{{activity.important}}</strong></div>
            <p class="content">{{activity.content}}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/app/hrms/'

export default {
  data () {
    return {
      title: '培训预告',
      activities: [],
    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: '/app/training_list',
      })
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/training/training_detail/${row.id}`,
      })
    },
    getNoticeList () {
      getNoticeList().then(({data}) => {
        for (let item of data.data) {
          this.activities.push({
            id: item.id,
            title: `${this.itmeChange(item.startTime)} • ${item.trainerName} • ${item.place}`,
            content: item.trainingTheme,
          })
        }
        this.activities[0] = Object.assign({}, this.activities[0], {
          important: '即将开始',
          color: '#cb3737',
          icon: 'el-icon-time',
          size: 'large',
        })
      })
    },
    itmeChange (val) {
      let formatDig = (num) => {
        return num>9?''+num:'0'+num
      }
      var y = new Date(val)
      let raws = [
        formatDig(y.getMonth() + 1),
        formatDig(y.getDate()),
      ]
      let format = ['-','-']
      return String.raw({raw:raws}, ...format)
    },
  },
  created () {
    this.getNoticeList()
  },
}
</script>
<style lang="scss" scoped>
.block {
  margin-top: 20px;
  .el-timeline {
    margin: 0 10px;
    padding: 0;
    .el-timeline-item {
      padding-bottom: 10px;
      .timeline-item {
        cursor: pointer;
      }
    }
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-title {
      color: #999;
    }
    span {
      margin-right: 3px;
    }
    strong {
      font-weight: 400;
      color: #cb3737;
    }
  }
}
</style>
<style scoped>
.training-top-right >>> .el-card {
  border: 0;
}
</style>
