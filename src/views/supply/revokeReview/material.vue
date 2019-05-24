<template>
  <div>
    <gov-layout-header>
      <gov-search-bar :list-query="listQuery" label-width="80px" :form-props="searchOption" @handleFilter="handleFilter"></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        @size-change="sizeChange" 
        @current-change="currentChange" 
        :page="pagination" 
        :table-loading="tableLoading" 
        :data="tableList" 
        :option="mainTableOption"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="onAgree(scope.row)" text="同意"></gov-button>
            <gov-button type="text" @click="onRefuse(scope.row)" text="拒绝"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- <el-dialog title="拒绝撤回责任" :visible.sync="visible" width="30%">
      <el-form :model="form">
        <el-form-item label="备注：" label-width="80px">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.rejectReason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { auditingRevokePage, agreeRevoke, refuseRevoke } from '@/api/supply/material'
import { materialTableOption } from './const/index'
import mixin from '@/mixins/mixin'
import { getDept } from '@/util/dic'

export default {
  mixins: [mixin],
  data () {
    return {
      visible: false,
      form: {
      },
      // 搜索数据
      listQuery: {
        matName: null,
        matCode: null,
        deptId: null,
        respDeptId: null,
      },
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        {
          label: '需求部门',
          prop: 'deptId',
          type: 'select',
          data: getDept(),
        },
        {
          label: '数源部门',
          prop: 'dutyId',
          type: 'select',
          data: getDept(),
        },
      ]
    },
    mainTableOption () {
      return materialTableOption
    },
  },
  created () {
  },
  methods: {
    // 同意确认责任
    onAgree (row) {
      this.$confirm('确定同意吗').then(() => {
        agreeRevoke(row.id).then(() => {
          this.$message.success('撤回完成！')
          this.getList()
        })
      }).catch(() => {})
    },
    //拒绝
    onRefuse (row) {
      // this.form = { ...row }
      // this.visible = true
      this.$confirm('确定拒绝吗').then(() => {
        refuseRevoke(row.id).then(() => {
          this.$message.success('拒绝成功！')
          this.getList()
        })
      }).catch(() => {})
    },
    // onSubmit () {
    //   refuseRevoke({ returnState: 1, id: this.form.cid, demandId: this.form.iId, rejectReason: this.form.rejectReason }).then(() => {
    //     this.visible = false
    //   })
    // },
    // 获取主表数据
    getList () {
      auditingRevokePage(this.listQuery).then(res => {
        this.tableList = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
