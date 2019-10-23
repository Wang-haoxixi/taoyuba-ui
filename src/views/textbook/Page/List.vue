<template>
  <div>
    <basic-container>
      <page-header title="教材管理"></page-header>      
      <operation-container>
        <template slot="left">
          <iep-button v-if="hrms_book_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
      </operation-container>
      <el-table
          :data="bookList"
          stripe
          style="width: 100%">
          <el-table-column label="分类" prop="type">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="ship_change_edit" type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.id)">编辑
              </el-button>
              <el-button v-if="ship_change_del" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </basic-container>      
  </div>
</template>
<script>                                                                    
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      bookList: {},
      options: {
        expandAll: false,
        columns: [
          {
            text: '教材名称',
            value: 'title',
          },
          {
            text: '定价',
            value: 'price',
          },
          {
            text: '具体适用对象',
            value: 'info',
          },
        ],
      },
      hrms_book_add: false,
      hrms_book_edit: false,
      hrms_book_del: false,
    }
  },
  created () {                         
    this.getData()
    this.hrms_book_add = this.permissions['hrms_book_add']
    this.hrms_book_edit = this.permissions['hrms_book_edit']
    this.hrms_book_del = this.permissions['hrms_book_del']
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    handleDelete () {          
      
    },
    handleAdd () {
      this.$router.push({
        path: '/textbook_spa/detail/create/0',
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: `/textbook_spa/detail/update/${id}`,
      })
    },
    getData () {

    },
  },
}
</script>