<template>
  <div>
    <basic-container>
      <page-header title="我的联系人" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="primary" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="'contactName'">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :cell-style="mixinsCellPointerStyle" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="contactDetail">
        <el-table-column prop="operation" label="对应客户" width="460">
          <template slot-scope="scope">
            <span class="contact-tag" v-for="(item,index) in scope.row.clientInfos" :key="index">{{item.clientName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" plain type="warning">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { fetchList, deleteDataById, createData, updateData, getContactById } from '@/api/crms/contact'
import { columnsMap, initSearchForm } from '../options'
import DetailDrawer from './DetailDrawer'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { DetailDrawer, AdvanceSearch },
  data () {
    return {
      dictsMap: {},
      columnsMap,
      dictData: [],
      paramForm: initSearchForm(),
      dialogShow: false,
      detailForm: {},
      replaceText: (data) => `（本周新增${data[0]}个联系人）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientContactId, deleteDataById)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: updateData,
        methodName: '编辑',
        id: row.clientContactId,
      })
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: createData,
        methodName: '新增',
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
    },
    contactDetail (row, column) {
      if (column.label == '操作' || column.type == 'selection') {
        return false
      }
      this.$refs['DetailDrawer'].drawerShow = true
      getContactById(row.clientContactId).then(res => {
        this.$refs['DetailDrawer'].detailForm = res.data.data
      })
    },
    close () {
      this.dialogShow = false
    },
  },
}
</script>
<style lang="scss" scoped>
.contact-tag {
  display: inline-block;
  margin: 5px 5px;
  padding: 5px 5px;
  border-radius: 4px;
  background: #f3f2f2;
  font-size: 12px;
}
</style>

