<template>
  <div>
    <div class="training" v-if="'/app/resource/training'==routerMatch[routerMatch.length-1].path">
      <training-top></training-top>
      <training-content></training-content>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import TrainingTop from './TrainingTop/'
import TrainingContent from './TrainingContent'
export default {
  name: 'AppTraining',
  components: { TrainingTop, TrainingContent },
  data () {
    return {
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
}
</script>
<style lang="scss" scoped>
.training {
  margin: 0 auto;
  width: 1200px;
  .training-top {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 3fr);
  }
}
</style>
<style scoped>
.training >>> .clearfix:before,
.training >>> .clearfix:after {
  display: table;
  content: "";
}
.training >>> .clearfix:after {
  clear: both;
}
.training >>> .sub-title .cardTitle {
  font-size: 16px;
}
.training >>> .more {
  float: right;
  padding: 5px 0;
  color: #999;
}
</style>
