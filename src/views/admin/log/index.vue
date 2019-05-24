<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="formProps"
        @handleFilter="handleFilter"
      />
    </gov-layout-header>
    <gov-layout-button-group>
      <gov-button type="primary" @click="handleClick(list)" text="批量删除"></gov-button> 
    </gov-layout-button-group>
    <gov-layout-body>
      <avue-crud
        :page="pagination"
        :data="tableList"
        :table-loading="tableLoading"
        :option="tableOption"
        @selection-change="selectionChange"
        @current-change="currentChange"
        @size-change="sizeChange">
        <template slot-scope="scope" slot="menu">
          <gov-button type="text" permissions="sys_client_del" size="mini" @click="handleDelete(scope.row)">删除</gov-button>
        </template>
      </avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>
<script>
import { getList, deleteLog, deleteID } from '@/api/admin/log'
import allMixins from '@/mixins/mixin'
import {tableOption} from './const/index'
export default {
  mixins: [allMixins],
  data () {
    return {
      tableOption,
      // 存储批量删除id
      deleteId:[],
      listQuery: {
        type: '',
      },
    }
  },
  computed: {
    formProps () {
      return [
        { label: '类型', prop: 'type', type: 'select', data: this.getDic('IS_NORMAL') },
      ]
    },
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      getList(this.listQuery).then(({data}) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteLog(row.id).then(() => {
          this.getList()
        })
      })
    },
    selectionChange (list){
      this.deleteId = []
      for(let i=0;i<list.length;i++){
        this.deleteId.push(list[i].id) 
      }
      // console.log(list)
    },
    handleClick (){
      var ids = this.deleteId.join(',')
      if( ids.length ==0 ){
        this.$message.error("请先选择")
      }else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteID(ids).then(()=>{
            this.$message.success("删除成功")
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      }
    },
  },
}
</script>
