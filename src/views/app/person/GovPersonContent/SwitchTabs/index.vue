<template>
  <div class="switch">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='LearnList'" v-slot:LearnList>
          <learn-list v-loading="activeTab !=='LearnList'" :learningList="learningList"></learn-list>
        </template>
        <template v-if="activeTab ==='ReadList'" v-slot:ReadList>
          <read-list v-loading="activeTab !=='ReadList'"></read-list>
        </template>
        <template v-if="activeTab ==='DocumentList'" v-slot:DocumentList>
          <document-list v-loading="activeTab !=='DocumentList'" :documentList="documentList"></document-list>
        </template>
        <template v-if="activeTab ==='ActivityList'" v-slot:ActivityList>
          <activity-list v-loading="activeTab !=='ActivityList'"></activity-list>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import LearnList from './LearnList'
import ReadList from './ReadList'
import DocumentList from './DocumentList'
import ActivityList from './ActivityList'
import { getMaterialList } from '@/api/app/mlms/'

export default {
  components: {
    LearnList,
    ReadList,
    DocumentList,
    ActivityList,
  },
  data () {
    return {
      tabList: [{
        label: '学习资源',
        value: 'LearnList',
      }, {
        label: '制度文件',
        value: 'DocumentList',
      }],
      activeTab: 'LearnList',
      learningList: [],
      documentList: [],
      linkName: '/app/resource/material',
    }
  },
  created () {
    getMaterialList().then(({data}) => {
      this.learningList = data.data.rlxx ? data.data.rlxx : []
      this.documentList = data.data.gzzd ? data.data.gzzd : []
    })
  },
}
</script>

<style scoped>
.switch {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
}
</style>

<style lang="scss">
.learning-list,
.read-list,
.document-list,
.avtivity-list {
  padding: 0 0 20px 0;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 0;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
  .piece {
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    padding-left: 15px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    position: relative;
    &:hover {
      color: #cb3737;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>