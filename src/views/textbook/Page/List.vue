<template>
  <div>
    <basic-container>
      <page-header title="教材管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="hrms_book_add" @click="handleAdd" type="primary" size="small">新增</iep-button>
        </template>
        <template slot="right">
          <span><el-input v-model.trim="params.title" placeholder="请输入教材名称" size="small" clearable></el-input></span>
          <span><el-input type="number" min="0" v-model.trim="params.price" placeholder="价格" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </template>
      </operation-container>
      <el-table
          :data="bookList"
          :header-cell-style="{background:'#eef1f6', color:'#606266'}"
          stripe
          style="width: 100%; margin-top: 30px">
          <el-table-column label="编号" prop="id" width="100">
          </el-table-column>
          <el-table-column label="分类" prop="type">
          </el-table-column>
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
            :width="item.width"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="hrms_book_edit" type="warning" size="mini" @click="handleEdit(scope.row.id)" plain>编辑
              </el-button>
              <el-button v-if="hrms_book_del" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row.id)">
              </el-button>
            </template>
          </el-table-column>
            <el-table-column label="排序" style="width:40px;" prop="sort">
              <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.sort"
                 controls-position="right"
                 @change="handleChange(scope.row)"
                 @blur="handleChange(scope.row)"
                  :min="1"
                 :max="100"
                 size="mini"
                 :id="inputNum">
              </el-input-number>
               </template>
          </el-table-column>
        </el-table>
        <!-- <div style="text-align: center;margin: 20px 0;">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div> -->
    </basic-container>
  </div>
</template>
<script>
import { getBookList, delBook,updateBook }  from '@/api/book'
import { getChild } from '@/api/tmlms/contract'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      bookList: [],
      total: 10,
      params: {
        current: 1,
        size: 10,
        title: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '教材名称',
            value: 'title',
          },
          {
            text: '教材介绍',
            value: 'info',
            width: 350,
          },
          {
            text: '单价',
            value: 'price',
            width: 150,
          },
        ],
      },
      hrms_book_add: false,
      hrms_book_edit: false,
      hrms_book_del: false,
      num:'1',
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
    inputNum () {
        return 'num' + this._uid
    },
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    handleDelete (val) {
      this.$confirm('确定要删除此教材？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        delBook(val).then(() => {
          this.$message.success('删除成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        }) 
      })  
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
      getBookList(this.params).then(data => {
        this.bookList = data.data.data.records
        this.total = data.data.data.total
        this.bookList.forEach(v => {
          getChild(v.type).then(res => {
            v.type = res.data.data.label
          })
          v.price = v.price + '元'
        })
      })
    },
    handleChange (row) {           
               
       let newBook = { id:row.id,sort:row.sort }    
        updateBook(newBook).then(data => {
          if(data.data.data){                    
              this.getData()        
          }
      })      
    },
  },
}
</script>