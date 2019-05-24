<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span class="title">消息分类</span>
        </div>
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in imsMsgType" @click.native="handleSelectType(item.value+'')">
            <span>{{item.label}}</span>
            <el-badge v-if="typeCountMap[item.value]" class="mark" type="primary" :value="typeCountMap[item.value]" />
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <page-header title="系统消息"></page-header>
      <operation-container>
        <template slot="left">
          <el-button-group>
            <el-button class="iconfont icon-yanjing" @click="handleViewBatch" size="mini"></el-button>
            <el-button class="iconfont icon-biaoqian" size="mini"></el-button>
            <el-button class="iconfont icon-shanchu" size="mini"></el-button>
          </el-button-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="主题">
            <template slot-scope="scope">
              <iep-table-link :is-read="scope.row.isRead" @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSystemMessagePage, getTypeCountMap, readSystemMessageBatch } from '@/api/ims/system_message'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
// import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  // components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
      bodyStyle: {
        padding: 0,
      },
      typeCountMap: {},
      selectType: '0',
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    imsMsgType () {
      return this.dictGroup['ims_msg_type']
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleViewBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this._handleComfirm(this.multipleSelection, readSystemMessageBatch, '批量已读', '', '操作成功')
    },
    handleSelectType (k) {
      this.selectType = k
      this.loadPage()
    },
    handleDetail (row) {
      this.$router.push({
        path: `/ims_spa/system_message_detail/${row.id}`,
      })
    },
    loadTypeList () {
      getTypeCountMap().then(({ data }) => {
        this.typeCountMap = data.data
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTypeList()
      this.loadTable({ type: this.selectType, ...param }, getSystemMessagePage)
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  .title {
    font-size: 16px;
  }
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
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>




