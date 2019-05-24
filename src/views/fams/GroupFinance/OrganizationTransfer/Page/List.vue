<template>
  <div>
    <basic-container>
      <iep-page-header title="组织转账"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="cpms_products_add" @click="handleNewly" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">转出</el-checkbox>
            <el-checkbox label="2">转入</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="转入组织" min-width="200px">
        </el-table-column>
        <el-table-column label="金额">
        </el-table-column>
        <el-table-column label="操作时间">
        </el-table-column>
        <el-table-column label="备注">
        </el-table-column>
      </iep-table>
    </basic-container>
    <newly ref="Newly" @save="setNewly"></newly>
  </div>
</template>

<script>
import { getProductPage, deleteProductById } from '@/api/cpms/product'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import Newly from './Newly'
export default {
  components: {
    Newly,
  },
  mixins: [mixins],
  data () {
    return {
      checkList: [],
      isMine: null,
      cpms_products_add: false,
      cpms_products_view: false,
      cpms_products_edit_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.cpms_products_add = this.permissions['cpms_products_add']
    this.cpms_products_view = this.permissions['cpms_products_view']
    this.cpms_products_edit_del = this.permissions['cpms_products_edit_del']
    this.loadPage()
  },
  methods: {
    isEditDelPermissions (row) {
      return !(this.cpms_products_edit_del || this.userInfo.userId === row.creatorId)
    },
    isViewPermissions (row) {
      return this.cpms_products_view || this.userInfo.userId === row.creatorId
    },
    handleNewly () {
      this.$refs['Newly'].dialogShow = true
    },
    handleChangeMe (value) {
      const isMine = value.join(',')
      this.isMine = isMine
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteProductById)
    },
    loadPage (param) {
      this.loadTable({ ...param, isMine: this.isMine }, getProductPage)
    },
  },
}
</script>
