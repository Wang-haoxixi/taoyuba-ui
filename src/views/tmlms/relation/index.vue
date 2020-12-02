<template>
  <basic-container>
    <page-header title="联系记录"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain v-if="relation_ship_add">新增</iep-button>
      </template>
    </operation-container>
    <el-table
      :data="pagedTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="villageName"
        label="基层名">
      </el-table-column>
      <el-table-column
        prop="shipName"
        label="渔船名">
      </el-table-column>
      <el-table-column
        prop="relationshipType"
        label="联系设备">
      </el-table-column>
      <el-table-column
        prop="relationshipContent"
        label="联系事由">
      </el-table-column>
      <el-table-column
        prop="relationshipTime"
        label="联系时间">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDetail(scope.row)">详情</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="relation_ship_edit"
            size="mini"
            type="text"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="relation_ship_delete"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </basic-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getPage, removePage } from '@/api/tmlms/relation'
import map from './map'
export default {
  data () {
    return {
      map,
      pagedTable: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
      relation_ship_add: false,
      relation_ship_edit: false,
      relation_ship_delete: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.relation_ship_add = this.permissions['relation_ship_add']
    this.relation_ship_edit = this.permissions['relation_ship_edit']
    this.relation_ship_delete = this.permissions['relation_ship_delete']
  },
  methods: {
    getList () {
      getPage(this.params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/relation_ship/form',
        query: {
          status: 'add',
        },
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/relation_ship/form',
        query: {
          id: row.id,
          status: 'detail',
        },
      })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        removePage(row.id).then(({ data }) => {
          if (data.code === 0) {
            this.params.current = 1
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: '/relation_ship/form',
        query: {
          id: row.id,
          status: 'update',
        },
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>