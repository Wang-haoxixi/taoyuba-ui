<template>
  <div>
    <div class="material" v-if="'/app/resource/client'==routerMatch[routerMatch.length-1].path">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="listTitle1">
          <IepAppListCard :dataList="listList1" name="clientName"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="rankingTitle">
          <IepAppRankingCard :dataList="dataList" name="clientName"></IepAppRankingCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle2">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard>
        <!-- <IepAppTabCard :title="listTitle3">
          <IepAppListCard :dataList="listList3"></IepAppListCard>
        </IepAppTabCard> -->
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Librarys from './Librarys/'
import { getNewClientList, getCoopClientList } from '@/api/app/crms/'
import { getExcellentList } from '@/api/app/mlms/material'
import { getRectagsList } from '@/api/app/tms/index'

export default {
  components: { Librarys },
  data () {
    return {
      labelTitle: '热门标签',
      listTitle2: '优秀客户方案',
      listTitle3: '客户资讯',
      listTitle1: '本周新增',
      rankingTitle: '合作次数最多',
      labelList: [],
      listList1: [],
      listList2: [],
      listList3: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      dataList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    // 本周新增
    getNewClientList () {
      getNewClientList().then(({data}) => {
        this.listList1 = data.data
      })
    },
    // 合作次数最多
    getCoopClientList () {
      getCoopClientList().then(({data}) => {
        // 存在偶尔可能数据为null的情况
        let row = data.data
        for (let i = 0; i < row.length; ++i) {
          if (row[i] == null) {
            row[i] = {}
          }
          if (i < 3) {
            row[i].color = 'red'
          }
        }
        this.dataList = row
      })
    },
    // 优秀客户方案
    getExcellentList () {
      getExcellentList().then(({data}) => {
        this.listList2 = data.data
      })
    },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.getNewClientList()
    this.getCoopClientList()
    this.getExcellentList()
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
.el-card{
  border:0;
}
.library{
  padding-right: 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
