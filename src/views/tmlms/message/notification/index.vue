<template>
  <div>
    <basic-container>
      <page-header title="管理通报"></page-header>
      <!-- <iep-tabs v-model="type" :tab-list="announcementTypeList" @tab-click="changeType"></iep-tabs> -->
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary">发布通报</iep-button>
        </template>
        <template slot="right">
          <span class="width180"><el-input v-model.trim="params.bulletinFromName" placeholder="主题" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getList">搜索</el-button>
        </template>
      </operation-container>
      <el-table
        :data="pagedTable"
        stripe
        style="width: 100%">
        <el-table-column
          prop="bulletinTitle"
          label="通报主题">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="params.size" :current-page.sync="params.current" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getPage } from '@/api/tmlms/message/notification'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      pagedTable: [],
      params: {
        current: 1,
        size: 10,
        bulletinTitle: '',
      },
      total: 0,
      form: {},
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let params = {}
      for (let key in this.params) {
        if (this.params[key] !== '') {
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
        path: '/notification/form',
        query: {
          status: 'add',
        },
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: '/notification/form',
        query: {
          status: 'detail',
          id: row.id,
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
