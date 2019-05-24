<template>
  <!-- 待办提醒 -->
  <gov-layout-main>
     <!-- 新增按钮 -->
    <gov-layout-button-group>
      <gov-button @click="handleBatchRead">标记已读</gov-button>
    </gov-layout-button-group>
    <gov-layout-body>
       <avue-crud
          :page="pagination"
          :data="tableData"
          :table-loading="tableLoading"
          :option="tableOption"
          @current-change="currentChange"
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @selection-change="selectionChange"
          >
      </avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import mixin from "@/mixins/mixin"
import { fetchList, batchRead } from '@/api/msgManage/toRemind'
import { tableOption } from './const/index'
export default {
  mixins: [mixin],
  name: 'toRemind',
  data () {
    return {
      tableData: [],
      dialogStatus: 'detail',
      tableLoading: false,
      tableOption: tableOption,
      selectedData: [],
    }
  },
  created () {
    this.getList()
  },
  mounted: function () { },
  computed: {
    
  },
  methods: {
    getList () {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.pagination.total = response.data.total
        this.tableLoading = false
      })
    },
    selectionChange (data) {
      this.selectedData = data
    },
    //批量已读
    handleBatchRead () {
      if (this.selectedData.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        let ids = []
        this.selectedData.forEach(item=>{
          ids.push(item.id)
        })  
        batchRead(ids).then(()=>{
          this.getList()
          this.$message.success('批量已读成功')
        })
      }  
    },
  },
}
</script>

<style lang="scss" scoped>
</style>

