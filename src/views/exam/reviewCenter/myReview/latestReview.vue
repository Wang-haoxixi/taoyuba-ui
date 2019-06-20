<template>
  <el-card class="latestReview-box" shadow="hover">
    <div slot="header">
      <span>最新审阅动态</span>
    </div>
    <el-row v-for="(item,index) in latestData" :key="index">
      <el-col :span="4">
        <div class="left">
          <div class="img">
            <iep-img-avatar :size="60" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
          </div>
        </div>
      </el-col>
      <el-col :span="16">{{item.message}}</el-col>
      <el-col :span="4">{{item.date}}</el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      latestData: [
        { id: 1, message: '你发放了2018第三季国脉内网能力考试的所有证书', date: '今天  9:25' },
        { id: 2, message: '你提交了2018第三季国脉内网能力考试的所有考卷', date: '今天  9:25' },
        { id: 3, message: '刘xx在2018第三季国脉内网能力考试完成了简答题3的所有阅卷', date: '今天  9:25' },
        { id: 4, message: '刘xx在国脉内网 试题库完成了5题审核', date: '今天  9:25' },
        { id: 5, message: '刘xx在国脉内网试卷库新建了试卷名', date: '2019.1.23  9:25' },
        { id: 6, message: '刘xx在国脉内网试卷库新建了考试名', date: '2019.1.23  9:25' },
        { id: 7, message: '国脉内网报名时间已截止，现共有233人报名', date: '2019.1.23  9:25' },
      ],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>

<style lang='scss' scoped>
.latestReview-box {
  .el-row {
    height: 60px;
    margin-top: 20px;
    .el-col {
      font-size: 18px;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0px;
      &:last-child {
        color: darkgrey;
      }
    }
    .left {
      width: 100%;
      .img {
        margin: 0 auto;
        border: 4px solid #ebeef5;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
}
</style>
