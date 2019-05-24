<template>
  <div class="contract">
    <div class="head">
      <iep-button type="primary" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail">
      <template slot="before-columns">
        <el-table-column prop="operation" label="联系人姓名">
          <template slot-scope="scope">
            <iep-table-link>{{scope.row.contactName}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="创建人" width="250px" v-if="record.collaborations.length !==0">
        <template slot-scope="scope">
          <div>
            <div class="line">
              <iep-img-avatar :size="30" :src="scope.row.avatar" alt="头像"></iep-img-avatar>
            </div>
            <div class="create-name line">
              {{scope.row.realName}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.creatorId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-drawer ref="EditDrawer" @load-page="loadPage" @async="async"></edit-drawer>
    <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import { fetchList, deleteDataById, createData, updateData, getContactById } from '@/api/crms/contact'
import EditDrawer from './EditDrawer'
import DetailDrawer from './DetailDrawer'
import { mapGetters } from 'vuex'
export default {
  name: 'contract',
  mixins: [mixins],
  components: { EditDrawer, DetailDrawer },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      columnsMap,
      formData: {},
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    async () {
      this.$emit('load-page')
    },
    loadPage (param = { ...this.searchForm, clientId: this.record.id }) {
      this.loadTable(param, fetchList)
    },
    handleAdd () {
      this.$refs['EditDrawer'].methodName = '新增'
      this.$refs['EditDrawer'].formRequestFn = createData
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].id = this.record.id
    },
    handleEdit (row) {
      getContactById(row.clientContactId).then(({ data }) => {
        this.$refs['EditDrawer'].form = data.data
      })
      this.$refs['EditDrawer'].methodName = '编辑'
      this.$refs['EditDrawer'].formRequestFn = updateData
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].id = this.record.id
      this.$refs['EditDrawer'].clientContactId = row.clientContactId
    },
    handleDetail (row, column) {
      if (column.label == '操作' || column.type == 'selection' || column.type == 'index') {
        return false
      }
      getContactById(row.clientContactId).then(({ data }) => {
        this.$refs['DetailDrawer'].form = data.data
      })
      this.$refs['DetailDrawer'].methodName = '详情'
      this.$refs['DetailDrawer'].drawerShow = true
    },
    handleDeleteById (row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteDataById(row.clientContactId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('load-page')
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
  },

}
</script>

<style lang="scss" scoped>
.contract {
  .head {
    margin-bottom: 10px;
  }
}
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
