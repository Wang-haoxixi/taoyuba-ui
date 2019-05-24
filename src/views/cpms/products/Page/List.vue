<template>
  <div>
    <basic-container>
      <iep-page-header title="产品系列"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="cpms_products_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">只看我登记的</el-checkbox>
            <el-checkbox label="2">只看我负责的</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <iep-table-link-img-desc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name" @m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <iep-tag-detail :value="scope.row.chargeNames"></iep-tag-detail>
          </template>
        </el-table-column>
        <el-table-column label="上线时间">
          <template slot-scope="scope">
            {{scope.row.onlineTime | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button :disabled="isEditDelPermissions(scope.row)" type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button :disabled="isEditDelPermissions(scope.row)" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getProductPage, postProduct, putProduct, deleteProductById } from '@/api/cpms/product'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
export default {
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
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postProduct,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putProduct,
        methodName: '修改',
        id: row.id,
      })
    },
    handleDetail (row) {
      if (!this.isViewPermissions(row)) {
        return
      }
      this.$emit('onDetail', {
        id: row.id,
      })
      // this.$router.push({
      //   path: `/cpms_spa/product_detail/${row.id}`,
      // })
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
