<template>
  <div class="tree-table">
    <el-table :data="data" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 子级-开始 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.childrens" :show-header="false" :style="tableStyle" :row-style="rowStyle" v-if="scope.row.childrens.length>0"  @selection-change="childSelectionChange">
            <el-table-column width="48"></el-table-column>
            <el-table-column type="selection" width="55" class-name="child-column"></el-table-column>
            <el-table-column
              class-name="child-column"
              :label="option.props[0].label"
              :prop="option.props[0].prop">
              <template slot-scope="childScope">
                <slot v-if="option.props[0].slot" :name="option.props[0].prop" :scope="childScope.row" :index="`${scope.$index}-${childScope.$index}`"></slot>
                <div v-else>{{childScope.row[option.props[0].prop]}}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in option.props.slice(1)"
              :key="index"
              :label="item.label"
              :prop="item.prop">
              <template slot-scope="childScope">
                <slot v-if="item.slot" :name="item.prop" :scope="childScope.row" :index="`${scope.$index}-${childScope.$index}`"></slot>
                <div v-else>{{childScope.row[item.prop]}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="add-child" @click="handleChild(scope)" v-if="permissionAdd">新增子分类</div>
        </template>
      </el-table-column>
      <!-- 子级-结束 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="(item, index) in option.props"
        :key="index"
        :label="item.label"
        :prop="item.prop">
        <template slot-scope="scope">
          <slot v-if="item.slot" :name="item.prop" :scope="scope.row" :index="scope.$index"></slot>
          <div v-else>{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
    </el-table>
    <iep-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="initPageSize" layout="total, sizes, prev, pager, next" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {},
    },
    option: {
      type: Object,
      default: () => {},
    },
    permissionAdd: {
      type: Boolean,
      default: false,
    },
    pageOptionSize: {
      type: Number,
      default: 10,
    },
    pagination: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      tableStyle: {},
      rowStyle: {
      },
      parentList: [],
      childList: [],
    }
  },
  computed: {
    initPageSize () {
      const { pageOptionSize } = this
      return [pageOptionSize, pageOptionSize * 2, pageOptionSize * 3, pageOptionSize * 4]
    },
  },
  methods: {
    handleSelectionChange (val) {
      this.parentList = val.map(m => m.id)
      this.$emit('selectChange', this.parentList.concat(this.childList))
    },
    childSelectionChange (val) {
      this.childList = val.map(m => m.id)
      this.$emit('selectChange', this.childList.concat(this.parentList))
    },
    handleChild (row) {
      this.$emit('handleChild', row)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
  },
}
</script>

<style lang="scss">
.add-child {
  height: 50px;
  color: #999;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.child-column {
  padding-left: 30px !important;
}
.el-table__expanded-cell {
  padding: 0 !important;
}
</style>
