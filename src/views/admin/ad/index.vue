<template>
  <basic-container>
    <page-header title="广告位管理"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
      </template>
    </operation-container>
    <el-table
      :data="pagedTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="client"
        label="客户端">
        <template slot-scope="scope">
          <span>{{getLabel(scope.row.client, maps.client)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" label-width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleAddAd(scope.row)">新增广告图片</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" :current-page.sync="params.current" @current-change="currentChange"></el-pagination>
    </div>
  </basic-container>
</template>
<script>
import { getPosList, removePosPage } from '@/api/admin/ad'
import maps from './maps'
export default {
  data () {
    return {
      pagedTable: [],
      maps,
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getPosList(this.params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/admin/posForm',
        query: {
          status: 'create',
        },
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: '/admin/posForm',
        query: {
          status: 'update',
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
          removePosPage(row.id).then(({ data }) => {
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
    handleAddAd () {
      this.$router.push({
        path: '/admin/posForm',
        query: {
          status: 'createAd',
        },
      })
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
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
  .ad-container {}
</style>