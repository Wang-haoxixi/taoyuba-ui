<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium">
            <iep-button size="small" type="primary" icon="el-icon-plus" plain>新增<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="localCreate">本地上传</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="newlyCreate">新建文档</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds" v-if="!lookByMeOnly || permission_edit_del">删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item @click.native="handleAllShare">分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-checkbox v-model="lookByMeOnly" @change="changeGetWay">查看全部</el-checkbox>
        </template>
        <template slot="right">
          <searchForm @searchPage="searchPage"></searchForm>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection @selection-change="selectionChange">
        <template slot="before-columns">
          <el-table-column label="名称" min-width="300px">
            <template slot-scope="scope">
              <div class="row-tpl" @click="handleDetail(scope.row)">
                <div class="custom-name">{{scope.row.name}}</div>
                <el-col class="custom-tags">
                  <el-tag type="warning" size="mini">{{scope.row.creatorRealName}}</el-tag>
                  <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tagKeyWords" :key="index" @click="handleTagDetail(item)">{{item}}</el-tag>
                </el-col>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
              <iep-button type="warning" plain size="small" v-else>已收藏</iep-button>
              <iep-button size="small" @click="handleShare(scope.row)">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)" v-if="!lookByMeOnly || permission_edit_del">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDeleteById(scope.row)" v-if="!lookByMeOnly || permission_edit_del">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleContribute(scope.row)">投稿</el-dropdown-item>
                  <el-dropdown-item @click.native="handleEdition(scope.row)" v-if="!lookByMeOnly && scope.row.type == 0">上传新版本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <local-dialog ref="local" @load-page="loadPage" v-if="pageState=='local'" :firstClass="firstClass"></local-dialog>
    <newly-dialog ref="newly" @load-page="loadPage" v-if="pageState=='newly'" :firstClass="firstClass"></newly-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="material" :requestFn="createCollect"></collection-dialog>
    <upload-file ref="uploadFile" @upload-success="uploadSuccess" @update-success="updateSuccess"></upload-file>
    <share-dialog ref="share" type="material"></share-dialog>
    <detail-dialog ref="detailPage" @backPage="pageState = 'list'" v-if="pageState=='detail'" :detailState=true @load-page="loadPage(undefined, true)"></detail-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, getTableDataOnlyMe, deleteData, getDataById, getVersion } from '@/api/mlms/material/datum/material'
import { createCollect } from '@/api/mlms/material/summary'
import UploadFile from './uploadFile'
import LocalDialog from './localDialog'
import NewlyDialog from './newlyDialog'
import CollectionDialog from '../../components/collectionDialog'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import { getConfigureTree } from '@/api/mlms/material/datum/configure'
import DetailDialog from './detail'
import { mapGetters } from 'vuex'
import searchForm from './searchForm'

export default {
  mixins: [mixins],
  components: { LocalDialog, NewlyDialog, CollectionDialog, ShareDialog, DetailDialog, UploadFile, searchForm },
  computed: {
    ...mapGetters(['permissions', 'userInfo']),
  },
  data () {
    return {
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      selectList: [],
      createCollect,
      firstClass: [],
      getTableDataFn: getTableDataOnlyMe,
      permission_edit_del: false,
      lookByMeOnly: false,
      versionId: 0,
    }
  },
  created () {
    this.loadPage()
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
    this.permission_edit_del = this.permissions['mlms_datum_cr_edit_del']
  },
  methods: {
    handleEdit (row) {
      // 0是本地，1是新建
      this.pageState = row.type === 0 ? 'local' : 'newly'
      getDataById(row.id).then((res) => {
        this.$refs[this.pageState].firstClassChange(res.data.data.firstClass)
        this.$refs[this.pageState].formData = res.data.data
        this.$refs[this.pageState].methodName = 'update'
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    // 批量删除
    handleDeleteByIds () {
      this._handleGlobalDeleteAll(deleteData)
    },
    selectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param = this.searchForm, state) {
      if (!state) {
        this.pageState = 'list'
      }
      this.loadTable(param, this.getTableDataFn)
    },
    // 本地上传文件成功
    uploadSuccess (row) {
      this.localCreateForm(row)
    },
    localCreate () {
      this.$refs['uploadFile'].open('create')
    },
    // 本地上传
    localCreateForm (row) {
      this.pageState = 'local'
      this.$nextTick(() => {
        this.$refs[this.pageState].methodName = 'create'
        let obj = {
          materialName: row[0].name,
          uploader: this.userInfo.realName,
          attachFileList: row,
        }
        this.$refs['local'].formData = Object.assign({}, this.$refs['local'].formData, obj)
      })
    },
    // 新建文档
    newlyCreate () {
      this.pageState = 'newly'
      this.$nextTick(() => {
        this.$refs[this.pageState].methodName = 'create'
      })
    },
    // 详情
    handleDetail (row) {
      // this.$router.push(`/mlms_spa/material/detail/${row.id}`)
      this.pageState = 'detail'
      this.$nextTick(() => {
        this.$refs['detailPage'].open(row.id)
      })
    },
    // 清空搜索
    clearSearchParam () { },
    // 收藏
    handleCollection (row) {
      row.title = row.name
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量收藏
    handleCollectAll () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要收藏的选项')
        return
      }
      for (let item of this.selectList) {
        item.title = item.name
      }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
    },
    // 分享
    handleShare (row) {
      this.$refs['share'].open([row], `关于 ${row.name} 材料的分享`)
    },
    // 批量分享
    handleAllShare () {
      if (this.selectList.length == 0) {
        this.$message.error('请先选择需要分享的选项')
        return
      }
      this.$refs['share'].open(this.selectList)
    },
    // 下载
    handleDownload () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 投稿
    handleContribute () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 上传新版本
    handleEdition (row) {
      this.versionId = row.id
      this.$refs['uploadFile'].open('update')
    },
    // 更新版本
    updateSuccess (list) {
      let obj = {
        id: this.versionId,
        attachFile: list[0].url,
      }
      getVersion(obj).then(() => {
        this.$message.success('更新成功！')
      })
    },
    // 只看我的
    changeGetWay (val) {
      this.getTableDataFn = val ? getTableData : getTableDataOnlyMe
      this.loadPage()
    },
    handleTagDetail (val) {
      this.$openTagDetail(val)
    },
  },
}
</script>

<style lang="scss" scoped>
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
