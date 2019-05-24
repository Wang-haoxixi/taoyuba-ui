<template>
  <div>
    <div class="material" v-if="'/app/resource/business'==routerMatch[routerMatch.length-1].path">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle">
          <IepAppListCard :dataList="listList" name="projectName"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="rankingTitle">
          <IepAppRankingCard :dataList="dataList" name="projectName"></IepAppRankingCard>
        </IepAppTabCard>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Librarys from './Librarys/'
import { getLatestList, getPopularList } from '@/api/app/crms/'
import { getRectagsList } from '@/api/app/tms/index'

export default {
  components: { Librarys },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle: '最新商机',
      rankingTitle: '热门商机',
      labelList: [],
      listList: [],
      dataList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    getLatestList () {
      getLatestList().then(({data}) => {
        this.listList = data.data
      })
    },
    getPopularList () {
      getPopularList().then(({data}) => {
        this.dataList = data.data
      })
    },
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.getLatestList()
    this.getPopularList()
    this.getRectagsList()
  },
}
</script>
<style lang="scss" scoped>
.material {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
}
.el-card {
  border: 0;
}
.library {
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
}
</style>
