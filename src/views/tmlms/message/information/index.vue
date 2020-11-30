<template>
  <div class="information-container">
    <basic-container>
      <page-header title="我的消息"></page-header>
      <el-row :gutter="20">
        <el-col :span="6">
           <el-menu
            :default-active="menuActive">
            <el-menu-item :index="item.index" v-for="item in menu" :key="item.index" @click="onMenu(item)">
              <i class="el-icon-message"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
           </el-menu>
        </el-col>
        <el-col :span="18">
          <el-table
            :data="pagedTable"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="消息">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: center;margin: 20px 0;">
            <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" :current-page.sync="params.current" @current-change="currentChange"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { getPage } from '@/api/tmlms/message/information'
export default {
  data () {
    return {
      menuActive: '1',
      menu: [
        { label: '系统', value: '1', index: '1' },
        { label: '合同', value: '2', index: '2' },
        { label: '其他', value: '9', index: '3' },
      ],
      pagedTable: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
    }
  },
  watch: {
    menuActive () {
      this.params.current = 1
      this.total = 0
      this.getList()
    },
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let params = Object.assign({}, this.params)
      params.type = this.menu[this.menuActive - 1].value
      getPage(params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/information/form',
        query: {
          id: row.id,
          status: 'detail',
        },
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
    onMenu (row) {
      this.menuActive = row.index
    },
  },
}
</script>
<style lang="scss" scoped>
</style>