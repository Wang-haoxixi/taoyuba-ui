<template>
  <el-table class="table" ref="multipleTable" v-loading="isLoadTable" :data="pagedTable" style="width: 100%;" @selection-change="handleSelectionChange" @current-change="handleCurrentChange" :highlight-current-row="isHighlightCurrentRow" :header-cell-style="getRowClass" v-bind="$attrs">
    <el-table-column v-if="isMutipleSelection" type="selection" :selectable="checkboxInit" width="55" :align="align">
    </el-table-column>
    <el-table-column v-if="isIndex" type="index" width="50" :align="align">
    </el-table-column>
    <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columnMap" :key="idx" :align="align">
      <template slot-scope="scope">
        <span v-if="scope.row[item.prop] === 0 && item.type !== 'status' && item.type !== 'TAGSTATUS'">0</span>
        <span v-if="scope.row[item.prop] && item.type === 'date'">{{
          scope.row[item.prop] | parseTime('{y}-{m}-{d} {h}:{i}')
          }}</span>
        <span v-if="scope.row[item.prop] && item.type === 'time'">{{
          scope.row[item.prop] | parseTime('{y}-{m}-{d}')
          }}</span>
        <!-- 系统用户角色字段TAG -->
        <table-tag-list v-if="scope.row[item.prop] && item.type === 'SYSUSERROLELIST'" :list-data="scope.row[item.prop]" :type="item.type"></table-tag-list>
        <!-- 系统日志类型字段TAG -->
        <table-tag-list v-if="item.type === 'SYSLOGTYPEDICT'" :list-data="scope.row[item.prop]" :type="item.type"></table-tag-list>
        <!-- TAG状态 -->
        <table-tag-list v-if="item.type === 'TAGSTATUS'" :list-data="scope.row[item.prop]" :type="item.type"></table-tag-list>
        <!-- TAG所属分类 -->
        <table-tag-list v-if="item.type === '所属分类'" :list-data="scope.row[item.prop]" :type="item.type"></table-tag-list>
        <span v-if="scope.row[item.prop] && item.type === undefined">{{
          scope.row[item.prop]
          }}</span>
        <span v-if="scope.row[item.prop] === null">{{ '暂无' }}</span>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import tableTagList from '@/components/deprecated/table-tag-list'
export default {
  inheritAttrs: false,
  props: {
    checkboxInit: {
      type: Function,
      default: null,
    },
    isLoadTable: {
      type: Boolean,
      required: true,
    },
    isMutipleSelection: {
      type: Boolean,
      required: false,
    },
    isHighlightCurrentRow: {
      type: Boolean,
      required: false,
    },
    isIndex: {
      type: Boolean,
      required: false,
    },
    pagedTable: {
      type: Array,
      required: true,
      default: () => [],
    },
    columnMap: {
      type: Array,
      required: true,
      default: () => [],
    },
    align: {
      type: String,
      required: false,
      default: 'left',
    },
  },
  components: {
    tableTagList,
  },
  data () {
    return {}
  },
  created () {
    this.$emit('handleRef', this.$refs)
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#000'
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  > .th {
    background: #ccc !important;
  }
}
</style>
