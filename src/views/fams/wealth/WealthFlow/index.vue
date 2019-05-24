<template>
  <div>
    <basic-container>
      <page-header title="财富流水" :replaceText="replaceText" :data="[10 ,5,10,25]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <template slot="before-columns">
          <el-table-column label="流水号" width="200">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AdvanceSearch from './AdvanceSearch'
import { getWealthFlowPage } from '@/api/fams/wealth_flow'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（支出：${data[0]}笔${data[0]}贝，收入：${data[0]}笔${data[0]}贝）`,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, userId: this.userInfo.userId }, getWealthFlowPage)
    },
  },
}
</script>