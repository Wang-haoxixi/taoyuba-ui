<template>
  <div>
    <div v-if="pageState=='list'">
      <div class="info">回款总金额：123,000,000，待收款 <i class="el-icon-question"></i> ：3，000，000，回款率：89%</div>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds" v-if="!lookByMeOnly || permission_edit_del">删除</el-dropdown-item>
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
          <el-table-column label="合同名称" min-width="200px">
            <template slot-scope="scope">
              <div class="row-tpl" @click="handleDetail(scope.row)">
                <div class="custom-name">{{scope.row.contractName}}</div>
                <el-col class="custom-tags">
                  <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tagKeyWords" :key="index" @click="handleTagDetail(item)">{{item}}</el-tag>
                </el-col>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="180" v-if="!lookByMeOnly || permission_edit_del">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" size="small" type="warning" plain>编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <main-dialog ref="mainDialog" @load-page="loadPage" v-if="pageState=='dialog'"></main-dialog>
    <detailDialog ref="detail" @load-page="pageState='list'" v-if="pageState == 'detail'"></detailDialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, getTableDataOnlyMe, createData, deleteData } from '@/api/mlms/material/datum/contract'
import MainDialog from './mainDialog'
import detailDialog from './detail'
import { mapGetters } from 'vuex'
import searchForm from './searchForm'

export default {
  mixins: [mixins],
  components: { MainDialog, detailDialog, searchForm },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      getTableDataFn: getTableDataOnlyMe,
      permission_edit_del: false,
      lookByMeOnly: false,
    }
  },
  methods: {
    handleAdd () {
      this.pageState = 'dialog'
      this.$nextTick(() => {
        this.$refs['mainDialog'].methodName = '新增'
        this.$refs['mainDialog'].formRequestFn = createData
      })
    },
    handleEdit (row) {
      this.pageState = 'dialog'
      this.$nextTick(() => {
        this.$refs['mainDialog'].open(row.id)
      })
    },
    handleDetail (row) {
      // this.$router.push(`/mlms_spa/contract/detail/${row.id}`)
      this.pageState = 'detail'
      this.$nextTick(() => {
        this.$refs['detail'].open(row.id)
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
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param = this.searchForm) {
      this.pageState = 'list'
      this.loadTable(param, this.getTableDataFn)
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
  created () {
    this.loadPage()
    this.permission_edit_del = this.permissions['mlms_datum_ht_edit_del']
  },
}
</script>

<style lang="scss" scoped>
.info {
  color: #666;
  padding: 8px 18px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  i {
    color: #ccc;
    cursor: pointer;
  }
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
