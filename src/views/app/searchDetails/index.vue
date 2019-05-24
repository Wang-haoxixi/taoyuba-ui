<template>
  <div class="search">
    <searchTop></searchTop>

    <div class="container">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
      </iep-tabs>
    </div>
    
    <div class="main">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle1">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="labelTitle2">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle1">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle2">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard>
      </div>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import searchTop from './searchTop'
import Librarys from './Librarys'
export default {
  components:{ searchTop, Librarys },
  data () {
    return {
      tabList: [{
        label: '全部（182）',
        value: 'qb',
      }, {
        label: '要闻（20）',
        value: 'yw',
      }, {
        label: '项目（5）',
        value: 'xm',
      }, {
        label: '材料（4）',
        value: 'cl',
      }, {
        label: '培训（6）',
        value: 'px',
      }, {
        label: '合同（7）',
        value: 'ht',
      }, {
        label: '商机（2）',
        value: 'sj',
      }, {
        label: '成员（15）',
        value: 'cy',
      }, {
        label: '荣誉资质（8）',
        value: 'ryzz',
      }, {
        label: '多媒体文件（6）',
        value: 'dmtwj',
      }],
      activeTab: 'qb',
      labelTitle1: '标签库',
      labelTitle2: '标准库',
      listTitle1: '相关客户',
      listTitle2: '战略伙伴',
    }
  },
}
</script>
<style lang="scss" scoped>
.container{
  width: 1200px;
  margin: 20px auto 0;
}
.main{
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 900px) minmax(100px, 300px);
}
</style>
<style scoped>
.search >>> .el-tabs__item{
    padding: 0 10px;
}
.search >>> .el-card{
  border:0;
}
</style>
