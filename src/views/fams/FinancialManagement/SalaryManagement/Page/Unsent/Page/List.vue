<template>
  <div class="set-container">
    <operation-container>
      <template slot="left">
        <span class="sub-title">
          共<span class="sum">4</span>笔，共计实发工资：<span class="sum">16198.74</span>元，共计银行代发：<span class="sum">999.74</span>元，共计内网发放：<span class="sum">6000</span>元
        </span>
        <iep-button type="danger" plain>补发上传</iep-button>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="120">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="default" @click="handleDetail(scope.row)">查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getAssessmentManagementPage, deletePublishRecruitment } from '@/api/hrms/assessment_management'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deletePublishRecruitment)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    clearSearchParam () {
      this.searchForm = initSearchForm()
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getAssessmentManagementPage)
    },
  },
}
</script>
