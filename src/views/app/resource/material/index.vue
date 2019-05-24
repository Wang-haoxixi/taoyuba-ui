<template>
  <div>
    <div class="material" v-if="'/app/resource/material'==routerMatch[routerMatch.length-1].path">
      <menus @change_page="changePage"></menus>
      <div class="library">
        <librarys ref="librarys"></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle">
          <IepAppListCard :dataList="listList"></IepAppListCard>
        </IepAppTabCard>
        <ranking></ranking>
        <most></most>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Menus from './Menus'
import Librarys from './Librarys/'
import Ranking from './Ranking/'
import Most from './Most/'
import { getRectagsList } from '@/api/app/tms/index'
import { getGuessList } from '@/api/app/mlms/index'

export default {
  components: { Menus, Librarys, Ranking, Most },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle: '猜你想找',
      labelList: [],
      listList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    changePage (val) {
      this.$refs['librarys'].loadPage({materialClsSecondClass: val})
    },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
    // 猜你想找
    getGuessList () {
      getGuessList().then(({data}) => {
        this.listList = data.data
      })
    },
  },
  created () {
    this.getRectagsList()
    this.getGuessList()
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
  grid-template-columns: minmax(100px, 220px) minmax(100px, 680px) minmax(
      100px,
      300px
    );
}
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
</style>
