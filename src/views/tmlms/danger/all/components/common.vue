<template>
  <div>
    <operation-container>
      <template slot="left">
        <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
      </template>
      <template slot="right">
        <el-button @click="backPage" size="small">返回</el-button>
      </template>
    </operation-container>
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="shipName"
          label="船名号">
        </el-table-column>
        <el-table-column
          prop="enterprise"
          label="排查单位">
        </el-table-column>
        <el-table-column
          prop="registrant"
          label="排查人员">
        </el-table-column>
        <el-table-column
          prop="address"
          label="排查地点">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="排查时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" size="small">查看</el-button>
              <!-- v-if="scope.row.status === 1" -->
            <el-button @click="handleUpdate(scope.row)" size="small" v-if="scope.row.status === 1">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :current-page.sync="params.current"
          :page-size="params.size"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getPage } from '@/api/tmlms/danger'

export default {
  props: {
    shipName: String,
  },
  data () {
    return {
      params: {
        current: 1,
        size: 10,
        reportType: 0,
      },
      total: 0,
      tableData: [],
      loading: false,
      statue: 'createNoSearch',
    }
  },
  methods: {
    onSearch () {
      this.params.current = 1
      this.getList()
    },
    getList () {
      this.params.shipName = this.shipName
      this.loading = true
      getPage(this.params).then(({ data }) => {
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data.records
          this.total = data.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleCreate () {
      this.$emit('open', 'createNoSearch')
    },
    handleUpdate (row) {
      this.$emit('open', 'update', row.id)
    },
    handleDetail (row) {
      this.$emit('open', 'detail', row.id)
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
    backPage () {
      this.$router.push('/account/standing')
    },
  },
}
</script>
<style scoped lang="scss"></style>