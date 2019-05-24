<template>
  <div class="pagination">
    <div style="text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination[propsName.currentPage]"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination[propsName.pageSize]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mergeWith from 'lodash/mergeWith'
export default {
  name: 'govPagination',
  props: {
    // 分页参数
    pagination: {
      type: Object,
      default () {
        return {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        }
      },
    },
    // 当前页名称
    props: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  watch: {
    props: {
      handler (newVal) {
        this.propsName = mergeWith(this.propsName, newVal)
      },
      deep: true,
    },
  },
  data () {
    return {
      propsName: {
        currentPage: 'currentPage',
        pageSize: 'pageSize',
      },
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
    },
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  padding-bottom: 5px;
  background: #fff;
}
</style>
