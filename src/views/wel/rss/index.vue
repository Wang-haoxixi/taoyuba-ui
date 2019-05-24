<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span class="title">订阅目录</span>
        </div>
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item class="menu-item" :key="index" v-for="(item,index) in imsMsgType">
            <span>{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <page-header title="我的订阅"></page-header>
      <div class="info">
        <span>我的订阅模块主要为个人在内网中订阅的内容。</span>
        <span class="red">我的订阅模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div>
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleExport">导出</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
        </template>
        <el-table-column prop="operation" label="操作" width="260">
          <template>
            <operation-wrapper>
              <iep-button type="warning" plain>收藏</iep-button>
              <iep-button>分享</iep-button>
              <iep-button>取消订阅</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </el-col>
  </el-row>
</template>
<script>
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
        { time: '2019-02-02', name: '数据基因微服务版说明书 V1.0', status: '0' },
      ],
      imsMsgType: [
        { label: '技术文档', value: '1' },
        { label: '产品解决方案', value: '1' },
        { label: '培训/课程', value: '1' },
        { label: '制度文件', value: '1' },
        { label: '会议纪要', value: '1' },
        { label: '学习资源', value: '1' },
      ],
      selectType: '0',
      bodyStyle: {
        padding: 0,
      },
    }
  },
  methods: {
    handleSelectionChange () {
    },
    handleAdd () {
    },
    handleDetail () {
    },
    handleSelectType (k) {
      this.selectType = k
      this.loadPage()
    },
    // 导出
    handleExporthandleExport () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 收藏
    handleCollectAll () {
      this.$message.error('抱歉，此功能尚未开发')
    },
  },
}
</script>
<style lang="scss" scoped>
.info {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;
  span {
    display: block;
    line-height: 28px;
    color: #333;
  }
  .red {
    color: #ba1b21 !important;
  }
}
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  height: 100ch;
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 20px;
  border-right: 1px solid #e5e5e5;
  .title {
    margin-bottom: 15px;
    font-size: 16px;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card {
  border: 0;
}
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>