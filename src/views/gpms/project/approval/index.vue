<template>
  <basic-container>
    <div v-show="pageState == 'list'">
      <page-header title="详情" :backOption="backOption"></page-header>
      <div class="content">
        <div class="left">
          <el-card class="box-card">
            <div class="navigation" 
              :class="selectNavigation===item.value?'selectNavigation':''" 
              v-for="item in selectNavigatList" 
              :key="item.value"
              @click="navigationChosen(item)">{{item.name}}</div>
          </el-card>
        </div>
        <div class="right">
          <detailPage v-if="selectNavigation===0" :form="formData"></detailPage>
          <stagePage v-if="selectNavigation===1" ref="stage" :form="formData" @author_detail="authorDetail" @author_opera="authorOpera" @submitSuccess="submitSuccess"></stagePage>
          <materialPage v-if="selectNavigation===2" :form="formData" @createSummary="materialCreateSummary"></materialPage>
        </div>
      </div>
    </div>
    <stageAuthorDetail ref="authorDetail" v-if="pageState == 'authorDetail'" @close="authorClose"></stageAuthorDetail>
    <stageAuthorOpera ref="authorOpera" v-if="pageState == 'authorOpera'" @close="authorClose"></stageAuthorOpera>
    <materialSummaryCreate ref="summaryCreate" v-if="pageState == 'summaryCreate'" @close="summaryClose"></materialSummaryCreate>
  </basic-container>
</template>

<script>
import detailPage from './detail/'
import stagePage from './stage/'
import materialPage from './material/'
import { getDataDetail } from '@/api/gpms/index'
import stageAuthorDetail from './stage/Accredit/detail/' // 立项阶段-项目经理详情
import stageAuthorOpera from './stage/Accredit/addDialog' // 立项阶段-项目经理新增
import materialSummaryCreate from '@/views/mlms/material/summary/mainDialog'

export default {
  name: 'detail',
  components: { detailPage, stagePage, materialPage, stageAuthorDetail, stageAuthorOpera, materialSummaryCreate },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      pageState: 'list',
      selectNavigation: 0,
      selectNavigatList: [
        { name: '概况', value: 0 },
        { name: '立项阶段', value: 1 },
        { name: '项目材料', value: 2 },
      ],
      formData: {},
    }
  },
  methods: {
    close () {
      
    },
    // 导航切换
    navigationChosen (item) {
      this.selectNavigation = item.value
    },
    // 立项阶段-项目经理详情
    authorDetail (author, project) {
      this.pageState = 'authorDetail'
      this.$nextTick(() => {
        this.$refs['authorDetail'].open(author.id, project.id)
      })
    },
    authorClose (state, name) {
      this.pageState = 'list'
      if (state === true) { // 即需要刷新页面
      console.log('asd')
        this.$refs['stage'].changePage(name)
      }
    },
    // 立项阶段-项目经理新增
    authorOpera (type, author) {
      this.pageState = 'authorOpera'
      this.$nextTick(() => {
        this.$refs['authorOpera'].open(type, author, this.formData)
      })
    },
    // 获取详情的数据，初步处理数据
    getDetailData () {
      getDataDetail(this.$route.params.id).then(({data}) => {
        let list = [
          { name: 'applicantName', list: 'applicantList' },
          { name: 'approverName', list: 'approverList' },
          { name: 'inChargeDeptName', list: 'inChargeDeptList' },
          { name: 'coopDeptName', list: 'coopDeptList' },
          { name: 'publisherName', list: 'publisherList' },
          { name: 'relatedClientName', list: 'relatedClientList' },
          { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },
        ]
        for (let item of list) {
          if (data.data[item.list]) {
            data.data[item.name] = data.data[item.list].name
          } else {
            data.data[item.name] = '无'
          }
        }
        this.formData = data.data
      })
    },
    // 提交项目完成后回调
    submitSuccess () {
      this.getDetailData()
    },
    // 新建会议纪要
    materialCreateSummary (obj) {
      this.pageState = 'summaryCreate'
      this.$nextTick(() => {
        this.$refs['summaryCreate'].projectOpen(obj)
      })
    },
    summaryClose () {
      this.pageState = 'list'
    },
  },
  created () {
    this.getDetailData()
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    width: 200px;
    .navigation {
      margin-bottom: 20px;
      cursor: pointer;
    }
    .selectNavigation {
      color: #cb3737
    }
  }
  .right {
    flex: 1;
  }
}
</style>

