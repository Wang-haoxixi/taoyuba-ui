<template>
  <div class="Grades">
    <div class="Grades-nav">
      <div>我的成绩</div>
    </div>
    <div class="Grades-content">
      <el-row v-for="(item,index) in dataList" :key="index">
        <el-col :span="10">
          <div class="grid-content bg-purple title">{{item.title}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.score}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.situation}}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text-right text-time">{{item.date}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { title: '2018年会精神考试', score: '90分', situation: '超越了92%的人', date: '02-10' },
        { title: '2019年第一季度内网能力测试', score: '86分', situation: '超越了88%的人', date: '02-09' },
        { title: '2018第三季国脉内网能力考试', score: '92分', situation: '超越了95%的人', date: '12-31' },
        { title: '2018第一期数据基因初级等级能力认证', score: '80分', situation: '超越了83%的人', date: '10-09' },
        { title: '2018第一期公司文化考试', score: '78分', situation: '超越了80%的人', date: '10-08' },
      ],
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.Grades {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .Grades-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .Grades-content {
    padding: 10px 0;
    font-size: 14px;
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
  .title {
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
