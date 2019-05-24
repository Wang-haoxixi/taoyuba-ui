<template>
  <!-- 列表 -->
  <div class="fixed-table">
    <avue-crud 
      :table-loading="loading" 
      @size-change="sizeChange" 
      @current-change="currentChange" 
      :page="pagination" 
      :data="data" 
      :option="tableOption">
    </avue-crud>
  </div>
</template>
<script>
import {tableOption} from '../const/index'
export default {
  data () {
    return {
      tableOption,
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sizeChange (val) {
      this.$emit('sizeChange', val)
    },
    currentChange (val) {
      this.$emit('currentChange', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.fixed-table {
  width: calc(100vw - 336px);
}
</style>
