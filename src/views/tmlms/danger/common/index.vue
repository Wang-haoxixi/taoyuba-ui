<template>
  <div>
    <basic-container v-show="show">
      <operation-container>
        <template slot="left">
          <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
        </template>
        <template slot="right">
          <!-- <span><el-input v-model.trim="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span>
          <el-button size="small"  @click="onSearch(params)">搜索</el-button> -->
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
              <el-button @click="handleUpdate(scope.row)" size="small">编辑</el-button>
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
    </basic-container>
    <page-form v-if="showForm" :status="status" @back="onBack" ref="pageForm"></page-form>
  </div>
</template>
<script>
import { getPage } from '@/api/tmlms/danger'
import pageForm from './components/form.vue'

export default {
  components: { pageForm },
  data () {
    return {
      params: {
        urrent: 1,
        size: 10,
      },
      total: 0,
      tableData: [],
      loading: false,
      show: true,
      showForm: false,
      statue: 'create',
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
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
      this.status = 'create'
      this.show = false
      this.showForm = true
    },
    handleUpdate (row) {
      this.status = 'update'
      this.show = false
      this.showForm = true
      this.$nextTick(() => {
        this.$refs.pageForm.getList(row.id)
      })
    },
    handleDetail (row) {
      this.status = 'detail'
      this.show = false
      this.showForm = true
      this.$nextTick(() => {
        this.$refs.pageForm.getList(row.id)
      })
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
    onBack () {
      this.show = true,
      this.showForm = false
    },
  },
}
</script>
<style scoped lang="scss"></style>