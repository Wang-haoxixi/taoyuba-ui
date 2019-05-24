<template>
  <!-- 申请审核 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"/>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="mainTableData"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)">详情</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :formData="formData"></main-dialog>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/'
import mainDialog from './mainDialog'

export default {
  mixins: [allMixin],
  components: {mainDialog},
  data () {
    return {
      searchOption: searchOption,
      mainTableData: [{
        applyName: "申请方",
        lxName: "联系人",
        lxTel: "15395801721",
        lxEmail: "1494233259@qq.com",
        rangeRemark: "使用范围说明",
        auditState: "1",
      }],
      mainTableOption: mainTableOption,
      formData: {},
    }
  },
  computed: {

  },
  methods: {
    // 查看详情
    handleDetail (row) {
      this.$nextTick(()=>{
        this.formData = {...row}
        this.$refs['mainDialog'].open()
      })
    },
  },
}
</script>