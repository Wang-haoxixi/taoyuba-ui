<template>
  <basic-container>
    <page-header title="劳务纠纷管理"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" v-if="labor_disputes_add">新增</iep-button>
      </template>
      <template slot="right">
        <span class="width180"><el-input v-model.trim="params.shipowner" placeholder="船东" size="small" clearable></el-input></span>
        <span class="width180"><el-input v-model.trim="params.crewRealName" placeholder="船员" size="small" clearable></el-input></span>
        <span class="width180"><el-input v-model.trim="params.shipName" placeholder="渔船名" size="small" clearable></el-input></span>
        <el-button size="small"  @click="onSearch">搜索</el-button>
      </template>
    </operation-container>
    <el-table
      :data="pagedTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shipName"
        label="渔船名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="shipowner"
        label="船东"
        width="180">
      </el-table-column>
      <el-table-column
        prop="crewRealName"
        label="船员"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="纠纷状态"
        width="180">
        <template slot-scope="scope">
          <span>{{getLabel(scope.row.status, maps.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="disputeReason"
        label="纠纷原因"
        width="180">
        <template slot-scope="scope">
          <span>{{getLabel(scope.row.disputeReason, maps.disputeReason)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.row)">查看</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)" v-if="labor_disputes_scroe">打分</el-button> -->
            <el-button
            size="mini"
            @click="handleEdit2(scope.row)" v-if="labor_disputes_edit && scope.row.status !== 1">编辑</el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.row)" v-if="labor_disputes_delete && scope.row.status !== 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size="params.size"
        :current-page.sync="params.current"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </basic-container>
</template>
<script>
import { getPage, removePage } from '@/api/tmlms/laborDisputes/index'
import maps from './maps'
import { mapGetters } from 'vuex'
import queryMixin from '@/mixins/query'
export default {
  mixins: [queryMixin],
  data () {
    return {
      maps,
      params: {
        current: 1,
        size: 10,
        shipName: '',
        shipowner: '',
        crewRealName: '',
      },
      status: 'create',
      total: 10,
      pagedTable: [],
      labor_disputes_add: false,
      labor_disputes_edit: false,
      labor_disputes_delete: false,
      labor_disputes_scroe: false,
    }
  },
  mounted () {
    this.getQuery()
    this.getList()
    this.labor_disputes_add = this.permissions['labor_disputes_add']
    this.labor_disputes_edit = this.permissions['labor_disputes_edit']
    this.labor_disputes_delete = this.permissions['labor_disputes_delete']
    this.labor_disputes_scroe = this.permissions['labor_disputes_scroe']
  },
  computed: {
     ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    onSearch () {
      this.params.current = 1
      this.setQuery()
      this.getList()
    },
    getList () {
      let params = {}
      for(let key in this.params) {
        if (this.params[key]) {
          params[key] = this.params[key]
        }
      }
      getPage(params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/laborDisputes/form',
        query: {
          status: 'create',
        },
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: '/laborDisputes/form',
        query: {
          status: 'update',
          id: row.id,
          type: 1,
        },
      })
    },
    handleEdit2 (row) {
      this.$router.push({
        path: '/laborDisputes/form',
        query: {
          status: 'update',
          id: row.id,
          type: 2,
        },
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/laborDisputes/form',
        query: {
          status: 'detail',
          id: row.id,
        },
      })
    },
    handleDelete (row) {
      this.$confirm('是否确认删除此条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          removePage(row.id).then(({ data }) => {
            if (data.code === 0) {
              this.$notify({
                message: '删除成功',
                type: 'success',
              })
              this.params.current = 1
              this.getList()
            }
          })
        })
    },
    currentChange (val) {
      this.params.current = val
      this.setQuery({ current: this.params.current })
      this.getList()
    },
    getLabel (value, dic) {
      let result = ''
      for (let i = 0, len = dic.length; i < len; i++) {
        if (dic[i].value === value) {
          result = dic[i].label
          break
        }
      }
      return result
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>