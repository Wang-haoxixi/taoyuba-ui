<template>
  <div>
    <div class="head">
      <div class="title">国脉集团研发中心近期工作清单</div>
      <div class="button"><iep-button @click="back">返回</iep-button></div>
    </div>
    <operation-container>
      <template slot="left">
          <iep-button @click="handleAdd" size="small" type="primary">添加数据</iep-button>
          <iep-button @click="handleSet" size="small">工作表设置</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index
      isMutipleSelection
      @selection-change="selectionChange">
    </iep-table>
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
    <setup-dialog ref="setupDialog"></setup-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { workListTable, dictsMap } from './option'
import { fetchList, createData } from '@/api/crms/custom'
import mainFormDialog from './mainDialog'
import SetupDialog from './setupDialog'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { mainFormDialog, SetupDialog },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: workListTable,
      webState: true,
      info: {},
    }
  },
  methods: {
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleSet () {
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['setupDialog'].dialogShow = true
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    back () {
      this.$emit('back', true)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
}
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
  // text-decoration: underline;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
