<template>
  <div class="table">
    <iep-table 
      :isLoadTable="isLoadTable" 
      :pagination="pagination" 
      :dictsMap="dictsMap" 
      :columnsMap="columnsMap" 
      :pagedTable="pagedTable" 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      @selection-change="handleSelectionChange" 
      is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="会议标题">
          <template slot-scope="scope">
            <!-- <div @click="handleDetail(scope.row)" class="detail">{{scope.row.title}}</div> -->
            <div class="row-tpl" @click="handleDetail(scope.row)">
              <div class="custom-name">{{scope.row.title}}</div>
              <el-col class="custom-tags">
                <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tagKeyWords" :key="index" @click="handleTagDetail(item)">{{item}}</el-tag>
              </el-col>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="280" align="center">
        <template slot-scope="scope">
          <operation-wrapper v-if="scope.row.status===1">
            <iep-button type="warning" plain @click="handleEdit(scope.row)">修改草稿</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
          <operation-wrapper v-else>
            <iep-button type="warning" plain @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
            <iep-button type="warning" plain v-else>已收藏</iep-button>
            <iep-button @click="handleShare(scope.row)">分享</iep-button>
            <!-- <iep-button @click="handleSent(scope.row)" v-if="scope.row.isSend == 1">发送</iep-button> -->
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleEdit(scope.row)" v-if="permissionOpera || permissionEdit">修改</el-dropdown-item>
                <el-dropdown-item @click.native="handleDeleteById(scope.row)" v-if="permissionOpera || permissionDelete">删除</el-dropdown-item>
                <el-dropdown-item @click.native="handleCopy(scope.row)">复制</el-dropdown-item>
                <el-dropdown-item @click.native="handleDownload(scope.row)">下载为图片</el-dropdown-item>
                <el-dropdown-item @click.native="handleExport(scope.row)">导出为文本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
import { copyData, meetingSend, deleteData } from '@/api/mlms/material/summary'

export default {
  mixins: [mixins],
  components: {  },
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  props: {
    getTableData: {
      type: Function,
    },
    permissionEdit: {
      type: Boolean,
      default: false,
    },
    permissionDelete: {
      type: Boolean,
      default: false,
    },
    permissionOpera: {
      type: Boolean,
      default: false,
    },
    paramForm: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    loadPage (param = this.paramForm) {
      this.pageState = 'list'
      this.loadTable(param, this.getTableData)
    },
    handleEdit (row) {
      this.$router.push(`/mlms_spa/summary/update/${row.id}`)
    },
    handleDetail (row) {
      // this.$router.push(`/mlms_spa/summary/detail/${row.id}`)
      this.$emit('handleDetail', row)
    },
    // id删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    handleSelectionChange (val) {
      this.$emit('selectionChange', val)
    },
    // 收藏
    handleCollection (row) {
      this.$emit('handleCollection', row)
    },
    // 分享
    handleShare (row) {
      this.$emit('handleShare', row)
    },
    // 下载为图片
    handleDownload () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
    // 复制
    handleCopy (row) {
      copyData(row.id).then(() => {
        this.$message.success('复制成功！')
        this.loadPage()
      })
    },
    // 发送
    handleSent (row) {
      meetingSend(row.id).then(({data}) => {
        this.$message.success(data.msg)
        if (data.data) {
          this.loadPage()
        }
      })
    },
    // 导出为文本
    handleExport () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
    handleTagDetail (val) {
      this.$openTagDetail(val)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  cursor: pointer;
}
.row-tpl {
  width: 100%;
  cursor: pointer;
  .custom-name {
    margin-bottom: 10px;
    width: 100%;
  }
  .custom-tags {
    margin: 0;
    .el-tag {
      margin: 0 5px 5px 0;
      height: 26px;
      line-height: 26px;
    }
  }
}
</style>
