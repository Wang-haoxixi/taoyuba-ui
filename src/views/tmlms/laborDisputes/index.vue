<template>
  <basic-container>
    <page-header title="劳资纠纷"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button v-if="mlms_ship_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
      </template>
      <template slot="right">
        <span class="width180"><el-input v-model="params.shipName" placeholder="渔船名" size="small" clearable></el-input></span>
        <el-button size="small"  @click="getParamData">搜索</el-button>
      </template>
    </operation-container>
    <el-table
      :data="pagedTable"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shipName"
        label="渔船名"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" :current-page.sync="params.current" @current-change="currentChange"></el-pagination>
    </div>
    <dialog-form :status="status" ref="dialogForm"></dialog-form>
  </basic-container>
</template>
<script>
import { getPage } from '@/api/tmlms/laborDisputes/index'
import DialogForm from './dialogForm'
export default {
  components: {
    DialogForm,
  },
  data () {
    return {
      params: {
        current: 1,
        size: 10,
        shipName: '',
      },
      status: 'create',
      total: 10,
      pagedTable: [],
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getPage(this.params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
      })
    },
    handleAdd () {
      this.status = 'create'
      this.$refs.dialogForm.open()
    },
    handleEdit (row) {
      this.status = 'update'
      this.$refs.dialogForm.open(row)
    },
    handleDelete () {},
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>