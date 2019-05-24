<template>
  <div>
    <div class="material-detail">
      <div class="library">
        <article-details></article-details>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle1">
          <IepAppListCard :dataList="listList1"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="rankingTitle">
          <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle2">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleDetails from './ArticleDetails'
import { getRectagsList } from '@/api/app/tms/index'
import { getGuessList } from '@/api/app/mlms/index'
import { getExcellentList } from '@/api/app/mlms/material'

export default {
  components: { ArticleDetails },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle2: '优秀客户方案',
      listTitle1: '猜你想找',
      rankingTitle: '热搜榜',
      labelList: [],
      listList1: [],
      listList2: [],
      dataList: [
        { name: '厦门市信息中心标准规划部' },
        { name: '深圳市经济贸易和信息化委员会'},
        { name: '象山政府部门'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
      ],
      routerMatch: this.$route.matched,
    }
  },
  methods: {
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
    // 猜你想找
    getGuessList () {
      getGuessList().then(({data}) => {
        this.listList1 = data.data
      })
    },
    // 优秀材料
    getExcellentList () {
      getExcellentList().then(({data}) => {
        this.listList2 = data.data
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    //console.log(to, from)
    this.routerMatch = to.matched
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  created () {
    this.getRectagsList()
    this.getGuessList()
    this.getExcellentList()
  },
}
</script>
<style lang="scss" scoped>
.material-detail {
  width: 1200px;
  margin: 0 auto 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
}
.el-card{
  border:0;
}
.library{
  padding-right: 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link{
  font-weight: normal;
}
</style>
