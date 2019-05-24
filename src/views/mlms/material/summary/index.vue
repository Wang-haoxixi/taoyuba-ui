<template>
  <div>
    <basic-container v-show="pageState==='list'">
      <page-header title="纪要" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds" v-if="tabName ==='personal' || permission_delete">删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item @click.native="handleAllShare">分享</el-dropdown-item>
              <el-dropdown-item @click.native="downloadPic">下载为图片</el-dropdown-item>
              <el-dropdown-item @click.native="downloadPic">导出为文本</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :paramForm="paramForm" prop="title" advance-search>
            <el-form :model="paramForm" label-width="100px" size="small">
              <!-- <el-form-item label="会议标题">
                <el-input v-model="paramForm.title"></el-input>
              </el-form-item> -->
              <el-form-item label="会议类型">
                <!-- <el-input v-model="paramForm.meetingType"></el-input> -->
                <iep-dict-select v-model="paramForm.meetingType" dict-name="mlms_meeting_type"></iep-dict-select>
              </el-form-item>
              <el-form-item label="会议开始时间">
                <el-date-picker v-model="paramForm.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="会议结束时间">
                <el-date-picker v-model="paramForm.endTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="会议标签">
                <el-input v-model="paramForm.tagKeyWords"></el-input>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>

      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="tabClick">
        <template v-if="tabName ==='personal'" v-slot:personal>
          <tableTemplate 
            ref="tableTpl" 
            :getTableData="getTablePersonal" 
            @handleShare="handleShare" 
            @selectionChange="handleSelectionChange" 
            @handleCollection="handleCollection" 
            :permissionEdit="permission_edit" 
            :permissionDelete="permission_delete" 
            @handleDetail="handleDetail" 
            :permissionOpera=true
            :paramForm="paramForm">
          </tableTemplate>
        </template>
        <template v-if="tabName ==='involved'" v-slot:involved>
          <tableTemplate 
            ref="tableTpl" 
            :getTableData="getTableMyInvolved" 
            @handleShare="handleShare" 
            @selectionChange="handleSelectionChange" 
            @handleCollection="handleCollection" 
            :permissionEdit="permission_edit" 
            :permissionDelete="permission_delete" 
            @handleDetail="handleDetail"
            :paramForm="paramForm">
          </tableTemplate>
        </template>
        <template v-if="tabName ==='received'" v-slot:received>
          <tableTemplate 
            ref="tableTpl" 
            :getTableData="getTableMyReceived" 
            @handleShare="handleShare" 
            @selectionChange="handleSelectionChange" 
            @handleCollection="handleCollection" 
            :permissionEdit="permission_edit" 
            :permissionDelete="permission_delete" 
            @handleDetail="handleDetail"
            :paramForm="paramForm">
          </tableTemplate>
        </template>
      </iep-tabs>

    </basic-container>
    <detail-page ref="detailPage" v-if="pageState==='detail'" @backPage="pageState = 'list'" :detailState=true></detail-page>
    <share-dialog ref="share" type="summary"></share-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="meeting" :requestFn="createCollect"></collection-dialog>
  </div>
</template>
<script>
import { initSearchForm, getWeekStartAndEnd } from './options'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { getTablePersonal, getTableMyInvolved, getTableMyReceived, deleteData, createCollect, getCount } from '@/api/mlms/material/summary'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import CollectionDialog from '../components/collectionDialog'
import DetailPage from './detail'
import tableTemplate from './tableTpl'

export default {
  mixins: [mixins],
  components: { ShareDialog, tableTemplate, CollectionDialog, DetailPage },
  data () {
    return {
      createCollect,
      data: [0, 0], // 头部
      paramForm: initSearchForm(),
      selectList: [],
      pageState: 'list',
      tabName: 'personal',
      tabList: [
        {
          label: '我发布的',
          value: 'personal',
        }, {
          label: '我参与的',
          value: 'involved',
        }, {
          label: '我收到的',
          value: 'received',
        },
      ],
      getTablePersonal,
      getTableMyInvolved,
      getTableMyReceived,
      permission_edit: false,
      permission_delete: false,
    }
  },
  computed: {
    ...mapGetters(['permissions', 'dictGroup']),
  },
  created () {
    this.permission_edit = this.permissions['mlms_summary_edit']
    this.permission_delete = this.permissions['mlms_summary_delete']
    this.getCount()
  },
  watch: {
    '$route' () {
      if (this.$route.path == '/wel/material/summary') {
        this.getCount()
        this.$refs['tableTpl'].loadPage(this.searchForm)
      }
    },
  },
  methods: {
    loadPage (params = {}) {
      let obj = { current: 1, size: 10 }
      obj = Object.assign({}, obj, params)
      this.paramForm = params
      this.$refs['tableTpl'].loadPage(obj)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleAdd () {
      this.$router.push('/mlms_spa/summary/create')
    },
    handleSelectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    // 批量删除
    handleDeleteByIds () {
      this._handleGlobalDeleteAll(deleteData)
    },
    // 批量收藏
    handleCollectAll () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要收藏的选项')
        return
      }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
    },
    // 收藏
    handleCollection (row) {
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量分享
    handleAllShare () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要分享的选项')
        return
      }
      this.$refs['share'].open(this.selectList)
    },
    // 分享
    handleShare (row) {
      this.$refs['share'].open([row], `关于 ${row.title} 的分享`)
    },
    // 头部subTitle方法
    replaceText (arr) {
      return `（本周收到 ${arr[0]} 篇纪要，发布 ${arr[1]} 篇纪要）`
    },
    // 批量下载为图片
    downloadPic () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
    tabClick () {
      this.selectList = []
      this.multipleSelection = []
    },
    handleDetail (row) {
      this.pageState = 'detail'
      this.$nextTick(() => {
        this.$refs['detailPage'].open(row.id)
      })
    },
    getCount () {
      getCount(getWeekStartAndEnd()).then(({ data }) => {
        this.data = [data.data.receivedCount, data.data.sendCount]
      })
    },
  },
}
</script>
