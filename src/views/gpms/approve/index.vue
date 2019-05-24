<template>
  <basic-container>
    <div v-if="pageState == 'list'">
      
      <div class="head">
        <div class="item" :class="selectIndex==1?'item-select':''" @click="changeItem(1)">项目审批</div>
        <div class="middle"> / </div>
        <div class="item" :class="selectIndex==2?'item-select':''" @click="changeItem(2)">项目经理审批</div>
      </div>

      <project-page ref="project" @handleApprove="projectApprove" v-if="selectIndex==1"></project-page>
      <author-page ref="author" @handleApprove="authorApprove" v-if="selectIndex==2"></author-page>

    </div>
    <div v-if="pageState == 'project'">
      <projectApprove :form="formData" @close="pageState = 'list'"></projectApprove>
    </div>
    <div v-if="pageState == 'author'">
      <authorApprove ref="authorApprove" @close="pageState = 'list'"></authorApprove>
    </div>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import projectApprove from './approve/project'
import authorApprove from './approve/author'
import { getDataDetail } from '@/api/gpms/index'
import ProjectPage from './project/index'
import AuthorPage from './author/index'

export default {
  mixins: [mixins],
  name: 'index',
  components: { projectApprove, ProjectPage, AuthorPage, authorApprove },
  data () {
    return {
      pageState: 'list',
      selectIndex: 1,
    }
  },
  methods: {
    projectApprove (row) {
      getDataDetail(row.id).then(({data}) => {
        this.formData = data.data
        this.pageState = 'project'
      })
    },
    authorApprove (row) {
      this.pageState = 'author'
      this.$nextTick(() => {
        this.$refs['authorApprove'].open(row.id, row.projectInfoId)
      })
    },
    changeItem (index) {
      this.selectIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 20px;
  display: flex;
  .item {
    font-size: 18px;
    cursor: pointer;
  }
  .item-select {
    color: #ba1b21;
  }
  .middle {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
}
</style>