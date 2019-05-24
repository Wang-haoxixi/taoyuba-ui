<template>
  <avue-tree-table class="pdb10" ref="mainTable" :option="option">
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <div class="table-btn-group">
          <!-- 条件项为打开并且是第一级列表的时候可以添加关联条件 -->
          <gov-button v-if="scope.row.id ? true : false" @click="handleDetail(scope.row)" type="text">查看详情</gov-button>
        </div>
      </template>
    </el-table-column>
  </avue-tree-table>
</template>

<script>
import {diagnosisResultColumn} from '../const/diagnosis'
export default {
  props: {
    tableData: {
      default: ()=>[],
      type: Array,
    },
    id: {
      default: "",
      type: String,
    },
  },
  data () {
    return {
      tableOption: {
        border: true,
      },
    }
  },
  computed: {
    option () {
      return {
        expandAll: false,
        data: this.tableData,
        columns: diagnosisResultColumn,
      }
    },
  },
  methods: {
    handleDetail (row) {
      this.$emit('handleDetail', row)
    },
  },
}
</script>

<style lang="scss" scoped>
.ml10{
  margin-left: 10px;
}
.pdb10{
  padding-bottom: 50px
}
</style>
