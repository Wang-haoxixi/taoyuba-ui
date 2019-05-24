<template>
  <div class="content-footer">
    <div style="text-align: right;">
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="paginationOption.current" 
        :page-sizes="[10, 20, 30, 40]" 
        :page-size="paginationOption.size" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="paginationOption.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['paginationOption'],
  methods: {
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.content-footer {
  margin-top: 10px;
  padding-bottom: 5px;
  background: #fff;
}
</style>
