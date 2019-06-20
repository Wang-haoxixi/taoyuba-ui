<template>
  <div class="reviewCenter">
    <basic-container>
      <el-row>
        <el-col :span="24">
          <user-exam-info></user-exam-info>
        </el-col>
      </el-row>
      <el-row class="exam-row">
        <el-col :span="5">
          <shortcut-entrance></shortcut-entrance>
        </el-col>
        <el-col :span="19">
          <my-read></my-read>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <my-team></my-team>
        </el-col>
        <el-col :span="19">
          <latest-review></latest-review>
        </el-col>
      </el-row>
    </basic-container>

    <!-- 我的权限配置 -->
    <el-dialog title="我的权限" :visible.sync="myRolePrompt">
      <div class="readRole">
        <h1>阅卷权限</h1>
        <ul></ul>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import UserExamInfo from '../../userExamInfo'
import ShortcutEntrance from '../../shortcutEntrance'
import MyRead from './myRead'
import MyTeam from './myTeam'
import LatestReview from './latestReview'
export default {
  components: { UserExamInfo, ShortcutEntrance, MyRead, MyTeam, LatestReview },
  data () {
    return {
      myRolePrompt: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.reviewCenter {
  width: 100%;
  position: relative;
  overflow: hidden;
  .exam-row {
    display: flex;
    margin-bottom: 20px;
  }
  .el-card {
    margin: 10px;
    height: 100%;
    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
}

.el-card__header div:first-child span:first-child {
  font-size: 18px;
  font-weight: bold;
}
</style>
<style lang="css" scoped>
.reviewCenter >>> .el-card__body {
  width: 100%;
}
</style>
