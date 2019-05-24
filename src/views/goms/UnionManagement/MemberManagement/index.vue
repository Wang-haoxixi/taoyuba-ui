<template>
  <div>
    <basic-container>
      <page-header title="联盟成员"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.realName}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <iep-button @click="handleResetPass(scope.row)" plain>重置密码</iep-button>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail-drawer ref="DetailDrawer"></detail-drawer>
  </div>
</template>
<script>
import { getUserPage } from '@/api/goms/union'
import { resetPassByUserId } from '@/api/admin/user'
import mixins from '@/mixins/mixins'
import { dictsMap } from '@/views/hrms/EmployeeProfile/options'
import DetailDrawer from '@/views/hrms/EmployeeProfile/Page/DetailDrawer.vue'
export default {
  mixins: [mixins],
  components: { DetailDrawer },
  data () {
    return {
      dictsMap,
      columnsMap: [
        {
          prop: 'staffNo',
          label: '工号',
        },
        {
          prop: 'phone',
          label: '手机',
        },
        {
          prop: 'assetOrg',
          label: '资产所属',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleResetPass (row) {
      this._handleComfirm(row.userId, resetPassByUserId, '重置密码为123456')
    },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.userId
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getUserPage)
    },
  },
}
</script>
