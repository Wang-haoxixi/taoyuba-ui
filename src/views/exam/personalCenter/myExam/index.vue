<template>
  <div class="personalCenter">
    <basic-container>
      <el-row>
        <el-col :span="24">
          <user-exam-info></user-exam-info>
        </el-col>
      </el-row>
      <el-row class="exam-row">
        <el-col :span="18">
          <study-exponent></study-exponent>
        </el-col>
        <el-col :span="6">
          <shortcut-entrance></shortcut-entrance>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <my-study></my-study>
        </el-col>
        <el-col :span="6">
          <correct-rate></correct-rate>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import StudyExponent from './studyExponent'
import ShortcutEntrance from '../../shortcutEntrance'
import MyStudy from './myStudy'
import CorrectRate from './correctrate'
import UserExamInfo from '../../userExamInfo'

export default {
  components: { UserExamInfo, StudyExponent, ShortcutEntrance, MyStudy, CorrectRate },
  data () {
    return {

    }
  },
}
</script>
<style lang="scss" scoped>
// TODO:scoped
.personalCenter {
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
.personalCenter >>> .el-card__body {
  width: 100%;
}
</style>