<template>
  <div>
    <div class="news-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部（430）" name="first">
          <news-list></news-list>
        </el-tab-pane>
        <el-tab-pane label="喜报（30）" name="second">喜报</el-tab-pane>
        <el-tab-pane label="要闻（30）" name="third">要闻</el-tab-pane>
        <el-tab-pane label="通知（30）" name="fourth">通知</el-tab-pane>
        <el-tab-pane label="公告（30）" name="fifth">公告</el-tab-pane>
        <el-tab-pane label="指示（30）" name="sixth">指示</el-tab-pane>
        <el-tab-pane label="团建（30）" name="seventh">团建</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import NewsList from './NewsList'
export default {
  data () {
    return {
      activeName: 'first',
    }
  },
  components: { NewsList },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
  },
}
</script>
<style scoped>
.news-nav >>> .el-tabs__item {
  font-size: 16px;
}
</style>

