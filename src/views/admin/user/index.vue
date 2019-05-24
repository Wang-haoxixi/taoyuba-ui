<template>
  <div>
    <basic-container>
      <page-header title="用户管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAddUsers()" icon="el-icon-plus" plain>添加用户</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="username">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <iep-tag-detail iep-type="role" :value="scope.row.roleList.map(m => m.name)"></iep-tag-detail>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <iep-button @click="handleResetPass(scope.row)" plain>重置密码</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { dictsMap, columnsMap, initMemberForm } from './options'
import { fetchList, putUser, resetPassByUserId } from '@/api/admin/user'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].form.roleList = this.$refs['DialogForm'].form.roleList.map(m => m.id)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putUser
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleResetPass (row) {
      this._handleComfirm(row.userId, resetPassByUserId, '重置密码为123456')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>