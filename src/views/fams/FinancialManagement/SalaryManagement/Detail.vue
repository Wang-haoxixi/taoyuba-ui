<template>
  <div>
    <basic-container>
      <page-header title="工资发放" :replaceText="replaceText" :data="[120,12,32,4]" :backOption="backOption">
        <iep-button type="danger" plain>补发上传</iep-button>
      </page-header>
      <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="120">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="default" @click="handleDetail(scope.row)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getSalaryByIdPage } from '@/api/fams/salary'
import mixins from '@/mixins/mixins'
import { dictsMap, detailColumnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap: detailColumnsMap,
      replaceText: (data) => `（共${data[0]}笔，共计实发工资：${data[1]}元，共计银行代发：${data[2]}元，共计内网发放：${data[3]}元）`,
      backOption: {
        isBack: true,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$openPage(`/fams_spa/salary_person_detail/${row.id}`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSalaryByIdPage(this.$route.params.id))
    },
  },
}
</script>
