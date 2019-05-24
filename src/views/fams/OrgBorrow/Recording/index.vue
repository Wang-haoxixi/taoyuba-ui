<template>
  <div>
    <basic-container>
      <page-header title="组织拆借"></page-header>
      <operation-container>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgBorrowPage } from '@/api/fams/org_borrow'
import mixins from '@/mixins/mixins'
import { dictsMap, colMap, tabList } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      type: 'outOrgId',
      tabList,
      dictsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    orgId () {
      return this.userInfo.orgId
    },
    typeQuery () {
      const type = this.type
      return {
        [type]: this.orgId,
      }
    },
    columnsMap () {
      return colMap[this.type]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    changeType () {
      this.loadPage()
    },
    handleAddOrgBorrow () {
      this.$router.push({
        path: '/fams_spa/org_borrow_detail/0',
      })
    },
    handleAddUnionBorrow () {
      this.$router.push({
        path: '/fams_spa/union_borrow_detail/0',
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/org_borrow_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...this.typeQuery, status: 7, ...param }, getOrgBorrowPage)
    },
  },
}
</script>
