<template>
  <div class="content-footer">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next" :total="paginationOption.total" :pager-count="5" prev-text="上一页" next-text="下一页" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'IepPagination',
  props: {
    paginationOption: {
      type: Object,
      require: true,
      default: () => { },
    },
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
  },
}
</script>
<style scoped>
.content-footer {
  padding-bottom: 5px;
  background: #fff;
  position: relative;
  height: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px 20px;
  box-sizing: content-box;
}
.content-footer >>> .el-pagination {
  text-align: right;
}
.content-footer >>> .btn-prev {
  padding: 0 15px;
}
.content-footer >>> .btn-next {
  padding: 0 15px;
}
/* .content-footer
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  font-weight: 400;
  background-color: #fb5966;
  color: #ccdfe6;
} */
.content-footer >>> .el-range-editor.is-active,
.content-footer >>> .el-range-editor.is-active:hover,
.content-footer >>> .el-select .el-input.is-focus .el-input__inner,
.content-footer >>> .el-pagination__sizes .el-input .el-input__inner:hover,
.content-footer
  >>> .el-form-item__content
  .el-input.is-active
  .el-input__inner {
  border-color: #ccdfe6;
}
</style>
