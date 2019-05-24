<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="formProps"
        @handleFilter="handleFilter"
      />
      <!-- 按钮组 -->
      <gov-layout-button-group>
        <gov-button type="add" @click="handleCreate" v-if="permissions.generator_syssocialdetails_add"/>
        <!-- <gov-button type="add" @click="handleCreate"/> -->
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="tableOption">
        <template slot-scope="scope" slot="menu">
          <el-button type="text" v-if="permissions.generator_syssocialdetails_edit" @click="handleUpdate(scope.row, scope.index);">编辑</el-button>
          <el-button type="text" v-if="permissions.generator_syssocialdetails_del" @click="handleDelete(scope.row, scope.index);">删除</el-button>
          <!-- <el-button type="text" @click="handleUpdate(scope.row, scope.index)">编辑</el-button> -->
          <!-- <el-button type="text" @click="handleDelete(scope.row, scope.index)">删除</el-button> -->
        </template>
      </avue-crud>
    </gov-layout-body>
    <social-dialog
      :temp="formData"
      :status="dialogStatus"
      @successSubmit="successSubmit"
      ref="formDialog"></social-dialog>
  </gov-layout-main>
</template>

<script>
import {getSocialList, deleteSocial} from '@/api/admin/social'
import { tableOption } from './const/index'
import allMixins from '@/mixins/mixin'
import socialDialog from './socialDialog'
export default {
  name: 'syssocialdetails',
  mixins: [allMixins],
  components: {socialDialog},
  data () {
    return {
      listQuery: {
        type: undefined,
      },
      tableOption,
    }
  },
  computed: {
    formProps () {
      return [
        { label: '类型', prop: 'type', type: 'select', data: this.getDic('SOCIAL_TYPE') },
      ]
    },
  },
  created () {
    this.getList()
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
      getSocialList(this.listQuery).then(({data}) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 新增
    handleCreate () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = {}
      this.open()
    },
    // 编辑
    handleUpdate (row) {
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.open()
    },
    // 成功之后操作
    successSubmit () {
      this.getList()
    },
    // 删除
    handleDelete ({id}) {
      this.$confirm('确定要删除吗').then(() => {
        deleteSocial(id).then(() => {
          this.getList()
        })
      })
    },
  },
}
</script>
