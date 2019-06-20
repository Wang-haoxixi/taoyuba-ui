<template>
  <el-card class="myStudy-box" shadow="hover">
    <div slot="header">
      <span>我的学习</span>
    </div>
    <el-row>
      <el-col :span="12" class="tab">
        <div class="lately">
          <h5>最近考试成绩</h5>
          <el-row>
            <el-col :span="8">新员工入职考试</el-col>
            <el-col :span="8">2018/12/05</el-col>
            <el-col :span="8">98</el-col>
          </el-row>
        </div>
        <div class="usually">
          <h5>经常参加考试</h5>
          <div class="usuallyExam">
            <el-tag type="success">
              数据基因
              <span>23</span>
            </el-tag>
            <el-tag type="success">
              大数据
              <span>5</span>
            </el-tag>
            <el-tag type="success">
              国脉内网
              <span>2</span>
            </el-tag>
          </div>
        </div>
        <div class="joinExam">
          <iep-button type="primary" icon="el-icon-edit">参加考试</iep-button>
        </div>
      </el-col>

      <el-col :span="12" class="tab">
        <div class="lately">
          <h5>最近练习成绩</h5>
          <el-row>
            <el-col :span="8">新员工入职考试</el-col>
            <el-col :span="8">2018/12/05</el-col>
            <el-col :span="8">98</el-col>
          </el-row>
        </div>
        <div class="usually">
          <h5>经常参加的练习</h5>
          <div class="usuallyExam">
            <el-tag type="success">
              数据基因
              <span>23</span>
            </el-tag>
            <el-tag type="success">
              大数据
              <span>5</span>
            </el-tag>
            <el-tag type="success">
              国脉内网
              <span>2</span>
            </el-tag>
          </div>
        </div>
        <div class="joinExam">
          <iep-button type="primary" icon="el-icon-plus">我要练习</iep-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      infoList: {
        num: 12,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.myStudy-box {
  .tab {
    > div {
      margin-top: 20px;
    }
    border-right: 1px solid #ddd;
    font-size: 14px;
    color: #666;
    padding: 40px 10px 40px 40px;
    &:last-child {
      border-right: 0;
    }
    .usually {
      .usuallyExam {
        .el-tag {
          margin-right: 20px;
        }
      }
    }
    .joinExam {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

