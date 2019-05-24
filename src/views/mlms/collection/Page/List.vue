<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <div class="title">收藏目录</div>
          <iep-button type="primary" @click="catalogCreate(0)" plain><i class="el-icon-plus"></i> 新增目录</iep-button>
        </div>
        <el-menu :default-active="selectType" class="menu-vertical" @select="catalogSelect" @open="nemuOpen" @close="nemuColse" unique-opened>
          <el-menu-item index="-1">
            <span slot="title">全部收藏</span>
          </el-menu-item>
          <el-submenu :index="index+''" v-for="(item, index) in catalogList" :key="index">
            <template slot="title">
              <!-- <span>{{item.name}}</span> -->
              <div class="item-tpl" style="padding-right: 25px;" v-on:mouseover="settingIndex=item.id" v-on:mouseout="settingIndex=-1">
                <div class="item-name">{{item.name}}</div>
                <el-dropdown size="medium" v-show="settingIndex===item.id" slot="reference">
                  <i class="el-icon-setting"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div @click="catalogCreate(item.id)">添加子目录</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="catalogUpdate(item.id)">重命名</div>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>上移</el-dropdown-item>
                    <el-dropdown-item>下移</el-dropdown-item> -->
                    <el-dropdown-item>
                      <div @click="catalogDelete(item.id)">删除目录</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
            <el-menu-item :index="child.id+''" v-for="(child, i) in item.childrens" :key="i">
              <div class="item-tpl" v-on:mouseover="settingIndex=child.id" v-on:mouseout="settingIndex=-1">
                <div class="item-name">{{child.name}}</div>
                <el-dropdown size="medium" v-show="settingIndex===child.id" slot="reference">
                  <i class="el-icon-setting"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div @click="catalogUpdate(child.id)">重命名</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="catalogDelete(child.id)">删除目录</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <page-header :title="pageTitle"></page-header>
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleAllShare">分享</el-dropdown-item>
              <el-dropdown-item @click.native="handleMoreAll">移动</el-dropdown-item>
              <el-dropdown-item @click.native="handleNotCollectAll">取消收藏</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
            <!-- <operation-search @search-page="searchPage" advance-search> -->
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="主题">
            <template slot-scope="scope">
              <div style="width: 100%; cursor: pointer;" @click="handleDetail(scope.row)">{{scope.row.name}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleShare(scope.row)">分享</iep-button>
              <iep-button @click="handleMore(scope.row)">移动</iep-button>
              <iep-button @click="handleNotCollect(scope.row)">取消收藏</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </el-col>
    <el-dialog :title="`${methodName}目录`" :visible.sync="dialogVisible" width="30%">
      <el-form :model="formData" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="formData.name" :maxlength="10"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="catalogCancel">取 消</el-button>
        <el-button type="primary" @click="catalogSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" :requestFn="collectUpdate"></collection-dialog>
    <share-dialog ref="share" type="collection"></share-dialog>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { getList, getListById, getAllList, catalogCreate, catalogUpdate, catalogDelete, farelationDelete, collectUpdate } from '@/api/mlms/collection/index'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, rules, initFormData } from '../options'
import AdvanceSearch from './AdvanceSearch'
import CollectionDialog from '../../material/components/collectionDialog'
import ShareDialog from './shareDialog'

export default {
  mixins: [mixins],
  components: { AdvanceSearch, CollectionDialog, ShareDialog },
  data () {
    return {
      rules,
      dictsMap,
      columnsMap,
      bodyStyle: {
        padding: 0,
      },
      selectType: '0',
      catalogList: [],
      pageTitle: '我的收藏',
      settingIndex: -1,
      methodName: '新增',
      dialogVisible: false,
      formData: initFormData(),
      requsetFn: () => { },
      catalogId: 0,
      collectUpdate,
      selectList: [],
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.loadTypeList()
  },
  methods: {
    loadTypeList () {
      this.loadTable(this.searchForm, getAllList)
      getList().then(({ data }) => {
        this.catalogList = data.data
        this.isLoadTable = false
      })
    },
    loadPage () {
      if (this.catalogId == 0) {
        this.loadTypeList()
      } else {
        this.searchForm.collectionId = this.catalogId
        this.loadTable(this.searchForm, getListById)
      }
    },
    catalogSelect (id) {
      if (id == -1) {
        // 获取全部
        this.loadTypeList()
      } else {
        this.catalogId = id
        this.loadPage()
      }
    },
    nemuOpen (index) {
      this.pageTitle = this.catalogList[index].name
      this.catalogId = this.catalogList[index].id
      this.loadPage()
    },
    nemuColse (index) {
      this.catalogId = this.catalogList[index].id
      this.loadPage()
    },
    handleSelectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    // 新增目录
    catalogCreate (id) {
      this.methodName = '新增'
      this.dialogVisible = true
      this.formData = initFormData()
      this.formData.parentId = id
      this.requsetFn = catalogCreate
    },
    // 重命名
    catalogUpdate (id) {
      this.methodName = '重命名'
      this.dialogVisible = true
      this.formData = initFormData()
      this.formData.id = id
      this.requsetFn = catalogUpdate
    },
    catalogCancel () {
      this.formData = {}
      this.dialogVisible = false
    },
    catalogSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.requsetFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.catalogCancel()
            this.loadTypeList()
          })
        } else {
          return false
        }
      })
    },
    // 删除目录
    catalogDelete (id) {
      this.$confirm('收藏在该目录下的材料都将被取消收藏，请确认是否删除该目录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        catalogDelete(id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadTypeList()
        })
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // 移动
    handleMore (row) {
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量移动
    handleMoreAll () {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请至少选择一项数据！')
        return
      }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
    },
    // 取消收藏
    handleNotCollect (row) {
      farelationDelete(row.id).then(() => {
        this.loadPage()
      })
    },
    // 批量取消收藏
    handleNotCollectAll () {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请至少选择一项数据！')
        return
      }
      farelationDelete(this.multipleSelection).then(() => {
        this.loadPage()
      })
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
      this.$refs['share'].open([row], `对“${row.name}”的分享`)
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
  height: 100ch;
  .title {
    margin-bottom: 15px;
    font-size: 16px;
  }
  .item-tpl {
    display: flex;
    .item-name {
      flex: 1;
    }
    i {
      line-height: 50px;
    }
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
  border-right: 1px solid #e5e5e5;
  .el-card {
    border: 0;
  }
}
.el-button--warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  &:hover {
    color: #fff;
    background-color: #e6a23c;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-submenu__title,
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.sub-menu-left >>> .el-dropdown {
  top: -5px;
}
</style>



