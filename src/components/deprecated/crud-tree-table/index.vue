<template>
  <el-table class="table" ref="multipleTable" v-loading="isLoadTable" :data="formatData" style="width: 100%;" @selection-change="handleSelectionChange" @current-change="handleCurrentChange" :highlight-current-row="isHighlightCurrentRow" :header-cell-style="getRowClass" :row-style="showRow" :cell-class-name="cellClassName" v-bind="$attrs">
    <el-table-column v-if="isMutipleSelection" type="selection" width="55" :align="align">
    </el-table-column>
    <el-table-column v-if="isIndex" type="index" width="50" :align="align">
    </el-table-column>
    <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columnMap" :key="idx" :align="align">
      <template slot-scope="scope">
        <!-- eslint-disable -->
        <span v-if="idx === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <!-- eslint-enable -->
        <span class="tree-ctrl" v-if="iconShow(idx,scope.row)" @click="toggleExpanded(scope)">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
          <i v-else class="el-icon-caret-bottom"></i>
        </span>
        <span v-if="scope.row[item.prop] === 0 && item.type !== 'status' && item.type !== 'TAGSTATUS'">0</span>
        <span v-if="scope.row[item.prop] && item.type === 'date'">{{
          scope.row[item.prop] | parseTime('{y}-{m}-{d} {h}:{i}')
          }}</span>
        <span v-if="scope.row[item.prop] && item.type === 'time'">{{
          scope.row[item.prop] | parseTime('{y}-{m}-{d}')
          }}</span>
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
import treeToArray from './eval'
export default {
  inheritAttrs: false,
  props: {
    isLoadTable: {
      type: Boolean,
      require: true,
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
    evalFunc: {
      type: Function,
      default: null,
    },
    evalArgs: {
      type: Array,
      default: () => [],
    },
    expandAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
  },
  data () {
    return {}
  },
  computed: {
    // 格式化数据源
    formatData () {
      let tmp
      if (!Array.isArray(this.pagedTable)) {
        tmp = [this.pagedTable]
      } else {
        tmp = this.pagedTable
      }
      const func = this.evalFunc || treeToArray
      const args = [tmp, this.expandAll]
      return func.apply(null, args)
    },
  },
  created () {
    this.$emit('handleRef', this.$refs)
  },
  methods: {
    cellClassName ({ row }) {
      const { _level } = row
      if (_level === 1) {
        return 'cell-master'
      }
      if (_level == 2) {
        return 'cell-child'
      }
      if (_level == 3) {
        return 'cell-sub'
      }
    },
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
    showRow (row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true
      row.row._show = show
      return show
        ? 'animation:treeTableShow 1s;'
        : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded (scope) {
      const record = this.formatData[scope.$index]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return index === 0 && record.children && record.children.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  & > .th {
    background: #ccc !important;
  }
  & > .ms-tree-space {
    position: relative;
    top: 1px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  & > .cell {
    display: flex;
    span.ms-tree-space {
      display: block;
    }
  }
  & > .cell-master {
    background-color: #fff;
  }
  & > .cell-child {
    background-color: #f7f7f7;
  }
  & > .cell-sub {
    background-color: #f1f1f1;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #666;
    margin-left: -18px;
  }
}
</style>
