<template>
  <div>
    <basic-container>
      <page-header title="技术应用"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="cpms_technologys_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChangeMe">
            <el-checkbox label="1">只看我登记的</el-checkbox>
            <el-checkbox label="2">只看我负责的</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
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
import { getTechnologyPage, postTechnology, putTechnology, deleteTechnologyById } from '@/api/cpms/technology'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      checkList: [],
      isMine: null,
      cpms_technologys_add: false,
      cpms_technologys_view: false,
      cpms_technologys_edit_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.cpms_technologys_add = this.permissions['cpms_technologys_add']
    this.cpms_technologys_view = this.permissions['cpms_technologys_view']
    this.cpms_technologys_edit_del = this.permissions['cpms_technologys_edit_del']
    this.loadPage()
  },
  methods: {
    isEditDelPermissions (row) {
      return !(this.cpms_technologys_edit_del || this.userInfo.userId === row.creatorId)
    },
    isViewPermissions (row) {
      return this.cpms_technologys_view || this.userInfo.userId === row.creatorId
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postTechnology,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putTechnology,
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
      //   path: `/cpms_spa/technology_detail/${row.id}`,
      // })
    },
    handleChangeMe (value) {
      const isMine = value.join(',')
      this.isMine = isMine
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTechnologyById)
    },
    loadPage (param) {
      this.loadTable({ ...param, isMine: this.isMine }, getTechnologyPage)
    },
  },
}
</script>
